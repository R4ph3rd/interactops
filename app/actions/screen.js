const { screen } = require("@nut-tree/nut-js");
const socketSendings = require('../websocket/sendings');

module.exports = {
    sendScreen: () => {
        await screen.capture(`${__dirname}/../store/assets/screenshot.png`);
        console.log('-- Screenshot taken --'.green)

        fs.readFile(__dirname + '/../screenshot.png', function(err, buf){
            socketSendings.updateScreencast({buffer: buf });
            console.log('image file is initialized', buf);
        });
    }
}