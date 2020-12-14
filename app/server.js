const app       = require("express")();
const express   = require("express");
const http      = require('http').Server(app);
const io        = require("socket.io")(http);
const osc       = require('node-osc');

const { keyboard, Key, mouse, left, right, up, down, screen } = require("@nut-tree/nut-js");
const {join} = require('path'); 

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


// nut-js setup
try{
    keyboard.config.autoDelayMs = 150;

    screen.config.ressourceDirectory = join(__dirname, 'assets');
    screen.config.autoHighlight = true;
    screen.config.highlightDuration = 1000;

} catch(e){
    console.error(e)
}