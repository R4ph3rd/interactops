const socket = io();
let users = 0;
const numberOfUsers = document.getElementById('users');
const message = document.getElementById('message');

console.log('SOcket server', numberOfUsers)

numberOfUsers.innerText = users ;

socket.on('update-users-list', data => {
    console.log(data);
    numberOfUsers.innerText = Object.keys(data.users).length;
})

socket.on('share-content', data => {
    console.log(data);
    message.innerText = data.data;
})

socket.on('check-connection', () => {
    socket.emit('checked-connection')
})

socket.on('send-message', ({message, socketId}) => {
    console.log(socketId, message);

    if (socketId){
        message.innerText = socketId + ' says : ' + data.message;
    } else {
        message.innerText = 'Server info : ' + data.message;
    }
})

socket.emit('new-user-entered', ({message, socketId}) => {
    console.log(socketId + ' says : ' + message);
    message.innerText = socketId + ' says : ' + data.message;
    setTimeout( () => {
        socket.emit('send-message', {
            message: 'Hi ' + socketId,
        })
    }, 500)
})


function clear(){
    socket.emit('clear-connections');
}