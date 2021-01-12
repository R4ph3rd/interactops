const socket = require('./socket');

module.exports = {
    sendMessage: (msg, socketId) => {
        console.log('send msg to ' + socketId + ' : ', msg)
        socket.to(socketId).emit('send-message', {
            message: msg
        })
    },
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
            action,
            token: remoteToken
        })
    },
    requestDownload: () => {
        socket.emit('request-content')
    }
}