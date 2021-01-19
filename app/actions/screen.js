const fs         = require('fs');
const path       = require('path'); 
const open       = require('open');
const screenshot = require('screenshot-desktop')
const notifier   = require('node-notifier');

const {io}           = require('../server')
const socketSendings = require('../websocket/sendings');
const store          = require('../store');
const mutations      = require('../store/mutations')

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
      if (!store.remoteCastIsOpen && store.remote.token){
          open('http://localhost:3000/remote.html', { wait:true});
          console.log('Openning browerser window to screencast...'.green);

          notifier.notify({
            title:'Interactops',
            subtitle: 'Remote screencast incoming',
            message:'Screencast received from' + store.remote.token
        });
      }

      if (buffer){
        io.emit('update-remote-screencast', {
            buffer,
            image: true
        })
    }
  }
}