const filters = require('./filters');
const keyboardActions = require('./keyboard');
const fileActions = require('./file');
const accessActions = require('./access');

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
            fileActions.requestDownload();
            break;
        case '/share-multi':
            fileActions.copySend();
            break;
        case '/access-collaborator':
            // accessActions()
            break;
        case '/access-viewer':
            // accessActions();
            break;
        case '/alert':
            // shareAlert();
            console.warn('Alert !')
    }
}