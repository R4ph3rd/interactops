const screenshot = require('screenshot-desktop')
const fs = require('fs'); // required for file serving
const colors = require('colors');
const {io} = require('../server')
// const dwt = require('../../features_standalone_examples/DTW')
const oscSend = require('../osc/send');
const actions = require('../actions')
const access = require('../actions/access');
const mouseAction = require('../actions/mouse')
const filters = require('../actions/filters')
const mutations = require('../store/mutations')
const store = require('../store');
const keyboard = require('../actions/keyboard');

let companionIsConnected = false ;
let antiBounce = false;
let companionID = undefined;

// let controlBounce = false;
// let controlMode = true;

module.exports = function(){
  io.on('connection', function(socket){ 
    
    socket.on('companion-paired', () => {
      console.log('  Interactops Companion is connected  '.bgGreen.black);

      if (!companionIsConnected){
        companionIsConnected = !companionIsConnected;
        companionID = socket.id;
      }
      socket.join('companion');
      socket.emit('companion-recognized')
    })

    socket.emit('request-mode');
      
		socket.on('sensors-data', data => {
      // console.log('new datas :', data)

      oscSend(data);
      if (!store.controlMode){
        mouseAction.control({rot: data.rotation, pRot: data.pRotation});
      }
      // dwt.compute(data)
		})
    
    socket.on('train-data', data => {
      console.log('... sending data')
      dwt.trainGesture(data);
    })
    
    socket.on('start-sending-data', () => {
      console.log('\n-------------- start ---------------'.yellow);
      filters.toggleBounce(true);
      mutations.setStartingPos()
      // dwt.clear();
    })

    socket.on('alt-tab', () => {
      mutations.toggleAltTab();

      if (store.altTab){
        keyboard.altTab();
      } else {
        keyboard.closeAltTab();
      }
    })
    
    socket.on('end-sending-data', () => {
      console.log('-------------- end ---------------\n'.yellow);
      setTimeout(() => {
        filters.toggleBounce(false);

        setTimeout(() => {
          filters.resetClicks();
        }, 200)


        if (filters.clicks >= 2 && !store.controlMode){
          mouseAction.click();
        }         

        actions();
      }, 50)
      // dwt.registerExample('share-throw');
    })
  
    
    socket.on('fake-action', action => {
      if (!antiBounce){
        antiBounce = !antiBounce;

        switch (action) {
          case 'alt-tab':
            if (!forbidenRemoteActions.includes(action) && store.remote.token != null && store.remote.socket != null && store.remote.rights == 'collaborator'){
              requestAction(action);
            } else {
              mutations.toggleAltTab();
              console.log('-Recognized gesture : '.green, action)

              if (store.altTab){
                keyboard.altTab();
              } else {
                keyboard.closeAltTab();
              }
            }

            break;
          case 'click':
            if (!forbidenRemoteActions.includes(action) && store.remote.token != null && store.remote.socket != null && store.remote.rights == 'collaborator'){
              requestAction(action);
            } else {
              if(!store.controlMode){
                mouseAction.click();
              }
            }
            break;
          case 'control-mouse':
            if(!store.controlMode){
              mouseAction.control({rot: data.rotation, pRot: data.pRotation});
            }
            break;
          default:
            console.log('-Recognized gesture : '.green, action)
            actions({action});
        }
        
        setTimeout(() => {
          antiBounce = !antiBounce;
        }, 500)
      }
		})
    
    socket.on('set-mode', mode => {
      console.log('New interactops mode : ', mode.green);
      mutations.setMode(mode);
    })


    ///////////////   SCREENCAST   ////////////////////////

    socket.on('screencast-companion-request', async () => {
      console.log('companion screencast equest'.green)
      screenshot().then((buffer) => {
        console.log('-- Image buffer initialized for companion -- '.green);

        io.in('companion').emit('action-ok', 'screencast');
        io.in('companion').emit('update-screencast', { image: true, buffer, who: 'local'});

      }).catch((err) => {
        console.error(err)
      })
    })
    
    socket.on('request-remote-screencast', async () => {
      console.log('-- Request remote screencast -- '.green)
      if (store.remote.token && store.remote.socket && store.remoteCastIsOpen){
        access.requestCast();
      }
    })

    socket.on('remote-screencast-opened', () => {
      socket.join('remote');
      console.log('  Remote screencast is connected  '.bgGreen.black);
      mutations.toggleCast(true);
    })

    socket.on('disconnect', () => {
      if (socket.id == companionID){
        console.log('-- Companion is disconnected --'.black.bgGreen)
      }
    })  

    socket.on('disconnecting', () => {
      if (socket.rooms.has('remote')){
        console.log('  Remote screencast is disconnected  '.black.bgGreen);
        mutations.toggleCast(false);
        mutations.clearRemote();
      }
    })          
  });
}