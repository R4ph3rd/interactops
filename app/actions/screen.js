const { screen } = require("@nut-tree/nut-js");
const socketSendings = require('../websocket/sendings');

module.exports = {
    sendScreen: async ({to}) => {
        await screen.capture(`${__dirname}/../store/assets/screenshot.png`);
        console.log('-- Screenshot taken --'.green)

        fs.readFile(__dirname + '/../screenshot.png', function(err, buffer){
            socketSendings.updateScreencast({to, buffer });
            console.log('image file is initialized', buffer);
        });
    }
}