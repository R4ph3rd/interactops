const express   = require("express");
const app       = express();
const http      = require('http').Server(app);
const io        = require("socket.io")(http);
const osc       = require('node-osc');

const { keyboard, Key, mouse, left, right, up, down, screen } = require("@nut-tree/nut-js");
const {join}                = require('path'); 
const { networkInterfaces } = require('os');

// patterns & host declaration
const path                = '/wek/outputs';
const appPort           = process.env.PORT || 3000;
const externalDevicesHost = 12000;
const wekinatorGetHost    = 12001;
const wekinatorSendHost   = 6448;


/////////////  PAGES   /////////////////
// dashboard(socketIO, dashboardPort);
app.use(express.static(__dirname + "/dashboard"));
app.use(express.static(__dirname + "/phone_app"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dashboard/index.html');
});

app.get('/companion', function (req, res) {
    res.sendFile(__dirname + '/phone_app/index.html');
});

// Hosts the page on port [appPort]
http.listen(appPort, function(){
    console.log("Open dashboard: http://localhost:" + appPort);
    console.log(`Companion is served on : http://localhost:${appPort}/companion`);
});

// phoneApp(http, phonePort);

for (let adress in ip()){
    console.log('Try to connect to this url on your phone : http://' + ip()[adress] + ':' + appPort + '/companion')
}

require('./osc/index.js')(osc, io, externalDevicesHost, wekinatorGetHost, wekinatorSendHost);
require('./websocket/index.js')(io);


// nut-js setup
try{
    keyboard.config.autoDelayMs = 150;

    screen.config.ressourceDirectory = join(__dirname, 'assets');
    screen.config.autoHighlight = true;
    screen.config.highlightDuration = 1000;

} catch(e){
    console.error(e)
}


function ip (){
    const nets = networkInterfaces();
    const results = Object.create(null); // or just '{}', an empty object

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }

                results[name].push(net.address);
            }
        }
    }

    return results;
}