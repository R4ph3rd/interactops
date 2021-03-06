// DESKTOP AUTOMATION
function right(){
    console.log('right !')
    socket.emit('fake-action', '/swipe-right');
}

function left(){
    console.log('left !')
    socket.emit('fake-action', '/swipe-left');
}

function changeWindow(){
    console.log('change window !')
    socket.emit('fake-action', 'alt-tab')
}

function clickMouse(){
    console.log('click !')
    socket.emit('fake-action', 'click')
}

function changeMode(){
    console.log('toggle mouse !')
    socket.emit('fake-action', '/change-control-mode');
}



//////////////// DATA SHARING /////////////////

function copySend(type){
    if (!type){
        console.log('copy send to one!');
        socket.emit('fake-action', '/share-throw');
    } else {
        console.log('copy send to many!');
        socket.emit('fake-action', '/share-multi');
    }
}

function download(){
    console.log('download !');
    socket.emit('fake-action', '/share-get');
}

//////////////// ACCESS //////////////
function access(type){
    if (type){
        console.log('share collaborator access');
        socket.emit('fake-action', '/access-collaborator');
    } else {
        console.log('share viewer access');
        socket.emit('fake-action', '/access-viewer');
    }
}

function requestAccess(){
    console.log('request access')
    socket.emit('fake-action', '/request-access')
}

function closeAccess(){
    console.log('Close access')
    socket.emit('fake-action', '/close-access')
}