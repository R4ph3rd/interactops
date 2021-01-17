const screencast = document.getElementById('screencast');
console.log('screencast:', mode);

socket.on('update-screencast', ({image, buffer}) => {
    console.log(image, buffer)
    if(image){
        const arrayBufferView = new Uint8Array(buffer);
        const blob = new Blob( [ arrayBufferView ], { type: "image/png" } );
        const urlCreator = window.URL || window.webkitURL;
        const img = urlCreator.createObjectURL( blob );

        screencast.src = img;

        console.log(" image: from client side", img);
        screencast.style.border = '6px green solid'
     }
})

if(screencast){
    if (mode == 'dashboard'){
        screencast.addEventListener('click', () => {
            socket.emit('request-screencast');
            console.log('request screencast');
            screencast.style.border = '6px red solid'
    
        })
    } else if (mode == 'presentation'){
        socket.emit('request-screencast');
        console.log('request screencast');
    }

    screencast.onload = () => {
        console.log('image loaded');
        socket.emit('request-screencast');

        screencast.style.border = '6px green solid'
    }
}