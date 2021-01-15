const socket = io();
const url = document.URL.split('/');
const mode = url[url.length - 1].split('.')[0]
console.log(url, mode );

socket.emit('companion-paired')
socket.emit('set-mode', mode);

socket.on('request-mode', () => {
    socket.emit('set-mode', mode);
})


socket.on('control-mode-changed', () => {
    background(0,255,0); // alert user
})