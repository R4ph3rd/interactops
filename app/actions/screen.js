const { screen } = require("@nut-tree/nut-js");

module.exports = {
    sendScreen: () => {
        const screenshot = await screen.capture();
        console.log('screenshot : ')
        console.log(screenshot)
    }
}