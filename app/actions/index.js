const filters = require('./filters');
const keyboardActions = require('./keyboard');
const fileActions = require('./file');
const accessActions = require('./access');
const store = require('./store')

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
            if (mode == 'presentation'){
                accessActions.shareCollaboratorAccess();
            } else if (mode == 'remote'){
                accessActions.requestAccess();
            }
            break;
        case '/access-viewer':
            if (store.mode == 'presentation'){
                accessActions.shareViewerAccess();
            } else if (store.mode == 'remote'){
                accessActions.requestAccess();
            } else if (store.mode == 'debug' || null){
                
            }
            break;
        case '/alert':
            // shareAlert();
            console.warn('Alert !')
    }
}