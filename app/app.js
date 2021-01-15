const express   = require("express");
const app       = express();
const http      = require('http').Server(app);
const io        = require("socket.io")(http);

const colors = require('colors');
var fp = require("find-free-port")

const { keyboard, screen, width, height}  = require("@nut-tree/nut-js");
const {join}                = require('path'); 
const { networkInterfaces } = require('os');

const mutations = require('./store/mutations')

// patterns & host declaration
const appPort           = process.env.APP_PORT || 3000;

require('./osc/receive.js')();
require('./websocket/index.js')(io);
require('./store/mutations').setTokens();

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

// Hosts the page on port [freePort]
fp(appPort, function(err, freePort){
    http.listen(freePort, async function(){
        for (let adress in ip()){
            console.log('---------------------------------------------------------------------------------------------------------------------\n\n',)
            console.log('Interactops'.rainbow.bold)
            const str = '\nTry to connect to this url on your phone : ';
            const str1 = 'http://' + ip()[adress] + ':' + freePort + '/companion';
            console.log(str + str1.green)
        }

        const str = 'http://localhost:' + freePort;
        console.log('Companion is served on :' + `http://localhost:${freePort}/companion`.green);
        console.log("Open app dashboard: " + str.green);
        
        // store screen size in sync way
        mutations.setScreenSize({x: await screen.width(), y: await screen.height()})
    })
});




// nut-js setup
try{
    keyboard.config.autoDelayMs = 150;

    screen.config.ressourceDirectory = join(__dirname, './store/assets');
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