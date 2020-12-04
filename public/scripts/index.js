//state-"store"
let isAlreadyCalling = false;
let getCalled = false;

const existingCalls = [];

let rtc = {
	general: {
		messages: {},
		users: {}
	}, // [name] : [RTCPeerConnections]
	personalId: null
}

var socket = io();

//actuall RTC work
const { RTCPeerConnection, RTCSessionDescription } = window;

const peerConnection = new RTCPeerConnection();

const chatText = document.getElementById('chat-text');
const videoContainer = document.querySelector('.videos-room-container');
const localVideo = document.getElementById("local-video");

localVideo.addEventListener('click', async () => {
	if(!rtc.personalId){
		accessGeneral();
	} else {
		console.log('already connected !')
	}
})


//socket stuff
////////////// SOCKET UTILITIES

const newConnection = (socketId, room) => {
	if (!rtc[room]){
		newRoom(room);
	}

	rtc[room].users[socketId] = new RTCPeerConnection();

	rtc[room].users[socketId].ontrack = function({ streams: [stream] }) {
		const user = document.getElementById(socketId);
		let video = user.children[0];
		video.srcObject = stream;

		console.log('peer get track', stream, rtc[room].users[socketId])
	};


	//media accessing and manipulation
	navigator.mediaDevices.getUserMedia({video:true, audio: true})
	.then(function(stream) {
		stream.getTracks().forEach(track => {
			console.log('traks', track, stream)
			rtc[room].users[socketId].addTrack(track, stream)
		});
	})
	.catch(function(err) {
		console.error(err);
	});
}

const removeConnection = (socketId, room, message) => {
	rtc[room].messages[socketId] = message ;
	delete rtc[room].users[socketId];

	const video = document.getElementById(socketId)
	if(video){
		video.remove();
	}
}

const newRoom = (room) => {
	rtc[room] = {
		users : {},
		messages: {}
	};
}

///////// SOCKET EVENTS

socket.on('entered-in-room', data => {
	// console.log('entered in ', data)
	rtc.personalId = data.personalId;
	sendMessage(data.message)

	for (let socketId of data.users){
		newConnection(socketId, data.room);
		addUser(socketId, data.room)
	}
})

socket.on('new-user-entered', data => {
	sendMessage(data.message)
	newConnection(data.user, data.room)
	addUser(data.user, data.room);
	// console.log('new user', data, rtc[data.room])

})

socket.on('user-leave', data => {
	sendMessage(data.message)
	removeConnection(data.socket, data.room, data.message);
	// console.log('user leaved', rtc)
})

socket.on('share-message', data => {
	addMessage(data.socket, data.message, data.room);
})


// socket emitters only
const sendMessage = (msg) => {
	if (!msg){
		var message = document.getElementById('input-message').value;
	} else {
		var message = msg;
	}
	socket.emit('send-message', {
		message: message,
		room: 'general'
	})
}

const accessGeneral = (room = 'general') => {
	socket.emit('enter-room', {
		room: room
	})
}




//////////////// WEBRTC

const connectRTC = async ({socketId, room}) => {
	const peer = rtc[room].users[socketId];
	const offer = await peer.createOffer();
	await peer.setLocalDescription(new RTCSessionDescription(offer));

	console.log('attemp to connect to ', socketId)
	
	socket.emit("call-user", {
		room: room,
		to: socketId,
		offer,
	});
}


socket.on('call-made', async data => {
	const peer = rtc[data.room].users[data.socket];
	console.log('call made', data, peer)

	await peer.setRemoteDescription(
		new RTCSessionDescription(data.offer)
	);

	const answer = await peer.createAnswer();
	await peer.setLocalDescription(new RTCSessionDescription(answer));

	socket.emit("make-answer", {
		answer,
		room: data.room,
		to: data.socket,
	});
})

socket.on("answer-made", async data => {
	let peer = rtc[data.room].users[data.socket];
	console.log('answer made', data, peer)

	await peer.setRemoteDescription(
		new RTCSessionDescription(data.answer)
	);

	if (!peer.isAlreadyCalling){
		console.log('not connected, send a invitation', peer, data.socket, rtc.personalId)
		peer.isAlreadyCalling = true ;
		console.log(peer)
		connectRTC({socketId : data.socket, room: data.room})
	} else {
		console.log('already calling', peer)
	}
	
});


//// interactions

const addMessage = (socketId, message, room) => {
	if(room){
		rtc[room].messages[socketId] = message;
	} else {
		rtc.general.messages[socketId] = message;
	}

	let msg = document.createElement('li');
	msg.classList.add('message');
	
	if( socketId == rtc.personalId){
		msg.classList.add('you');
		var sender = 'You';
	} else {
		var sender = socketId;
	}

	msg.innerHTML = `
		<h4>${sender}</h4>
		<p>${message}</h4>
	`
	chatText.appendChild(msg)
}


const addUser = (socketId, room) => {
	let user = document.createElement('div');
	user.classList.add('user');
	user.id = socketId;
	user.innerHTML = `
		<video autoplay></video>
		<p>${socketId}</p>
	`;

	user.addEventListener('click', () => {
		connectRTC({socketId, room})
	})

	videoContainer.appendChild(user);
}



//media accessing and manipulation
navigator.mediaDevices.getUserMedia({video:true, audio: true})
.then(function(stream) {
	const localVideo = document.getElementById("local-video");
	if (localVideo) {
		localVideo.srcObject = stream;
	}
	// stream.getTracks().forEach(track => rtc[room].users[socketId].addTrack(track, stream));
	console.log(stream)
})
.catch(function(err) {
	console.error(err);
});




/// close socket connection before close tab

window.addEventListener('beforeunload', function(event) {
	socket.emit('close-connection');
});