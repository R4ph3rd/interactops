const express = require("express"); // useless for now, in case we want to display information about socket server
const socketIO = require('socket.io');

const host = 3000;

const server = express()
	.use(express.static(__dirname + "/public"))
	.listen(host, () => console.log(`Listening on ${host}`));
const io = socketIO(server);

// app.use(express.static(__dirname + "/public"));
// http.listen(host, '0.0.0.0', function(){
//     console.log("Listening on " + host);
// });




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