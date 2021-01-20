const osc       = require('node-osc');
const wekGetPort = process.env.OSC_RECEIVE_PORT || 12000;

const actions = require('../actions');
const filters = require('../actions/filters')
const store = require('../store')

module.exports = () => {
    const wekinatorServer = new osc.Server(wekGetPort, '127.0.0.1');

    wekinatorServer.on('message', async function(msg, info){
      // here I get an array where msg[0] == "/[gesture]", and others are confidence value of each model

      if (store.altTab && ['/swipe-left', '/swipe-right'].includes(msg[0])){
        console.log('Alt tab : '.yellow , msg[0])
        filters.lastRecognizedGesture = msg[0];
        
      } else if(!store.altTab && msg.length < 2){   
          if (filters.lastRecognizedGesture == '/access-collaborator' && msg[0] == '/swipe-right'){
          return;
        } else {
          filters.lastRecognizedGesture = msg[0];
        }
        console.log('Recognized gesture : '.yellow , msg[0])
      }
    })
}
