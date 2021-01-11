const socket = require('./socket');

module.exports = function () {
    return {
        send: (data) => {
            socket.emit('share-content', {
                data
            })
        },
        shareCollaboratorAccess: (token) => {
            socket.emit('share-access', {
                token
            })
        },
        shareViewerAccess: (token) => {
            socket.emit('share-access', {
                token
            })
        },
        requestAccess: (remoteToken) => {
            socket.emit('request-access', {
                token : remoteToken,
            })
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
}