# Interactops
Using your phone as remote controller for your desktop to enable flexible cross-devices and human-to-human interactions.
This project use [Wekinator](http://www.wekinator.org/) to determine gestures from data stream sended by mobile devices.
We use [Socket.io]() to communicate between users and OSC to communicate between ours mobile device to Wekinator (working on the synchronised computer).
[node-osc](https://github.com/MylesBorins/node-osc).


NB: Public folder holds a exemple of peer 2 peer connections with webRTC using a socket server to setup the connections. Maybe not really usefull for now, but at least, it holds example of how socket.io works.

> Following instructions are temporary. Example with a nodejs server isn't working well for now (only receiving), I've reused a Processing example to work on gestures for getting messages from the phone and sending to Wekinator. I can send them then to the nodejs server, but the goal is also to get data from phone on the nodejs server.

## Get data from built-in sensors on Android phone
1. Download oscHook on Android Store.
2. In the app, open menu (top right), click on ``OSC adress setup`` and enable only rotation data
3. On ``IP/ port setup``, choose the proper IP adress of your laptop and set the port on **12000**.
    > You can get your IP adress by running the script ipadress.js at the rook of the repo :
    > ```
    >    node ipadress.js
    > ```
4. Set OSC timing to 50ms.
5. Ensure that your phone and your computer are on the same network and start recording.

## Get data on laptop with Processing
1. Open the Processing sketch : ``osc_phone_to_wekinator``.
2. Ensure that you're listening the port 12000:
```java
    oscP5 = new OscP5(this,12000);
```
3. Ensure that you're sending to the port 6448 of your localhost:
```java
    myRemoteLocation = new NetAddress("127.0.1",6448);
```

## Get data on laptop with Nodejs
1. Go to the ``app`` folder and install dependecies : ``` npm install```
2. Ensure that you're listening ports 12000 (for mobile device), 12001 (for Wekinator), and sending on the 6448:
```javascript
    const dashboardHost = 3000;
    const externalDevicesHost = 12000;
    const wekinatorGetHost = 12001;
    const wekinatorSendHost = 6448;
```
> We split mobile device & wekinator inputs to avoid overloading on the port (phone should send data each 50ms). 
3. Run the desktop app and open the gestures dashboard in your browser : ``localhost:3000``:
```
    npm run start
```

## Run models on Wekinator
1. Open the project in ``wekinator / interactops`` in Wekinator.
2. Ensure that it is listening the port 6448 ( View > OSC receiver status > port & start listening)
3. Ensure that it is sending messages on port 12001 (View > OSC outputs)
4. On the main window, if you're alreading sending data on the port, the pin OSC in should be green.
5. If so, you can train new models (each line of the **gestures** array) : 
    - click on ``+`` as near as possible of your gesture. The number of examples should increase of one on the right.
    - click on ``-`` to remove the last record
    - Around 15-20 trainings should be enough to start
    - Always train a blank model because Wekinator always compare all of the recorded models which one is the nearest one. This blank one will serve to get undesirables values
6. When yours models are trained, you can ``Run`` your project and check that yours gestures are recognized.
7. You can define the threshold match with the slider on the bottom side of the window to allow easy gesture recognition without getting too much noise.

> For further explanations of how Wekinator works, check their explanations : [Wekinator wiki](http://www.wekinator.org/detailed-instructions/). Check the **Time warping** section (for recording data variance in time).


## Remote desktop control using Nut.js

> Nut-js need different setup according to your OS, please follow the instructions of the official documentation before start.

Official documentations here : [Nut.js](https://github.com/nut-tree/nut.js)

A test example has been proved on Fedora 32 (Unix), holded in the folder ``desktop-control``.

```
cd desktop-control
npm install
node index.js
```


### Documentation of Nut.js

- [Keys](https://nut-tree.github.io/nut.js/enums/key.html)


## Testing our prototype 
The user test process is described [here](./user-tests/user-test_script.md)