const { clipboard, keyboard, Key } = require("@nut-tree/nut-js");
const socketSendings = require('../websocket/sendings');
const socket = require("../websocket/socket");
const notifier = require('node-notifier');

module.exports = {
    getData: async ({content, socketId}) => {
        await clipboard.copy(content);
        notifier.notify({
            title:'Interactops',
            subtitle: 'Data incoming',
			message:'Data received from socket' + socketId + ' copied in clipboard : ' + content
        });
        
        // console.log('Data incoming copied in clipboard : ', await clipboard.paste())
    },
    copySend: async () => {
        await keyboard.pressKey(Key.RightControl)
        await keyboard.pressKey(Key.C)
        await keyboard.releaseKey(Key.C)
        await keyboard.releaseKey(Key.RightControl)

        console.log('copied to clipboard : ', await clipboard.paste());

        socketSendings.send(await clipboard.paste());
    },
    requestDownload: () => {
        socketSendings.requestDownload();
    },
    download: async (data) => {
        console.log('download', data)
        if (typeof data == 'string'){
            // await clipboard.copy(data);
        }
        else if (typeof data == 'ReadableStream'){
            console.log('stream', data)
        }
        else {
            console.log('unknow', data)
        }
    }

}