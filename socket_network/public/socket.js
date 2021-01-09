const socket = io();
let users = 0;
const numberOfUsers = document.getElementById('users');
const message = document.getElementById('dataMessage');

console.log('SOcket server', numberOfUsers)

numberOfUsers.innerText = users ;

socket.on('update-users-list', data => {
    console.log(data);
    numberOfUsers.innerText = data.users.length;
})

socket.on('share-content', data => {
    console.log(data);
    message.innerText = data;
})