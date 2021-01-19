const socket = io();
const url = document.URL.split('/');

socket.emit('companion-paired')
// socket.emit('set-mode', mode);

// socket.on('request-mode', () => {
//     socket.emit('set-mode', mode);
// })


socket.on('toggle-mode', () => {
    mode = !mode;
    console.log('mode', mode)
})

socket.on('action-ok', action => {
    console.log('action oko', action)
    if (feedbackAction){
        clearTimeout(clearFeedbackAction)
    }
    feedbackAction = action;
    clearFeedbackAction = setTimeout(() => {
        feedbackAction = undefined;
    }, 1000)
})


socket.on('update-local-screencast', ({image, buffer}) => {

    console.log('update local screencast !')

    if (fullscreen && fullscreen.classList.includes('hidden')){
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

socket.on('cool', () => {
    console.log('coool')
})