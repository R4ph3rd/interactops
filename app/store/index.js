module.exports = {
    mode: null,
    screenSize: {x: 0, y: 0},
    controlMode: true,
    viewerRights : ['screencast'],
    collaboratorRights : [
        '/top', '/down', '/right', '/left', 
        '/share-throw', '/share-get', '/share-multi', 
        '/swipe-right', '/swipe-left', '/alert'
    ],
    tokens: {
        viewer : '',
        collaborator : '',
    },
    remote : {
        token: null,
        socket: null,
        requests: {},
        archived: []
    },
    remoteCastIsOpen: false
}