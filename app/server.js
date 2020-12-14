const app       = require("express")();
const express   = require("express");
const http      = require('http').Server(app);
const io        = require("socket.io")(http);
const osc       = require('node-osc');

// patterns & host declaration
const path = '/wek/outputs';
const dashboardHost = 3000;
const externalDevicesHost = 12000;
const wekinatorGetHost = 12001;
const wekinatorSendHost = 6448;


// // ========== Pages ========== //
// Allows acess to all files inside 'public' folder.
app.use(express.static(__dirname + "/public"));

require('./osc/index.js')(osc, io, externalDevicesHost, wekinatorGetHost, wekinatorSendHost);
require('./websocket/index.js')(io, http, dashboardHost);