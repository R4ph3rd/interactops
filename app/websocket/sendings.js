const socket   = require('./socket');
const ioStream = require('socket.io-stream');
const fs       = require('fs');

const stream = ioStream.createStream();

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
    sendStream: ({path, streamName}) => {
        ioStream(socket).emit('share-content', {
            data: stream,
            fileName: streamName
        })
        stream.pipe(fs.createWriteStream(path));
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