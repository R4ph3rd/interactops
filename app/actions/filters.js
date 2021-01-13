let antiBounce = false;

module.exports = {
    lastRecognizedGesture: undefined,
    phoneIsDown : (data) => {
        data['/rotation_vector/r2'] > -0.2 && data['/rotation_vector/r2'] < 0.1;
    },
    phoneIsUp : (data) => {
        data['/rotation_vector/r2'] > 0.4 && data['/rotation_vector/r2'] < 0.8;
    },
    toggleBounce: (value) => {
        antiBounce = value || !antiBounce;
    },
    bounce: () => {
        return antiBounce;
    },

}