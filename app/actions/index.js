const filters = require('./filters');
const keyboardActions = require('./keyboard');
const fileActions = require('./file');
const accessActions = require('./access');
const store = require('../store');
const socketSendings = require('../websocket/sendings');

module.exports = function (msg){
    const filteredAction = filters.lastRecognizedGesture || msg;

    if (store.mode == 'remote' && store.remote.token != null && store.remote.socket != null){
        socketSendings.requestAction(filteredAction);
    } else {
        if (!filters.bounce()){
            console.log('Perfomed gesture:'.yellow, filteredAction.bgYellow.black)
            switch (filteredAction){
                case '/swipe-right':
                    keyboardActions.right();
                    break;
                case '/swipe-left':
                    keyboardActions.left();
                    break;
                case '/share-throw':
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
                    if (store.mode == 'dashboard'){
                        accessActions.requestAccess();
                    }
                    break;
                case '/alert':
                    // shareAlert();
                    console.warn('Alert !')
            }
        }
    }
}