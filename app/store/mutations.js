const store = require(".")

function generateToken() {
    let r = Math.random().toString(36);
    console.log("New token generated : ", r);

    return r;
}

module.exports = {
    setMode: (mode) => {
        store.mode = mode;
    },
    setTokens: () => {
        store.tokens.collaborator = generateToken();
        store.tokens.viewer = generateToken();
        console.log('New personal tokens generated'.green)
    },
    clearRemote: () => {
        store.remote = {};
        console.log('Remote token cleared.'.green)
    },
    setRemote: ({remoteToken, remoteSocket}) => {
        store.remote.token = remoteToken; 
        store.remote.socket = remoteSocket; 
        console.log('Remote token is set : '.green, store.remote)
    }
}