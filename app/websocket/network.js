module.exports = function(socket){
	socket.on('entered-in-room', data => {
		console.log('Connected to network :', data.message)
	  })
	  
	  socket.on('new-user-entered', data => {
		console.log('A new user is connected to network :', data)
	  })
}
