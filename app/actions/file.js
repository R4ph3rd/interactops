const { clipboard, keyboard, Key } = require("@nut-tree/nut-js");
const networkActions = require('../websocket/actions')

module.exports = {
    copySend: async () => {
        await keyboard.pressKey(Key.RightControl)
        await keyboard.pressKey(Key.C)
        await keyboard.releaseKey(Key.C)
        await keyboard.releaseKey(Key.RightControl)

        console.log('copied to clipboard : ', await clipboard.paste());

        networkActions.send(await clipboard.paste());
    },
    download: async (data) => {
        if (typeof data == 'string'){
            await clipboard.copy(data);
        }
        else if (typeof data == 'ReadableStream'){
            console.log('stream', data)
        }
        else {
            console.log('unknow', data)
        }
    }

}