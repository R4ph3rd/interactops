const filters = require('./filters');
const keyboardActions = require('./keyboard');
const fileActions = require('./file');
const accessActions = require('./access');
const store = require('../store')

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
            if (store.mode == 'presentation'){
                accessActions.shareCollaboratorAccess();
            } else if (store.mode == 'remote'){
                accessActions.requestAccess();
            } else if (store.mode == 'dashboard'){
                accessActions.shareCollaboratorAccess();
            }
            break;
        case '/access-viewer':
            if (store.mode == 'presentation'){
                accessActions.shareViewerAccess();
            } else if (store.mode == 'remote'){
                accessActions.requestAccess();
            } else if (store.mode == 'dashboard'){
                accessActions.shareViewerAccess();
            }
            break;
        case '/request-access':
            console.log('Request access from dashboard', store)
            if (store.mode == 'dashboard'){
                accessActions.requestAccess();
            }
            break;
        case '/alert':
            // shareAlert();
            console.warn('Alert !')
    }
}