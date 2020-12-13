module.exports = function(osc, externalDevicesHost, wekinatorGetHost, wekinatorSendHost){

const oscServer = new osc.Server(externalDevicesHost, '127.0.0.1');
const wekinatorServer = new osc.Server(wekinatorGetHost, '127.0.0.1');
const client = new osc.Client('127.0.0.1', wekinatorSendHost);


/* Executed when a new message arrives */
oscServer.on("message",function(msg, rinfo){

    // console.log('Message:', msg)
    if(msg[0] == '/rotation_vector/r2'){
        console.log("Message:");
        console.log(msg[0] + ": " + msg[1]);

        // const message = new osc.Message('/r2');
        // message.append(msg[1]);
        // console.log(message)
        client.send('/r2', msg[1])
    }
});

wekinatorServer.on('message', function(msg, info){
  // here I get an array where msg[0] == "/wek/outputs", and others are confidence value of each model
  // We expect the following structure :
  // msg[1] => throwing gesture
  // msg[2] => getting gesture
  // msg[3] => range sharing gesture
  // msg[4] => empty model
  console.log('---------------------------')
  console.log(msg)
  console.log('---------------------------')

  
  if(msg.length > 1 && msg[0] != ('next' || 'previous')){
    const empty = msg.filter(x => x != ('Infinity' || path))[msg.filter(x => x != ('Infinity' || path)).length - 1];

    io.emit('gestures-values', {
      data: msg
    })
  } else {
    io.emit('gesture-detected', {
      data: msg[0]
    })
  }
})
}