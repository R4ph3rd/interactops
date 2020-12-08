var app       =     require("express")();
var express = require("express");
var http      =     require('http').Server(app);
var io        =     require("socket.io")(http);
var osc       =     require('node-osc');
var oscServer = new osc.Server(12000, '127.0.0.1');
var wekinatorServer = new osc.Server(12001, '127.0.0.1');
const client = new osc.Client('127.0.0.1', 6448);
const path = '/wek/outputs';


// ========== Pages ========== //
// Allows acess to all files inside 'public' folder.
app.use(express.static(__dirname + "/public"));

// Configures each link to a different page.
// e.g. localhost:3000/   will load index.html
// e.g. localhost:3000/led    will load led.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/led', function(req, res) {
    res.sendFile(__dirname + '/public/led.html');
});
app.get('/luminosidade', function(req, res) {
    res.sendFile(__dirname + '/public/luminosidade.html');
});
app.get('/shast', function(req, res) {
    res.sendFile(__dirname + '/public/shast.html');
});


// ========== OSCSERVER ========== //
/* Executed when a new message arrives */
oscServer.on("message",function(msg, rinfo){
  
  // io.emit will send a code (e.g. 'expLumin') that will be received by
  // all the pages with the parameters. You choose what to do on each necessary
  // HTML page. (See 'shast.html' code for more information).
  if(msg[0] == '/rotation_vector/r2'){
    // console.log("Message:");
    // console.log(msg[0] + ": " + msg[1]);

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

  
  if(msg.length > 1){
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

// ========== SOCKET.IO ========== //
/*  This is auto initiated event when Client connects to the server  */
io.on('connection',function(socket){  
    console.log("A user is connected");
});

// Hosts the page on port 3000
http.listen(3000,function(){
    console.log("Listening on 3000");
});
