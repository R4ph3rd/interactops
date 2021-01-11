const osc       = require('node-osc');

const wekSendPort =  process.env.OSC_SEND_PORT || 6448;
const client = new osc.Client('127.0.0.1', wekSendPort);

module.exports = function(data){
    if (data.rotation && data.acceleration){
        const message = new osc.Message('/companion-inputs');
        message.append(data.rotation[0]);
        message.append(data.rotation[1]);
        message.append(data.rotation[2]);
        message.append(data.acceleration[0]);
        message.append(data.acceleration[1]);
        message.append(data.acceleration[2]);

        // console.log('message', message)
        client.send(message);
    } else {
        console.warn('Data format exported from the companion is not correct. Please provide acceleration & rotation datas.')
    }
}
