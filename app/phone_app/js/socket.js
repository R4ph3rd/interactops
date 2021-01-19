const socket = io();
const url = document.URL.split('/');

socket.emit('companion-paired')
socket.on('companion-recognized', () => {
    console.log("Everything is alright, capt'tain")
})
// socket.emit('set-mode', mode);

// socket.on('request-mode', () => {
//     socket.emit('set-mode', mode);
// })


socket.on('toggle-mode', () => {
    mode = !mode;
    console.log('mode', mode)
})

socket.on('action-ok', action => {
    console.log('action ok', action)
    if (feedbackAction){
        clearTimeout(clearFeedbackAction)
    }
    feedbackAction = action;
    clearFeedbackAction = setTimeout(() => {
        feedbackAction = undefined;
    }, 1000)
})