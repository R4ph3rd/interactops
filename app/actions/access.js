const socketSendings = require('../websocket/sendings');

const tokens = {
    viewer : generateToken(),
    collaborator : generateToken(),
}

let remote = {
    token: null,
    socket: ''
};

const viewerRights = ['screencast'];
const collaboratorRights = ['top', 'down', 'right', 'left', 'copySend', 'download']

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