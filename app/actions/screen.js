const fs = require('fs');
const open = require('open');
const screenshot = require('screenshot-desktop')

const {io} = require('../server')
const socketSendings = require('../websocket/sendings');
const store = require('../store');

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
    },
    getCast: async ({buffer} = {}) => {
      console.log('get cast !')
      if (!store.remoteCastIsOpen){
          await open('http://localhost:3000/remote.html', { wait:true});
          console.log('Openning browerser window to screencast');
          mutations.toggleCast();
      }

      if (buffer){
        io.emit('update-remote-screencast', {
            buffer,
            image: true
        })
    }
  }
}