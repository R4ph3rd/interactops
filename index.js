// websocet server stuff
const express = require("express");
const app = express();
const http = require("http").createServer(app)
const io = require('socket.io')(http);
const {join} = require("path");



// OSC stuff
const OSC = require('osc-js');
const config = { udpClient: { port: 9129 } }
const osc = new OSC({ plugin: new OSC.BridgePlugin(config) })
osc.open();


let activeSockets = [];

let rooms = {
	general: []
};

app.use(express.static(join(__dirname,'public')));

const port = 3002;
http.listen(port, () => {
	console.log("app started on " + port);
});

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