const colors = require('colors');
const filters = require('./filters');
const { io } = require('../server');
const { sendMessage } = require('../websocket/sendings')

module.exports = function({ action = filters.lastRecognizedGesture, token, socketId } = {}) {
    if (!filters.bounce() && action) {
        console.log('Perfomed gesture:'.yellow, action.bgYellow.black)
    }

    filters.lastRecognizedGesture = undefined;

    if (action) {
        io.in('companion').emit('action-gesture', action);
    }
}