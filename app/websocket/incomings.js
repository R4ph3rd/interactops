const socket = require('./socket');
const colors = require('colors');
const file   = require('../actions/file');
const access = require('../actions/access');
const screen = require('../actions/screen')
const actions = require('../actions');
const store = require('../store');

let mySocketId ;

module.exports = function(){
	socket.on('entered-in-room', data => {
		mySocketId = data.personalId;

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

	socket.on('checked-connection', () => {
		socket.emit('checked-connection')
	})

	////// ACTUAL INTERACTOPS STUFF
	
	socket.on('send-message', ({socketId, message}) => {
		const str = socketId ? socketId + ' says : ' : 'Server info : '
		console.log( str.magenta + message);
	})

	socket.on('get-content', ({content, fileName, socketId}) => {
		if (fileName){
			file.getData({
				content, 
				fileName, 
				socketId
			});
		} else {
			file.getData({
				content, 
				socketId
			});
		}
		
	})
	
	socket.on('get-stream', ({stream, fileName, socketId}) => {
		console.log('Get stream :', fileName, socketId);
		file.getStream({ stream, fileName})
		
	})

	socket.on('get-access', data => {
		console.log('Access token received from : '.magenta + data.owner, data.token);

		access.registerRemoteAccess({
			remoteToken: data.token,
			remoteSocket: data.owner
		})
	})

	socket.on('request-action', ({socketId, action, token}) => {
		console.log(`${socketId.magenta} request an action on your PC : `.magenta + action.green + ' with following token : '.magenta + token)

		actions({action, token, socketId});
	})

	socket.on('request-screencast', ({action, socketId, remoteToken}) => {
		if (access.middleware({action, token: remoteToken, socketId})){
			screen.sendScreen({to: socketId});
		}
	})

	socket.on('update-screencast', ({image, buffer}) => {
		access.getCast({buffer});
	})
}
