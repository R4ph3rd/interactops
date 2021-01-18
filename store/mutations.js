const store = require('./index');

module.exports = {
    clearArchives: () => {
        setInterval(() => {
            store.archived = []
        }, store.archivesClearInterval);
    },
    clearTemp: (timeout) => {
        setTimeout( () => {
            store.temp = {};
        }, timeout || store.tempDelay);
    },
    clearTempAccess: (timeout, rights) => {
        setTimeout( () => {

            if (rights && !store.tempAccess[rights].waitingForSharing){
                store.tempAccess[rights] = {};
            } else {
                if (!store.tempAccess.collaborator.waitingForSharing && !store.tempAccess.viewer.waitingForSharing){
                    store.tempAccess = {
                        viewer: {},
                        collaborator: {}
                    }
                }
            }

        }, timeout || store.tempDelay);
    },
    toggleWaiting: (rights) => {
        if (rights){
            store.tempAccess[rights].waitingForSharing = !store.tempAccess[rights].waitingForSharing;
        }
    }
}