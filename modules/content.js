// const store = require('../store');

const file = require("../app/actions/file");

module.exports = function(io, socket, store){
    // content sharing
	socket.on('share-content', ({data, fileName}) => {
		store.rooms.temp.socketId = socket.id;
		store.rooms.temp.data = data;
		store.rooms.temp.requests = [];

		if (fileName){
			store.rooms.temp.fileName = fileName;
		}

        setTimeout( () => {
            store.archived.push(store.rooms.temp);
            store.rooms.temp = {};
		}, store.tempDelay)

		socket.in('dashboard').emit('share', {
			socket: socket.id,
			share: 'content',
			data
		})
    })
    
    socket.on('request-content', () => {

		socket.in('dashboard').emit('request', {
			socket: socket.id,
			request: 'content'
		})

		if (store.rooms.temp.data){
			store.rooms.temp.requests.push(socket.id);
		
			if (store.rooms.temp.fileName){
				socket.emit('get-content', {
					content : store.rooms.temp.data,
					fileName: store.rooms.temp.fileName,
					socketId: store.rooms.temp.socketId
				})
			} else {
				socket.emit('get-content', {
					content : store.rooms.temp.data,
					socketId: store.rooms.temp.socketId
				})
			}
		} else {
			socket.emit('send-message', {
				message: 'The cache is empty.' + store.rooms
			})
		}
    })
}