const app       = require("express")();
const express   = require("express");
const http      = require('http').Server(app);
const io        = require("socket.io")(http);
const host = 3030;
// // ========== Pages ========== //
// Allows acess to all files inside 'public' folder.
app.use(express.static(__dirname + "/app"));

http.listen(host,function(){
    console.log("Listening on " + host);
});