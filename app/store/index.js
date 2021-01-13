function generateToken() {
    let r = Math.random().toString(36);
    console.log("New token generated : ", r);

    return r;
}

//generating tokens

module.exports = {
    mode: null,
    viewerRights : ['screencast'],
    collaboratorRights : [
        '/top', '/down', '/right', '/left', 
        '/share-throw', '/share-get', '/share-multi', 
        '/swipe-right', '/swipe-left', '/alert'
    ],
    tokens: {
        viewer : generateToken(),
        collaborator : generateToken(),
    },
    remote : {
        token: null,
        socket: null
    }
}