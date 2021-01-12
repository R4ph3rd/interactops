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

let archived = []; // store shared content in the webapp

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
			message: 'You"re entered into Interactops general room.',
			users: rooms.general.filter(id => id != socket.id),
		})

		socket.in(defaultRoom).emit('new-user-entered', {
			message : 'Hello @everyone !',
			socketId: socket.id
		})

		io.emit('update-users-list', {
			users : rooms[defaultRoom]
		})
	}

	socket.on('send-message', ({room, message}) => {
		console.log(`New message arrived from ${socket.id} in ${room} : ${message}`);
		
		io.on(room ? room : defaultRoom).emit('send-message', {
			message,
			room,
			socketId : socket.id,
		})
	})

	socket.on('disconnect',() => {
		console.log("bye bye 👋");
		rooms[defaultRoom].splice(
			rooms[defaultRoom].findIndex(id => id == socket.id),
			1
		)

		io.emit('update-users-list', {
			users : rooms[defaultRoom]
		})
		
		io.emit('send-message', {
			message: "I'm leaving. Bye bye !",
			socketId: socket.id
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
		
		io.emit('share-content', data);
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