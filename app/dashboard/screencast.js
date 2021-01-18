const socket = io();

const screencast = document.getElementById('screencast');
const load = document.querySelector('.loading');

socket.emit('remote-screencast-opened')

socket.on('screencast-ended', () => {
    window.close();
})

socket.on('update-remote-screencast', ({image, buffer}) => {
    console.log(image, buffer)
    if(image){
        const arrayBufferView = new Uint8Array(buffer);
        const blob = new Blob( [ arrayBufferView ], { type: "image/png" } );
        const urlCreator = window.URL || window.webkitURL;
        const img = urlCreator.createObjectURL( blob );

        screencast.src = img;

        // console.log(" image: from client side", img);
        screencast.style.border = '3px green solid'
     }
})

if(screencast){
    socket.emit('request-remote-screencast');
    console.log('request remote screencast');
    screencast.style.border = '3px red solid'

    screencast.onload = () => {
        console.log('image loaded, request-screencast');
        socket.emit('request-remote-screencast');

        if (load){
            load.classList.remove('loading');
            load.removeChild(
                Array.from(load.children).find(child => child.localName == 'p')
            )
        }

        screencast.style.border = '3px green solid'
    }
}
