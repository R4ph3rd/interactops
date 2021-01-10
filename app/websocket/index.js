const companion = require('./companion');
const incomings = require('./incomings');

module.exports = function(io) {
/*  This is auto initiated event when Client connects to the server  */
  companion(io);
  incomings()
}