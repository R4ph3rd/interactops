module.exports = function(http, port) {
    const express  = require('express');
    const app  = express();
    const companion  = require('http').Server(express);
    const io         = require('socket.io-client')(http); // connect to socket

    app.use(express.static(__dirname + "/public"));

    // Hosts the page on port [port]
    companion.listen(port, '0.0.0.0', function(){
        console.log("Companion is served on port " + port);
    });
}