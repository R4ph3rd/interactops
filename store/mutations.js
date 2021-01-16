const store = require('./index');

module.exports = {
    clearArchives: () => {
        setInterval(() => {
            store.archived = []
        }, store.archivesClearInterval);
    },
    clearTemp: (timeout) => {
        setTimeout( () => {
            store.rooms.temp = {};
        }, timeout || store.tempDelay);
    }
}