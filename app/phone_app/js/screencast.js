const screencast = document.getElementById('screencast');
const fullscreen = document.querySelector('.fullscreen');

let whoCast = 'local';

socket.on('update-screencast', ({image, buffer, who = 'local'}) => {

    console.log('update screencast !')

    if (fullscreen && Array.from(fullscreen.classList).includes('hidden')){
        fullscreen.classList.remove('hidden');
    }

    whoCast = who;

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
    if (document.URL.includes('dashboard')){
        screencast.addEventListener('click', () => {
            if (whoCast == "local"){
                socket.emit('screencast-companion-request');            
            } else {
                socket.emit('request-remote-screencast');
            }
            console.log('request screencast');
            screencast.style.border = '6px red solid'
    
        })
    }

    screencast.onload = () => {
        if (!document.URL.includes('dashboard')){
            console.log('image loaded', Array.from(screencast.parentElement.children));
            screencast.removeChild(
                Array.from(screencast.parentElement.children).find(child => child.localName == 'p')
            )
        }

        if (whoCast == "local"){
            socket.emit('screencast-companion-request'); 
            screencast.style.border = '6px green solid'           
        } else {
            socket.emit('request-remote-screencast');
        }

        
    }
}