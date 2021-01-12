const express = require("express"); // useless for now, in case we want to display information about socket server
const socketIO = require('socket.io');

// modules
const store = require('./store')
const content = require('./modules/content');
const connection = require('./modules/connection');
const access = require('./modules/access');

const port = process.env.PORT || 3000;

const server = express()
	.use(express.static(__dirname + "/public"))
	.listen(port, () => console.log(`Listening on ${port}`));

const io = socketIO(server);

io.on("connection", socket => {
	
	connection(io, socket, store);
	content(io, socket, store);
	access(io, socket, store);

	socket.on('send-message', ({room, message, to}) => {
		console.log(`New message arrived from ${socket.id} in ${room} : ${message}`);
		
		if (room){
			io.in(room ? room : defaultRoom).emit('send-message', {
				message,
				room,
				socketId : socket.id,
			})
			socket.in('dashboard').emit('info', socket.id + ' sends a message into room ' + room + ' : ' + message)
		} 
		if (to){
			socket.to(to).emit('send-message', {
				message,
				socketId: socket.id
			})
			io.in(to).emit('send-message',{
				message,
				socketId: socket.id
			})
			socket.in('dashboard').emit('info', socket.id + ' sends a message to ' + to + ' : ' + message)
		}
	})

	console.log("connection estblished by: " + socket.id);
	console.log(store.rooms);
})

