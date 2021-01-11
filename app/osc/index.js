const osc       = require('node-osc');
const keyboardActions = require('../actions/keyboard');
const fileActions = require('../actions/file');

const { shareThrow, shareGet, shareMulti, shareAccess, shareScreen, shareAlert} = require("../websocket/sendings");
const filters = require('./filters');
const receive = require('./receive');


module.exports = async function(){
  const sensorsLength = 13;
  let data = {};

  receive();
}