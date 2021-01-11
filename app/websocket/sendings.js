const socket = require('./socket');

module.exports = {
    send: (data) => {
        socket.emit('share-content', {
            data
        })
    },
    shareAccess: (token) => {
        socket.emit('share-access', {
            token
        })
    },
    requestAccess: () => {
        socket.emit('request-access');
    },
    requestAction: ({action, remoteSocket, remoteToken}) => {
        socket.to(remoteSocket).emit('request-' + action, {
            token: remoteToken
        })
    },
    requestDownload: () => {
        socket.emit('request-content')
    }
}