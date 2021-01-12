const socket = io();
const mode = document.URL.split('/');
const screencast = document.getElementById('screencast');
console.log(mode[mode.length - 1].split('.')[0]);

socket.emit('companion-paired')
socket.emit('set-mode', mode[mode.length - 1].split('.')[0]);

socket.on('request-mode', () => {
    socket.emit('set-mode', mode[mode.length - 1].split('.')[0]);
})

socket.on('update-screencast', ({image, buffer}) => {
    console.log(image, buffer)
    if(image){
        const arrayBufferView = new Uint8Array(buffer);
        const blob = new Blob( [ arrayBufferView ], { type: "image/png" } );
        const urlCreator = window.URL || window.webkitURL;
        const img = urlCreator.createObjectURL( blob );

        screencast.src = img;

        console.log(" image: from client side", img);
     }
})

if(screencast){
    screencast.addEventListener('click', () => {
        socket.emit('request-screencast');
        console.log('request screencast');

    })

    screencast.onload = () => {
        console.log('image loaded');
        socket.emit('request-screencast');
    }
}