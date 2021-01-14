const socketSendings = require('../websocket/sendings');
const actions = require('./index');

const store = require('../store');
const mutations = require('../store/mutations');

module.exports = {
    shareViewerAccess: () => {
        socketSendings.shareAccess({token: store.tokens.viewer});
        console.log('Sharing viewer access'.green)
    },
    shareCollaboratorAccess: () => {
        socketSendings.shareAccess({token: store.tokens.collaborator});
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
    getRequestAction: ({action, token, socketId}) => {
        if(module.exports.middleware(action, token)){
            actions(action);
        } else {
            socketSendings.sendMessage({
                socketId,
                message: "You're not allowed to perform this action on the remote computer."
            })
        }
    },
    registerRemoteAccess: ({remoteToken, remoteSocket}) => {
        mutations.setRemote({remoteSocket, remoteToken});
    },
    closeAccess: (which) => {
        if (which){
            mutations.setTokens();
        } else {
            mutations.clearRemote();
        }
    },
    middleware({action, token}){
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
    }
}