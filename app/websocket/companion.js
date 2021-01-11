const colors = require('colors');
const oscSend = require('../osc/send')

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
        
        // when user leave
		socket.on('sensors-data', data => {
      // console.log('new datas :', data)
      oscSend(data);
		})
        
    });
}