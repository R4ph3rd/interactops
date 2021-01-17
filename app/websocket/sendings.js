const socket   = require('./socket');
const ioStream = require('socket.io-stream');
const fs       = require('fs');

module.exports = {
    sendMessage: ({message, socketId}) => {
        // console.log('send msg to ' + socketId + ' : ', message)
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
    sendStream: ({path, streamName}) => {
        const stream = ioStream.createStream();
        ioStream(socket).emit('share-content', {
            stream,
            fileName: streamName
        })
        stream.pipe(fs.createWriteStream(path));

        console.log('send stream to server')
    },
    shareAccess: ({token, rights}) => {
        socket.emit('share-access', {
            token,
            rights
        })
    },
    requestAccess: () => {
        console.log('Request access token');
        socket.emit('request-access');
    },
    requestAction: ({action, remoteSocket, remoteToken}) => {
        console.log('Sending a action request to socket ' + remoteSocket + ' : ' + action)
        socket.emit('request-action', {
            to: remoteSocket,
            action,
            token: remoteToken
        })
    },
    requestCast: ({remoteSocket, remoteToken}) => {
        console.log('Sending a screencast request to socket '.green + remoteSocket)
        socket.emit('request-screencast', {
            to: remoteSocket,
            token: remoteToken,
            action: 'screencast'
        })
    },
    requestDownload: () => {
        socket.emit('request-content')
    },
    updateScreencast: ({to, buffer}) => {
        socket.emit('update-screencast', { to, image: true, buffer })
    },
    clearRemoteAccess: ({userList}) => {
        socket.emit('clear-access', {
            userList
        })
    }
}