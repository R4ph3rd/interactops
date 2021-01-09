const socket    = require('socket.io-client')('https://interactops.herokuapp.com/'); // connect to socket network

module.exports = {
    send: (data) => {
        socket.emit('share-content', {
            data: data
        })
    }
}