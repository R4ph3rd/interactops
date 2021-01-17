const { mouse } = require("@nut-tree/nut-js");
const store = require(".")
const {clearRemoteAccess} = require('../websocket/sendings')

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
        console.log('------- Toggle control mode ---------')
    },
    toggleCast: () => {
        store.remoteCastIsOpen = !store.remoteCastIsOpen;
    },
    setTokens: () => {
        store.tokens.collaborator = generateToken();
        store.tokens.viewer = generateToken();
        store.remote.requests = {};
        
        const userList = [... new Set(Object.keys(store.remote.requests))]
        console.log('User list to disconnect:'.green, userList);

        clearRemoteAccess({userList})
        module.exports.toggleCast()

        console.log('New personal tokens generated'.green)
        store.remote.archived.push(store.remote.requests);
    },
    clearRemote: () => {
        store.remote.token = null;
        store.remote.socket = null;
        
        console.log('Remote token cleared.'.green)
    },
    setRemote: ({remoteToken, remoteSocket, rights}) => {
        store.remote.token = remoteToken; 
        store.remote.socket = remoteSocket; 
        store.remote.rights = rights
        console.log('Remote token is set for '.green + rights + ' : '.green, store.remote)
    },
    registerRequest: ({action, token, socketId}) => {
        store.remote.requests[socketId] = {
            action,
            token
        }
    },
    setStartingPos: async () => {
        store.startingPos = await mouse.getPosition();
    }
}