const app       = require("express")();
const express   = require("express");
const http      = require('http').Server(app);
const io        = require("socket.io")(http);
const host = 3030;

const { networkInterfaces } = require('os');

// // ========== Pages ========== //
// Allows acess to all files inside 'public' folder.
app.use(express.static(__dirname + "/app"));

http.listen(host,function(){
    console.log("App served on " + host);
});

for (let adress in ip()){
    console.log('Try to connect to this url on your phone : http://' + ip()[adress] + ':' + host)
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