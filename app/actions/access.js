const open = require('open');
const socketSendings = require('../websocket/sendings');
const {io} = require('../server');

const actions = require('./index')
const store = require('../store');
const mutations = require('../store/mutations');

module.exports = {
    shareViewerAccess: () => {
        socketSendings.shareAccess({token: store.tokens.viewer, rights: 'viewer'});
        console.log('Sharing viewer access'.green)
    },
    shareCollaboratorAccess: () => {
        socketSendings.shareAccess({token: store.tokens.collaborator, rights: 'collaborator'});
        console.log('Sharing collaborator access'.green)
    },
    requestAccess: () => {
        socketSendings.requestAccess();
    },
    requestAction: (action) => {
        socketSendings.requestAction({
            action,
            remoteSocket: store.remote.socket,
            remoteToken: store.remote.token
        });
    },
    requestCast: () => {
        socketSendings.requestCast({
            remoteSocket: store.remote.socket,
            remoteToken: store.remote.token
        })
    },
    getRequestAction: ({action, token, socketId}) => {
        if(module.exports.middleware({action, token, socketId})){
            // actions(action);
            return true;
        } else {
            socketSendings.sendMessage({
                socketId,
                message: "You're not allowed to perform this action on the remote computer."
            })

            return false;
        }
    },
    registerRemoteAccess: ({remoteToken, remoteSocket, rights}) => {
        mutations.setRemote({remoteSocket, remoteToken, rights});

        if (rights == 'viewer'){
            module.exports.getCast();
        }
    },
    closeAccess: (which) => {
        if (which){
            mutations.setTokens();
        } else {
            mutations.clearRemote();
            mutations.toggleCast();
        }
    },
    middleware({action, token, socketId}){
        mutations.registerRequest({action, token, socketId});
        if (token == store.tokens.viewer && store.viewerRights.includes(action)){
            console.log('Viewer"s request authorized'.green)
            return true;
        } else if (token == store.tokens.collaborator && store.collaboratorRights.includes(action)){
            console.log('Collaborator"s request authorized'.green)
            return true;
        } else {
            console.log('Request not authorized.'.red);
            return false;
        }
    },
    getCast: async ({buffer} = {}) => {
        if (!store.remoteCastIsOpen){
            await open('http://localhost:3000/remote.html', {wait:true});
            console.log('Openning browerser window to screencast');
            mutations.toggleCast();

            io.emit('update-remote-screencast', {
                buffer,
                image: true
            })
        }
    }
}