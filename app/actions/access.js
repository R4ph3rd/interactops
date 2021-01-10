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
    shareCollaboratorAccess: () => {
        socket.emit('share-access', {
            token: tokens.collaborator,
        })
    },
    shareViewerAccess: () => {
        socket.emit('share-access', {
            token : tokens.viewer,
        })
    },
    requestAccess: () => {
        socket.emit('request-access', {
            token : remoteToken,
        })
    },
    getAccess: (remoteToken, remoteSocket) => {
        remote.token = remoteToken; 
        remote.socket = remoteSocket; 
    },
    middleware(action, token){
        if (token == tokens.viewer && viewerRights.includes(action)){
            return true;
        } else if (token == tokens.collaborator && collaboratorRights.includes(action)){
            return true;
        }
    },
    remoteAction: (action) => {
        socket.to(remote.socket).emit('request-' + action, {
            token: remoteToken
        })
    }
}