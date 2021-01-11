const socket = require('./socket');
const colors = require('colors');

let mySocketId ;

module.exports = function(){
	socket.on('entered-in-room', data => {
		mySocketId = data.personalId;

		console.log('incoming socket ', mySocketId)

		console.log('\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
		const str = 'Connected to network : ' + data.message;
		console.log(str.magenta)
		console.log('Your socket id is :'.magenta, data.personalId.bgMagenta.black + '  ')

		if (data.room){
			console.log("You are connected to the default Room.".magenta)
		}
		console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n')
	})
	  
	socket.on('new-user-entered', data => {
		console.log('A new user is connected to network.'.magenta)

		const str = data.socketId + ' says : '
		console.log( str.magenta + data.message);
	})

	socket.on('update-users-list', data => {
		console.log('REMINDER : You are socket ' + mySocketId)
		console.log('User list is updated :'.magenta, data.users)
	})
	
	socket.on('send-message', ({socketId, message}) => {
		const str = socketId ? socketId + ' says : ' : 'Server info : '
		console.log( str.magenta + message);
	})

	socket.on('checked-connection', () => {
		socket.emit('checked-connection')
	})
}