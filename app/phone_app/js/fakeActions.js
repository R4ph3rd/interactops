// DESKTOP AUTOMATION
function right(){
    console.log('right !')
    socket.emit('fake-action', '/swipe-right');
}

function left(){
    console.log('left !')
    socket.emit('fake-action', '/swipe-left');
}

function up(){
    console.log('up !')
}

function down(){
    console.log('down !')
}



//////////////// DATA SHARING /////////////////

function copySend(type){
    if (!type){
        console.log('copy send to many!');
        socket.emit('fake-action', '/share-throw');
    } else {
        console.log('copy send to one!');
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

function closeAccess(){
    console.log('Close access')
}