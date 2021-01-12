const { screen } = require("@nut-tree/nut-js");
const fs = require('fs'); // required for file serving
const colors = require('colors');

const oscSend = require('../osc/send');
const actions = require('../actions')
const mutations = require('../store/mutations')

let companionIsConnected = false ;

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
		})
    
    socket.on('fake-action', action => {
      actions(action);
      console.log('fake action', action)
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
        
  });
}