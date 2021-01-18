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

let companionIsConnected = false ;
let antiBounce = false;

// let controlBounce = false;
// let controlMode = true;

module.exports = function(){
  io.on('connection', function(socket){ 
    console.log('  Interactops Companion is connected  '.bgGreen.black);
    
    if (!companionIsConnected){
      companionIsConnected = !companionIsConnected;
    }

        // when user leave
		socket.on('close-connection', () => {
			console.log('Companion is disconnected.'.red.bgWhite)
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
        actions({action});
        console.log('Fake gesture : '.green, action)
        
        setTimeout(() => {
          antiBounce = !antiBounce;
        }, 500)
      }
		})
    
    socket.on('set-mode', mode => {
      console.log('New interactops mode : ', mode.green);
      mutations.setMode(mode);
    })


    socket.on('request-screencast', async () => {
      screenshot().then((buffer) => {
        console.log('-- Image buffer initialized -- '.green);

        socket.emit('update-screencast', { image: true, buffer });
      }).catch((err) => {
        console.error(err)
      })
    })
    
    socket.on('request-remote-screencast', async () => {
      console.log('-- Request remote screencast -- '.green)
      if (store.remote.token && store.remote.socket){
        access.requestCast();
      }
    })

    socket.on('disconnect', () => {
      console.log('-- Companion is disconnected --'.black.bgGreen)
    })

    /* socket.on('change-control-mode', () => {
      controlBounce = true ;
      console.log('changing control mode')
    }) */
        
  });
}