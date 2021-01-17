const mutations = require('../store/mutations');
// const store = require('../store');

module.exports = function(io, socket, store){
    // computer access sharing
    // will share a token acess, either view or collaboration. This will be set by host
    socket.on('share-access', data => {

		// case : user did twice the gesture. he override tokens.
		if (store.rooms.temp.waiters && store.rooms.temp.waiters.length >= 1){
			store.rooms.temp.token = store.rooms.temp.waiters[0].token;
			store.rooms.temp.owner = store.rooms.temp.waiters[0].owner;
			store.rooms.temp.rights = store.rooms.temp.waiters[0].rights;
			store.rooms.temp.requests = [];
			store.rooms.temp.waiters = [];

			socket.emit('send-message',{
				message: "You have overrided " + store.rooms.temp.owner + "'s tokens."
			})

			// case : when user had already made the gesture once, he is asked to redo it twice to override existing tokens.
		} else if (store.rooms.temp.token){
			socket.emit('send-message',{
				message: "Another user had already shared his access tokens. Please perform the sharing access gesture another time if you actually want to share yours, or wait a moment to be connected to " + store.rooms.temp.owner
			})

			store.rooms.temp.waiters = [{
				token: data.token,
				owner: socket.id,
				rights: data.rights
			}]

			// case : user didn't do anything after a while, meaning he just wants to get tokens.
			setTimeout(() => {
				io.in('dashboard').emit('info', {
					message: socket.id + ' request access.'
				})
	
				socket.emit('get-access', {
					owner: store.rooms.temp.owner,
					token: store.rooms.temp.token,
					rights: store.rooms.temp.rights
				})
	
				socket.emit('send-message', {
					message: `You get a token and are now allowed to ${store.rooms.temp.rights == 'viewer' ? `cast ${store.rooms.temp.owner}'s computer` : `collaborate with ${store.rooms.temp.owner} on its desktop`} .`
				})
	
				socket.to(store.rooms.temp.owner).emit('send-message', {
					message : `A new ${store.rooms.temp.rights} is connected ! You share now your PC with ${socket.id}`
				})
			}, 3000)

			// case : temp was empty. so we store tokens in it.
		} else {
			store.rooms.temp.token = data.token;
			store.rooms.temp.owner = socket.id;
			store.rooms.temp.rights = data.rights;
			store.rooms.temp.requests = [];
	
			mutations.clearTemp(20000);
			
			io.in('dashboard').emit('info', {
				message: socket.id + ' shared access token.'
			})
		}   
	})
	
	socket.on('clear-access', ({userList}) => {
		for (let user of userList){
			socket.to(user).emit('clear-access');
		}
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
				rights: store.rooms.temp.rights
			})

			socket.emit('send-message', {
				message: `You get a token and are now allowed to ${store.rooms.temp.rights == 'viewer' ? `cast ${store.rooms.temp.owner}'s computer` : `collaborate with ${store.rooms.temp.owner} on its desktop`} .`
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
			socketId: socket.id,
			token: data.token
		})

		io.in('dashboard').emit('info', {
			message: socket.id + ' request action to ' + data.to + ' : ' + data.action
		})
	})


	// screencast
	socket.on('request-screencast', ({to, token}) => {
		socket.to(to).emit('request-screencast', {
			token,
			socketId: socket.id
		})
	})

	socket.on('update-screencast', ({to, buffer, image}) => {
		socket.to(to).emit('update-screencast', {
			image,
			buffer
		})
	})
}