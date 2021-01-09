let companionIsConnected = false ;

module.exports = function(io){
    io.on('connection', function(socket){  
        console.log("Interactops Companion is connected");
    
        if (!companionIsConnected){
          companionIsConnected = !companionIsConnected;
        }

        // when user leave
		socket.on('close-connection', () => {
			console.log('Companion is disconnected.')
        })
        
        // when user leave
		socket.on('sensors-data', data => {
            console.log('new datas :', data)
		})
        
    });
}