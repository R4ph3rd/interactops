const osc       = require('node-osc');

const { shareThrow, shareGet, shareMulti, shareAccess, shareScreen, shareAlert} = require("../websocket/sendings");
const filters = require('./filters');
const keyboardActions = require('../actions/keyboard');
const fileActions = require('../actions/file');
const path                = '/wek/outputs';

const wekGetPort = process.env.OSC_RECIEVE_PORT || 12000;

module.exports = () => {
    const wekinatorServer = new osc.Server(wekGetPort, '127.0.0.1');

    wekinatorServer.on('message', async function(msg, info){
    // here I get an array where msg[0] == "/sync", and others are confidence value of each model
    // We expect the following structure :
    
    if(msg.length < 2){   
      console.log('wek message : ', msg)
      const empty = msg.filter(x => x != ('Infinity' || path))[msg.filter(x => x != ('Infinity' || path)).length - 1];

  
    //   io.emit('gestures-values', {
    //     data: msg
    //   })
    // } else {
    //   io.emit('gesture-detected', {
    //     data: msg[0]
    //   })
  
      switch (msg[0]){
        case '/swipe-right':
          keyboardActions.right();
          break;
        case '/swipe-left':
          keyboardActions.left();
          break;
        case '/share-throw':
          /* if (filters.phoneIsDown(data)){
            shareThrow();
          } */
          fileActions.copySend();
  
          break;
        case '/share-get':
          if (filters.phoneIsUp(data)){
            shareGet();
          }
          break;
        case '/share-multi':
          shareMulti();
          break;
        case '/share-access':
          shareAccess()
          break;
        case '/share-screen':
          shareScreen();
          break;
        case '/alert':
          shareAlert();
      }
    }
  })
}
