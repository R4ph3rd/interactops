module.exports = {
    mode: null,
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
    }
}