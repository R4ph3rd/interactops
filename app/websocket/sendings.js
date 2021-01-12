const socket = require('./socket');

module.exports = {
    sendMessage: ({message, socketId}) => {
        console.log('send msg to ' + socketId + ' : ', message)
        socket.emit('send-message', {
            message,
            to: socketId
        })
    },
    send: ({data, fileName = undefined}) => {
        socket.emit('share-content', {
            data,
            fileName
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