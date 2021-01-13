const osc       = require('node-osc');
const wekGetPort = process.env.OSC_RECEIVE_PORT || 12000;

const actions = require('../actions');

let antiBounce = false;
const bounceStamp = 1000;

module.exports = () => {
    const wekinatorServer = new osc.Server(wekGetPort, '127.0.0.1');

    wekinatorServer.on('message', async function(msg, info){
      // here I get an array where msg[0] == "/gesture", and others are confidence value of each model
      // We expect the following structure :
      
      if(msg.length < 2){   
        
        if (!antiBounce){
          console.log('wek message : ', msg)
          actions(msg[0]);
          antiBounce = !antiBounce;

          setTimeout(() => {
            antiBounce = !antiBounce;
          }, bounceStamp)
        }
      }
    })
}
