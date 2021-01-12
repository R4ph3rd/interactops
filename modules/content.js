// const store = require('../store');

module.exports = function(io, socket, store){
    // content sharing
	socket.on('share-content', ({data}) => {
		store.rooms.temp.socketId = socket.id;
		store.rooms.temp.data = data
        store.rooms.temp.requests = [];

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
		
			socket.emit('get-content', {
				content : store.rooms.temp.data,
				temp: store.rooms.temp
			})
		} else {
			socket.emit('send-message', {
				message: 'The cache is empty.' + store.rooms
			})
		}
    })
}