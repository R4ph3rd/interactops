const { shareThrow, shareGet, shareMulti, shareAccess, shareScreen, shareAlert} = require("../websocket/sendings");
const filters = require('./filters');
const keyboardActions = require('../actions/keyboard');
const fileActions = require('../actions/file');

module.exports = function (msg){
    switch (msg){
        case '/swipe-right':
            keyboardActions.right();
            break;
        case '/swipe-left':
            keyboardActions.left();
            break;
        case '/share-throw':
            /* if (filters.phoneIsDown(data)){
              shareThrow();
            } */
            fileActions.copySend();
  
            break;
        case '/share-get':
            if (filters.phoneIsUp(data)){
                shareGet();
            }
            break;
        case '/share-multi':
            shareMulti();
            break;
        case '/share-access':
            shareAccess()
            break;
        case '/share-screen':
            shareScreen();
            break;
        case '/alert':
            shareAlert();
    }
}