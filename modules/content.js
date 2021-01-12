// const store = require('../store');
const fs             = require('fs');
const ioStream = require('socket.io-stream');

module.exports = function(io, socket, store){
    // content sharing
	socket.on('share-content', ({data, fileName, stream}) => {
		store.rooms.temp.socketId = socket.id;
		store.rooms.temp.requests = [];

		if (stream){
			store.rooms.temp.stream = stream;
			store.rooms.temp.fileName = fileName;

			io.in('dashboard').emit('info', {
				message: socket.id + ' send stream on server : ' + fileName
			})
		} else {
			store.rooms.temp.data = data;
		}

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
		
			if (store.rooms.temp.stream){
				socket.emit('get-stream', {
					stream : store.rooms.temp.stream,
					fileName: store.rooms.temp.fileName,
					socketId: store.rooms.temp.socketId
				})

				io.in('dashboard').emit('info', {
					message: socket.id + ' request stream'
				})

			} else if (store.rooms.temp.fileName){
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