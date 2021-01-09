const express = require("express"); // useless for now, in case we want to display information about socket server
const socketIO = require('socket.io');

const host = process.env.PORT || 3000;

const server = express()
	.use(express.static(__dirname + "/public"))
	.listen(host, () => console.log(`Listening on ${host}`));
const io = socketIO(server);


let rooms = {
    general: [],
    temp: {}
};

let archived = []; // store shared content

const defaultRoom = 'general';
const tempDelay = 10000; //delay to store temporaly content shared by users
const archivesClearInterval = 1000000000;

io.on("connection", socket => {
	const existingSocket = rooms[defaultRoom].find(
		existingSocket => existingSocket === socket.id
	);

	if (!existingSocket) {

		if (rooms[defaultRoom]){
			rooms[defaultRoom].push(socket.id);
		} else {
			rooms[defaultRoom] = [socket.id];
		}
	
		socket.join(defaultRoom);
	
		socket.emit('entered-in-room', {
			room: defaultRoom,
			personalId: socket.id,
			message: 'Hello @everyone !',
			users: rooms.general.filter(id => id != socket.id),
		})
	
		setTimeout( () => {
			socket.in(defaultRoom).emit('new-user-entered', {
				room: defaultRoom,
				message: 'Hi ' + socket.id,
				user: socket.id
			})
		}, 500)

		io.emit('update-users-list', {
			users : rooms[defaultRoom]
		})
	}

	

	socket.on('disconnect',() => {
		console.log("bye bye 👋");
		rooms[defaultRoom].splice(
			rooms[defaultRoom].findIndex(id => id == socket.id),
			1
		)

		io.emit('update-users-list', {
			users : rooms[defaultRoom]
		})
    })
    
    // computer access sharing
    // will share a token acess, either view or collaboration. This will be set by host
    socket.on('share-access', data => {
        rooms.temp.data = data.token;
        rooms.temp.author = socket.id;
        rooms.temp.requests = [];

        setTimeout( () => {
            rooms.temp = {};
        }, tempDelay)
    })

    // content sharing
	socket.on('share-content', data => {
        rooms.temp.data = data.content;
        rooms.temp.author = socket.id;
        rooms.temp.requests = [];

        setTimeout( () => {
            archived.push(rooms.temp);
            rooms.temp = {};
		}, tempDelay)
		
		io.emit('share-content', data)
    })
    
    socket.on('request-content', () => {
        socket.emit('share-content', {
            data: rooms.temp.data,
            author: rooms.temp.author
        })
    })

	console.log("connection estblished by: " + socket.id);
	console.log(rooms);
})

setInterval(() => {
    archived = []
}, archivesClearInterval);



/*
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
*/