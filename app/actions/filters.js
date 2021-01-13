let antiBounce = false;

module.exports = {
    lastRecognizedGesture: '',
    phoneIsDown : (data) => {
        data['/rotation_vector/r2'] > -0.2 && data['/rotation_vector/r2'] < 0.1;
    },
    phoneIsUp : (data) => {
        data['/rotation_vector/r2'] > 0.4 && data['/rotation_vector/r2'] < 0.8;
    },
    toggleBounce: (value) => {
        console.log('toogle bounce', antiBounce)
        antiBounce = value || !antiBounce;
        console.log('toogle bounce', antiBounce)
    },
    bounce: () => {
        return antiBounce;
    },

}