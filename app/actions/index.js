const colors = require('colors');
const filters = require('./filters');
const {right, left} = require('./keyboard');
const {copySend, requestDownload} = require('./file');
const {shareViewerAccess, shareCollaboratorAccess, requestAccess, closeAccess, requestAction, getRequestAction} = require('./access');
const store = require('../store');
const mutations = require('../store/mutations');

module.exports = function ({action = filters.lastRecognizedGesture, token , socketId} = {}){
    if (action != '/close-access' && (store.mode == 'remote' || store.mode == 'dashboard') && store.remote.token != null && store.remote.socket != null){
        requestAction(action);
    } else {
        if ((store.controlMode && !filters.bounce() && action ) || (token && socketId && getRequestAction({action, token, socketId}))){
            console.log('Perfomed gesture:'.yellow, action.bgYellow.black)
            switch (action){
                case '/swipe-right':
                    right();
                    break;
                case '/swipe-left':
                    left();
                    break;
                case '/share-throw':
                    copySend();
                    break;
                case '/share-get':
                    requestDownload();
                    break;
                case '/share-multi':
                    copySend();
                    break;
                case '/change-control-mode':
                    mutations.toggleControlMode();
                    break;
                case '/access-collaborator':
                    if (store.mode == 'presentation'){
                        shareCollaboratorAccess();
                    } else if (store.mode == 'remote'){
                        requestAccess();
                    } else if (store.mode == 'dashboard'){
                        shareCollaboratorAccess();
                    }
                    break;
                case '/access-viewer':
                    if (store.mode == 'remote'){
                        requestAccess();
                    } else {
                        shareViewerAccess();
                    }
                    break;
                case '/request-access':
                    if (store.mode == ('dashboard' || 'remote')){
                        requestAccess();
                    }
                case '/close-access':
                    if (store.mode == 'control'){
                        closeAccess(true);
                    }
                    else if (store.mode == 'dashboard'){
                        closeAccess(true);
                        closeAccess(false);
                    }
                    else if (store.mode == 'remote'){
                        closeAccess(false);
                    }
                    break;
                case '/alert':
                    // shareAlert();
                    console.warn('Alert !')
            }

        } else if (!store.controlMode && action == '/change-control-mode'){
            mutations.toggleControlMode();
        }

        filters.lastRecognizedGesture = undefined;
    }
}