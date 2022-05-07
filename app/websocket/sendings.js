const socket = require('./socket');
const ioStream = require('socket.io-stream');
const fs = require('fs');

module.exports = {
    sendMessage: ({ message, socketId }) => {
        // console.log('send msg to ' + socketId + ' : ', message)
        socket.emit('send-message', {
            message,
            to: socketId
        })
    },
    send: ({ data, fileName = undefined }) => {
        socket.emit('share-content', {
            data,
            fileName
        })
    },
}