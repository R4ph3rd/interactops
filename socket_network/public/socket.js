const socket = io();
let users = 0;
const numberOfUsers = document.getElementById('users');

console.log('SOcket server', numberOfUsers)

numberOfUsers.innerText = users ;

socket.on('update-users-list', data => {
    console.log(data);
    numberOfUsers.innerText = data.users.length;
})