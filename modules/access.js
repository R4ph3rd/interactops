const mutations = require('../store/mutations');
// const store = require('../store');

module.exports = function(io, socket, store){
    // computer access sharing
    // will share a token acess, either view or collaboration. This will be set by host
    socket.on('share-access', data => {

		socket.in('dashboard').emit('info', {
			message: socket.id + ' send share-access event.'
		})

		// case : user did twice the gesture. he override tokens.
		if (store.tempAccess[data.rights].waiters && store.tempAccess[data.rights].waiters.length >= 1){

			socket.emit('send-message',{
				message: "You have overrided " + store.tempAccess[data.rights].owner + "'s tokens."
			})

			setTimeout(() => {
				socket.in('dashboard').emit('info', {
					message: socket.id + ' overrided ' + store.tempAccess[data.rights].owner + "'s tokens."
				})
			},1000)

			store.tempAccess[data.rights].token = store.tempAccess[data.rights].waiters[0].token;
			store.tempAccess[data.rights].owner = store.tempAccess[data.rights].waiters[0].owner;
			store.tempAccess[data.rights].rights = store.tempAccess[data.rights].waiters[0].rights;
			store.tempAccess[data.rights].requests = [];
			store.tempAccess[data.rights].waiters = [];

			// case : when user had already made the gesture once, he is asked to redo it twice to override existing tokens.
		} else if (store.tempAccess[data.rights].token){
			socket.emit('send-message',{
				message: "Another user had already shared his access tokens. Please perform the sharing access gesture another time if you actually want to share yours, or wait a moment to be connected to " + store.tempAccess[data.rights].owner
			})
			
			setTimeout(() => {
				socket.in('dashboard').emit('info', {
					message: 'Prevents ' + socket.id + ' that another user had already shared his access tokens.'
				})
			},1000)

			store.tempAccess[data.rights].waiters = [{
				token: data.token,
				owner: socket.id,
				rights: data.rights
			}]

			// case : user didn't do anything after a while, meaning he just wants to get tokens.
			setTimeout(() => {
				
				setTimeout(() => {
					socket.in('dashboard').emit('info', {
						message: socket.id + ' request access.'
					})
				},1000)
	
				socket.emit('get-access', {
					owner: store.tempAccess[data.rights].owner,
					token: store.tempAccess[data.rights].token,
					rights: store.tempAccess[data.rights].rights
				})
	
				socket.emit('send-message', {
					message: `You get a token and are now allowed to ${store.tempAccess[data.rights].rights == 'viewer' ? `cast ${store.tempAccess[data.rights].owner}'s computer` : `collaborate with ${store.tempAccess[data.rights].owner} on its desktop`} .`
				})
	
				socket.to(store.tempAccess[data.rights].owner).emit('send-message', {
					message : `A new ${store.tempAccess[data.rights].rights} is connected ! You share now your PC with ${socket.id}`
				})
			}, 3000)

			// case : temp was empty. so we store tokens in it.
		} else {
			store.tempAccess[data.rights].token = data.token;
			store.tempAccess[data.rights].owner = socket.id;
			store.tempAccess[data.rights].rights = data.rights;
			store.tempAccess[data.rights].requests = [];
	
			mutations.clearTemp(20000);
			
			socket.in('dashboard').emit('info', {
				message: socket.id + ' shared access token.'
			})
		}   
	})
	
	socket.on('clear-access', ({userList}) => {
		mutations.clearTemp(0);
		for (let user of userList){
			socket.to(user).emit('clear-access');
		}
	})
	
	socket.on('request-access', () => {	
		socket.in('dashboard').emit('info', {
			message: socket.id + ' request access.'
		})

		if (store.tempAccess[data.rights].token){
			// socket.join(store.tempAccess[data.rights].socketId);

			socket.emit('get-access', {
				owner: store.tempAccess[data.rights].owner,
				token: store.tempAccess[data.rights].token,
				rights: store.tempAccess[data.rights].rights
			})

			socket.emit('send-message', {
				message: `You get a token and are now allowed to ${store.tempAccess[data.rights].rights == 'viewer' ? `cast ${store.tempAccess[data.rights].owner}'s computer` : `collaborate with ${store.tempAccess[data.rights].owner} on its desktop`} .`
			})

			socket.to(store.tempAccess[data.rights].owner).emit('send-message', {
				message : 'A new collaborator is connected ! You share now the PC with ' + socket.id
			})
		} else {
			socket.emit('send-message', {
				message: "The temp is empty." + store.tempAccess[data.rights]
			})
		}
	});
	
	socket.on('request-action', data => {
		socket.to(data.to).emit('request-action', {
			action: data.action,
			socketId: socket.id,
			token: data.token
		})

		socket.in('dashboard').emit('info', {
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