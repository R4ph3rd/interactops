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

            if (rights){
                store.tempAccess[rights] = {};
            } else {
                store.tempAccess = {
                    viewer: {},
                    collaborator: {}
                }
            }

        }, timeout || store.tempDelay);
    }
}