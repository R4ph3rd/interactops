function generateToken() {
    let r = Math.random().toString(36);
    console.log("New token generated : ", r);

    return r;
}

module.exports = {
    mode: null,
    viewer : generateToken(),
    collaborator : generateToken(),
    viewerRights : ['screencast'],
    collaboratorRights : [
        '/top', '/down', '/right', '/left', 
        '/share-throw', '/share-get', '/share-multi', 
        '/swipe-right', '/swipe-left', '/alert'
    ],
    remote : {
        token: null,
        socket: ''
    }
}