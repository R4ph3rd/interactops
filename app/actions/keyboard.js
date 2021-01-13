const { keyboard, Key } = require("@nut-tree/nut-js")

module.exports = {
    right: async() => {
        // console.log('------------------------- swipe right! -------------------------');
        await keyboard.type(Key.Right);
    },
    left: async() => {
        // console.log('------------------------- swipe left! -------------------------');
        await keyboard.type(Key.Left);
    },
    up: async() => {
        // console.log('------------------------- swipe up! -------------------------');
        await keyboard.type(Key.Up);
    },
    down: async() => {
        // console.log('------------------------- swipe down! -------------------------');
        await keyboard.type(Key.Down);
    },
    altTab: async() => {
        await keyboard.pressKey(Key.LeftAlt);
        await keyboard.type(Key.Tab);
    },
    closeAltTab: async() => {
        await keyboard.releaseKey(Key.LeftAlt);
    },
}