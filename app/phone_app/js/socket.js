
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

    if (document.URL.includes('dashboard')){
        if (action == 'change-control-mode'){
            if (control){
                document.querySelector('body').style.border = '5px solid yellow';
            } else {
                document.querySelector('body').style.border = '';
            }
        }
    }
})