const fs = require('fs');
const open = require('open');
const { screen } = require("@nut-tree/nut-js");
const socketSendings = require('../websocket/sendings');

module.exports = {
    sendScreen: async ({to}) => {
        await screen.capture(`${__dirname}/../store/assets/screenshot.png`);
        console.log('-- Screenshot taken --'.green)

        fs.readFile(__dirname + '/../screenshot.png', function(err, buffer){
            socketSendings.updateScreencast({to, buffer });
            console.log('-- Image file is initialized -- '.green);
        });
    },
    openCast: async () => {
        await open('http://localhost:3000/cast.html', {wait:true});
    }
}