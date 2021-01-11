const express = require("express"); // useless for now, in case we want to display information about socket server
const socketIO = require('socket.io');

// modules
const content = require('./modules/content');
const connection = require('./modules/connection');
const access = require('./modules/access');

const host = process.env.PORT || 3000;

const server = express()
	.use(express.static(__dirname + "/public"))
	.listen(host, () => console.log(`Listening on ${host}`));
	
const io = socketIO(server);

io.on("connection", socket => {
	
	connection(io, socket);
	content(io, socket);
	access(io, socket);

	socket.on('send-message', ({room, message}) => {
		console.log(`New message arrived from ${socket.id} in ${room} : ${message}`);
		
		io.in(room ? room : defaultRoom).emit('send-message', {
			message,
			room,
			socketId : socket.id,
		})
	})

	console.log("connection estblished by: " + socket.id);
	console.log(rooms);
})

