const socket = io();
const url = document.URL.split('/');

let controlMode = false;


socket.emit('companion-paired')
socket.on('companion-recognized', () => {
        console.log("Everything is alright, capt'tain")
    })
    // socket.emit('set-mode', mode);

// socket.on('request-mode', () => {
//     socket.emit('set-mode', mode);
// })


socket.on('action-gesture', action => {
    console.log(action);
    document.getElementById('RecGesture').innerText = action;

    if (feedbackAction) {
        clearTimeout(clearFeedbackAction)
    }
    feedbackAction = action;
    clearFeedbackAction = setTimeout(() => {
        feedbackAction = undefined;
    }, 1000)

    switch (action) {
        case '/swipeRight':
            nextScreen();
            break;
        case '/swipeLeft':
            prevScreen();
            break;
        case '/vocal':
            startVocal();
            break;
        case '/balise':
            placeTracker();
            break;
        case '/confirm':
            confirm();
            break;
        default:
            break;
    }
})