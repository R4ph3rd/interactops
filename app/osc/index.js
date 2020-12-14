const { keyboard, Key, left, right, up, down } = require("@nut-tree/nut-js");

module.exports = async function(osc, io, externalDevicesHost, wekinatorGetHost, wekinatorSendHost){

const oscServer = new osc.Server(externalDevicesHost, '127.0.0.1');
const wekinatorServer = new osc.Server(wekinatorGetHost, '127.0.0.1');
const client = new osc.Client('127.0.0.1', wekinatorSendHost);

const sensorsLength = 13;
let data = {};

/* Executed when a new message arrives */
oscServer.on("message",function(msg, rinfo){

    // console.log('Message:', msg)

    if (msg[0] == '/sync'){
      data = {};
    } else {
      data[msg[0]] = msg[1];
    }


    // temp : expecting for a homemade app to control osc messages
    // while we get it, we use oschook and must collect data one channel after one other, so we gather everyting before sending it to wekinator
    if (Object.keys(data).length == sensorsLength){
      // console.log('Data : ', data)

      if(Object.keys(data).includes('/rotation_vector/r2')){
        // console.log("Message:");
        // console.log(msg[0] + ": " + msg[1]);

        const message = new osc.Message('/sync');
        message.append(data['/rotation_vector/r1']);
        message.append(data['/rotation_vector/r2']);
        message.append(data['/rotation_vector/r3']);
        message.append(data['/rotation_vector/r4']);
        message.append(0.00);

        client.send(message)
        // message.append(null);
        // console.log(message)
        /* client.send('/sync-1',
          data['/rotation_vector/r1'], 
          '/sync-2',
          data['/rotation_vector/r2'], 
          '/sync-3',
          data['/rotation_vector/r3'],
          '/sync-4',
          data['/rotation_vector/r4'],
          '/sync-5',
          null
        ) */
    }
    }
});

wekinatorServer.on('message', async function(msg, info){
  // here I get an array where msg[0] == "/sync", and others are confidence value of each model
  // We expect the following structure :
  
  if(msg.length > 1){   
    const empty = msg.filter(x => x != ('Infinity' || path))[msg.filter(x => x != ('Infinity' || path)).length - 1];

    io.emit('gestures-values', {
      data: msg
    })
  } else {
    console.log('---------------------------')
    console.log(msg)
    console.log('---------------------------')

    io.emit('gesture-detected', {
      data: msg[0]
    })

    switch (msg[0]){
      case '/swipe-right':
        console.log('------------------------- swipe right! -------------------------');
        await keyboard.type(Key.Right);
        break;
      case '/swipe-left':
        await keyboard.type(Key.Left);
        console.log('------------------------- swipe left! -------------------------');
        break;
    }
  }
})
}