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
    shareAccess: (token) => {
        socket.emit('share-access', {
            token
        })
    },
    requestAccess: () => {
        console.log('Request access token');
        socket.emit('request-access');
    },
    requestAction: ({action, remoteSocket, remoteToken}) => {
        socket.emit('request-action', {
            to: remoteSocket,
            action,
            token: remoteToken
        })
    },
    requestDownload: () => {
        socket.emit('request-content')
    }
}