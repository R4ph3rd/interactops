// const store = require('../store');
const ioStream = require('socket.io-stream');

module.exports = function(io, socket, store){
    // content sharing
	socket.on('share-content', ({data, fileName, stream}) => {
		store.temp = {};
		store.temp.socketId = socket.id;
		store.temp.requests = [];

		if (fileName){
			store.temp.fileName = fileName;
		}

		/* if (stream){
			store.temp.stream = stream;
			store.temp.fileName = fileName;

			socket.in('dashboard').emit('info', {
				message: socket.id + ' send stream on server : ' + fileName
			})
		} else { */
			store.temp.data = data;

			socket.in('dashboard').emit('share', {
				socket: socket.id,
				share: 'content',
				data
			})
		// }

		

        setTimeout( () => {
            store.archived.push(store.temp);
            store.temp = {};
		}, store.tempDelay)
	})
    
    socket.on('request-content', () => {

		socket.in('dashboard').emit('request', {
			socket: socket.id,
			request: 'content'
		})

		if (store.temp.data){
			store.temp.requests.push(socket.id);
		
			/* if (store.temp.stream){
				socket.emit('get-stream', {
					stream : store.temp.stream,
					fileName: store.temp.fileName,
					socketId: store.temp.socketId
				})

				socket.in('dashboard').emit('info', {
					message: socket.id + ' request stream'
				})

				socket.emit('send-message', {
					message: ' Stream is sending to you.'
				})

			} else  */if (store.temp.fileName){
				socket.emit('get-content', {
					content : store.temp.data,
					fileName: store.temp.fileName,
					socketId: store.temp.socketId
				})

				socket.emit('send-message', {
					message: ' Shared file is sending to you.'
				})

				socket.in('dashboard').emit('info', {
					message: socket.id + ' request file'
				})

			} else {
				socket.emit('get-content', {
					content : store.temp.data,
					socketId: store.temp.socketId
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
				message: 'The cache is empty.' + store
			})
		}
    })
}