const osc       = require('node-osc');

const wekSendPort =  process.env.OSC_SEND_PORT || 6448;
const client = new osc.Client('127.0.0.1', wekSendPort);

module.exports = function(data){
    const message = new osc.Message('/sync');
    message.append(data.acceleration[0]);
    message.append(data.acceleration[1]);
    message.append(data.acceleration[2]);

    client.send(message);
}
