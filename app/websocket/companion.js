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
        
  });
}