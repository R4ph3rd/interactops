# Interactops
Using your phone as remote controller for your desktop to enable flexible cross-devices and human-to-human interactions.
This project use [Wekinator](http://www.wekinator.org/) to determine gestures from data stream sended by mobile devices.
We use [Socket.io]() to communicate between users and OSC to communicate between ours mobile device to Wekinator (working on the synchronised computer).
[osc-js](https://github.com/adzialocha/osc-js).


NB: Public folder holds a exemple of peer 2 peer connections with webRTC using a socket server to setup the connections. Maybe not really usefull for now, but at least, it holds example of how socket.io works.

## Install project
```
npm install
```
## Run project
```
node index.js
```