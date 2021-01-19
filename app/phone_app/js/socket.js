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
    if (feedbackAction){
        clearTimeout(clearFeedbackAction)
    }
    feedbackAction = action;
    clearFeedbackAction = setTimeout(() => {
        feedbackAction = undefined;
    }, 1000)
})