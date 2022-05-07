const fs = require('fs'); // required for file serving
const colors = require('colors');
const { io } = require('../server')
    // const dwt = require('../../features_standalone_examples/DTW')
const oscSend = require('../osc/send');
const actions = require('../actions')
const filters = require('../actions/filters')

let companionIsConnected = false;
let antiBounce = false;
let companionID = undefined;

// let controlBounce = false;
// let controlMode = true;

module.exports = function() {
    io.on('connection', function(socket) {

        socket.on('companion-paired', () => {
            console.log('  Interactops Companion is connected  '.bgGreen.black);

            if (!companionIsConnected) {
                companionIsConnected = !companionIsConnected;
                companionID = socket.id;
            }
            socket.join('companion');
            socket.emit('companion-recognized')
        })

        socket.emit('request-mode');

        socket.on('sensors-data', data => {
            // console.log('new datas :', data)

            oscSend(data);
            // dwt.compute(data)
        })

        socket.on('train-data', data => {
            console.log('... sending data')
            dwt.trainGesture(data);
        })

        socket.on('start-sending-data', () => {
            console.log('\n-------------- start ---------------'.yellow);
            filters.toggleBounce(true);
            // dwt.clear();
        })

        socket.on('end-sending-data', () => {
            console.log('-------------- end ---------------\n'.yellow);
            setTimeout(() => {
                    filters.toggleBounce(false);

                    setTimeout(() => {
                        filters.resetClicks();
                    }, 200)


                    actions();
                }, 50)
                // dwt.registerExample('share-throw');
        })

        socket.on('disconnect', () => {
            if (socket.id == companionID) {
                console.log('-- Companion is disconnected --'.black.bgGreen)
            }
        })

        socket.on('disconnecting', () => {
            if (socket.rooms.has('remote')) {
                console.log('  Remote screencast is disconnected  '.black.bgGreen);
            }
        })
    });
}