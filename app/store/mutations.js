const store = require(".")

function generateToken() {
    let r = Math.random().toString(36);
    console.log("New token generated : ".green, r);

    return r;
}

module.exports = {
    setMode: (mode) => {
        store.mode = mode;
    },
    setScreenSize: async ({x, y}) => {
        store.screenSize = {x: x, y: y};
        console.log('\nScreen size : '.green, store.screenSize.x, store.screenSize.y);
    },
    toggleControlMode: () => {
        store.controlMode = !store.controlMode
    },
    toggleCast: () => {
        store.remoteCastIsOpen = !store.remoteCastIsOpen;
    },
    setTokens: () => {
        store.tokens.collaborator = generateToken();
        store.tokens.viewer = generateToken();
        store.remote.requests = {};
        store.remote.archived.push(store.remote.requests);
        console.log('New personal tokens generated'.green)
    },
    clearRemote: () => {
        store.remote.token = null;
        store.remote.socket = null;
        
        console.log('Remote token cleared.'.green)
    },
    setRemote: ({remoteToken, remoteSocket}) => {
        store.remote.token = remoteToken; 
        store.remote.socket = remoteSocket; 
        console.log('Remote token is set : '.green, store.remote)
    },
    registerRequest: ({action, token, socketId}) => {
        store.remote.requests[socketId] = {
            action,
            token
        }
    }
}