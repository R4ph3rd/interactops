// const store = require('../store');

module.exports = function(io, socket, store){
    const existingSocket = Object.keys(store.rooms[store.defaultRoom]).find(
		existingSocket => existingSocket === socket.id
	);

	if (!existingSocket) {

		store.rooms[store.defaultRoom][socket.id] = true;
		socket.join(store.defaultRoom);
	
		socket.emit('entered-in-room', {
			room: store.defaultRoom,
			personalId: socket.id,
			message: "You're entered into Interactops general room.",
		})

		socket.in(store.defaultRoom).emit('new-user-entered', {
			message : 'Hello @everyone !',
			socketId: socket.id
		})

		io.emit('update-users-list', {
			users : store.rooms[store.defaultRoom]
		})

		setInterval(() => {
			socket.emit('check-connection');
			store.rooms[store.defaultRoom][socket.id] = false ;

			setTimeout(() => {
				if (!store.rooms[store.defaultRoom][socket.id]){
					socket.disconnect(true)
				}
			}, store.checkTimeout)
		}, store.checkInterval)
    }
    
    socket.on('checked-connection', () => {
		store.rooms[store.defaultRoom][socket.id] = true;
	})

	socket.on('dashboard-connection', () => {
		socket.join('dashboard');
    })
    
    socket.on('disconnect',() => {
		console.log("bye bye 👋");
		/* rooms[defaultRoom].splice(
			rooms[defaultRoom].findIndex(id => id == socket.id),
			1
		) */

		delete store.rooms[store.defaultRoom][socket.id];
		
		io.emit('send-message', {
			message: "I'm leaving. Bye bye !",
			socketId: socket.id
		})

		io.emit('update-users-list', {
			leaving: socket.id,
			users : store.rooms[store.defaultRoom]
		})
    })

    socket.on('clear-connections', () => {
		io.sockets.disconnect();
		store.rooms[store.defaultRoom] = {};

		io.emit('update-users-list', {
			users : io.sockets.adapter.rooms.get('general')
		})
	})
}