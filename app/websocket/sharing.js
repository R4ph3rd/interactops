// This file contains an older socket io server keeped here as reminder

let activeSockets = [];

let rooms = {
	general: []
};

const setup = (io) => {
	// on socket connection, disptach all events
	io.on("connection", socket => {

		// every new-user needs to enter in a room (we'll use it later when we'll send data to differents users, easier to create rooms).
		socket.on('enter-room', data => {		
			if (rooms[data.room]){
				rooms[data.room].push(socket.id);
			} else {
				rooms[data.room] = [socket.id];
			}

			socket.join(data.room);

			socket.emit('entered-in-room', {
				room: data.room,
				personalId: socket.id,
				message: 'Hello @everyone !',
				users: rooms[data.room].filter(id => id != socket.id),
			})

			socket.in(data.room).emit('new-user-entered', {
				room: data.room,
				message: 'Hi ' + socket.id,
				user: socket.id
			})
		})

		// when user leave
		socket.on('close-connection', () => {
			for (let room in rooms){
				rooms[room].splice(
					rooms[room].findIndex(id => id == socket.id),
					1
				)

				socket.in(room).emit('user-leave', {
					message: 'bye bye',
					socket: socket.id,
					room: room
				})
			}
		})

		// for text message
		socket.on('send-message', data => {
			if (data.room){
				io.in(data.room).emit('share-message', {
					message: data.message,
					socket: socket.id,
					room: data.room
				})
			}
		})


		// rtc => will be use to share screen
		socket.on('call-user', data => {
			console.log('call-user from', socket.id, ' to ', data.to)
			socket.to(data.to).emit("call-made", {
				offer: data.offer,
				room: data.room,
				socket: socket.id,
			});
		})

		socket.on("make-answer", data => {
			socket.to(data.to).emit("answer-made", {
				socket: socket.id,
				answer: data.answer,
				room: data.room,
			});
		});

		// when we want to share content
		socket.on('send-content', data => {
			// TODO : have to determine from data to whom we want to send it
		})

		console.log("connection estblished by: "+socket.id);
		console.log(activeSockets, rooms);
	})
}


const shareThrow = () => {
	// TODO : get data from clipboard and store it temporarly on server
	io.emit('share-throw', {
		data: 'data throw'
	})
}

const shareGet = () => {
	// TODO : ask data to the server (not to user)
	io.emit('share-get', {
		data: 'data get'
	})
}

const shareMulti = () => {
	io.emit('share-multi', {
		data: 'data multi'
	})
}

const shareAccess = () => {
	// TODO : generate token access
	io.emit('share-access', {
		data: 'data access',
		token: 'qlmdhqkjagajhz6UJGYfjhfdfhT576'
	})
}

const shareScreen = () => {
	// TODO : set a webrtc connexion
	io.emit('share-screen', {
		data: 'data screen'
	})
}

const shareAlert = () => {
	io.emit('share-alert', {
		data: 'data alert'
	})
}

module.exports = {setup, shareThrow, shareGet, shareMulti, shareAccess, shareMulti, shareScreen, shareAlert};