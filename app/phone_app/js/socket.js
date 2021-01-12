const socket = io();
const mode = document.URL.split('/');
console.log(mode[mode.length - 1].split('.')[0]);

socket.emit('companion-paired')
socket.emit('set-mode', mode[mode.length - 1].split('.')[0]);

socket.on('request-mode', () => {
    socket.emit('set-mode', mode[mode.length - 1].split('.')[0]);
})