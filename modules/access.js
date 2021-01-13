const mutations = require('../store/mutations');
// const store = require('../store');

module.exports = function(io, socket, store){
    // computer access sharing
    // will share a token acess, either view or collaboration. This will be set by host
    socket.on('share-access', data => {
        store.rooms.temp.token = data.token;
        store.rooms.temp.owner = socket.id;
        store.rooms.temp.requests = [];

		mutations.clearTemp(20000);
		
		io.in('dashboard').emit('info', {
			message: socket.id + ' shared access token.'
		})
    })
	
	socket.on('request-access', () => {	
		io.in('dashboard').emit('info', {
			message: socket.id + ' request access.'
		})

		if (store.rooms.temp.token){
			// socket.join(store.rooms.temp.socketId);

			socket.emit('get-access', {
				owner: store.rooms.temp.owner,
				token: store.rooms.temp.token,
			})

			socket.emit('send-message', {
				message: 'You get a token and are now allowed to collaborate with ' + store.rooms.temp.owner + ' on its desktop.'
			})

			socket.to(store.rooms.temp.owner).emit('send-message', {
				message : 'A new collaborator is connected ! You share now the PC with ' + socket.id
			})
		} else {
			socket.emit('send-message', {
				message: "The temp is empty." + store.rooms.temp
			})
		}
	});
	
	socket.on('request-action', data => {
		socket.to(data.to).emit('request-action', {
			action: data.action,
			socketId: data.socketId,
			token: data.token
		})

		io.in('dashboard').emit('info', {
			message: socket.id + ' request action to ' + data.to + ' : ' + data.action
		})
	})
}