const companion = require('./companion');
const network   = require('./network');

module.exports = function(io) {
/*  This is auto initiated event when Client connects to the server  */
  network();
  companion(io);
}