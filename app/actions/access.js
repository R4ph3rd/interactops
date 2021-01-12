const socketSendings = require('../websocket/sendings');
const actions = require('./index');

const tokens = {
    viewer : generateToken(),
    collaborator : generateToken(),
}

let remote = {
    token: null,
    socket: ''
};

const viewerRights = ['screencast'];
const collaboratorRights = [
                            '/top', '/down', '/right', '/left', 
                            '/share-throw', '/share-get', '/share-multi', 
                            '/swipe-right', '/swipe-left', '/alert'
                        ]

function generateToken() {
    let r = Math.random().toString(36);
    console.log("New token generated : ", r);

    return r;
}

module.exports = {
    shareViewerAccess: () => {
        socketSendings.shareAccess({token: tokens.viewer});
    },
    shareCollaboratorAccess: () => {
        socketSendings.shareAccess({token: tokens.collaborator});
    },
    requestAccess: () => {
        socketSendings.requestAccess();
    },
    requestAction: (action) => {
        socketSendings.requestAction({
            action,
            remoteSocket: remote.socket,
            remoteToken: remote.token
        });
    },
    getRequestAction: ({action, token, socket}) => {
        if(this.middleware(action, token)){
            actions(action);
        } else {
            socketSendings.sendMessage({
                socketId,
                msg: "You're not allowed to perform this action on the remote computer."
            })
        }
    },
    registerRemoteAccess: (remoteToken, remoteSocket) => {
        remote.token = remoteToken; 
        remote.socket = remoteSocket; 
    },
    middleware(action, token){
        if (token == tokens.viewer && viewerRights.includes(action)){
            return true;
        } else if (token == tokens.collaborator && collaboratorRights.includes(action)){
            return true;
        }
    }
}