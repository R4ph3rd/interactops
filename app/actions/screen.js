const fs = require('fs');
const open = require('open');
const screenshot = require('screenshot-desktop')
const socketSendings = require('../websocket/sendings');

module.exports = {
    sendScreen: async ({to}) => {
        screenshot().then((buffer) => {
            console.log('-- Image buffer initialized -- '.green);

            socketSendings.updateScreencast({to, image:true, buffer})
          }).catch((err) => {
            console.error(err)
          })
    },
    openCast: async () => {
        await open('http://localhost:3000/cast.html', {wait:true});
    }
}