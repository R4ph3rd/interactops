// const store = require('../store');
const ioStream = require('socket.io-stream');

module.exports = function(io, socket, store){
    // content sharing
	socket.on('share-content', ({data, fileName, stream}) => {
		store.rooms.temp = {};
		store.rooms.temp.socketId = socket.id;
		store.rooms.temp.requests = [];

		if (fileName){
			store.rooms.temp.fileName = fileName;
		}

		if (stream){
			store.rooms.temp.stream = stream;
			store.rooms.temp.fileName = fileName;

			io.in('dashboard').emit('info', {
				message: socket.id + ' send stream on server : ' + fileName
			})
		} else {
			store.rooms.temp.data = data;

			socket.in('dashboard').emit('share', {
				socket: socket.id,
				share: 'content',
				data
			})
		}

		

        setTimeout( () => {
            store.archived.push(store.rooms.temp);
            store.rooms.temp = {};
		}, store.tempDelay)
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

				socket.in('dashboard').emit('info', {
					message: socket.id + ' request stream'
				})

				socket.emit('send-message', {
					message: ' Stream is sending to you.'
				})

			} else if (store.rooms.temp.fileName){
				socket.emit('get-content', {
					content : store.rooms.temp.data,
					fileName: store.rooms.temp.fileName,
					socketId: store.rooms.temp.socketId
				})

				socket.emit('send-message', {
					message: ' Shared file is sending to you.'
				})

				socket.in('dashboard').emit('info', {
					message: socket.id + ' request file'
				})

			} else {
				socket.emit('get-content', {
					content : store.rooms.temp.data,
					socketId: store.rooms.temp.socketId
				})

				socket.emit('send-message', {
					message: ' Shared content is sending to you.'
				})

				socket.in('dashboard').emit('info', {
					message: socket.id + ' request content'
				})
			}
		} else {
			socket.emit('send-message', {
				message: 'The cache is empty.' + store.rooms
			})
		}
    })
}