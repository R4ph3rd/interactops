const socket    = require('socket.io-client')('https://interactops.herokuapp.com/'); // connect to socket network
const companion = require('./companion');
const network   = require('./network');

module.exports = function(io) {
/*  This is auto initiated event when Client connects to the server  */
  network(socket);
  companion(io);
}