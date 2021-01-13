const { screen } = require("@nut-tree/nut-js");
const fs = require('fs'); // required for file serving
const colors = require('colors');

// const dwt = require('../../features_standalone_examples/DTW')
const oscSend = require('../osc/send');
const actions = require('../actions')
const filters = require('../actions/filters')
const mutations = require('../store/mutations')

let companionIsConnected = false ;
let antiBounce = false;

module.exports = function(io){
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
      // dwt.compute(data)
		})
    
    socket.on('train-data', data => {
      console.log('... sending data')
      dwt.trainGesture(data);
    })
    
    socket.on('start-sending-data', () => {
      console.log('\n-------------- start ---------------'.yellow);
      filters.toggleBounce(true);
      // dwt.clear();
    })
    
    socket.on('end-sending-data', () => {
      console.log('-------------- end ---------------\n'.yellow);
      setTimeout(() => {
        filters.toggleBounce(false);
        actions();
      }, 100)
      // dwt.registerExample('share-throw');
		})
    
    socket.on('fake-action', action => {
      if (!antiBounce){
        antiBounce = !antiBounce;
        actions(action);
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
      const screenshot = await screen.capture(`${__dirname}/../store/assets/screenshot.png`);
      console.log('screenshot for companion : ')
      console.log(screenshot)

      fs.readFile(__dirname + '/../screenshot.png', function(err, buf){
        socket.emit('update-screencast', { image: true, buffer: buf });
        console.log('image file is initialized', buf);
      });
    })

    socket.on('disconnect', () => {
      console.log('-- Companion is disconnected --'.black.bgGreen)
    })
        
  });
}