const socketSendings = require('../websocket/sendings');
const actions = require('./index');

const store = require('../store');

module.exports = {
    shareViewerAccess: () => {
        socketSendings.shareAccess({token: store.tokens.viewer});
    },
    shareCollaboratorAccess: () => {
        socketSendings.shareAccess({token: store.tokens.collaborator});
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
    getRequestAction: ({action, token, socket}) => {
        if(this.middleware(action, token)){
            actions(action);
        } else {
            socketSendings.sendMessage({
                socketId,
                message: "You're not allowed to perform this action on the remote computer."
            })
        }
    },
    registerRemoteAccess: (remoteToken, remoteSocket) => {
        store.remote.token = remoteToken; 
        store.remote.socket = remoteSocket; 
    },
    middleware(action, token){
        if (token == store.tokens.viewer && store.viewerRights.includes(action)){
            return true;
        } else if (token == store.tokens.collaborator && store.collaboratorRights.includes(action)){
            return true;
        }
    }
}