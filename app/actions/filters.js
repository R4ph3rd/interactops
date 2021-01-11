module.exports = {
    phoneIsDown : (data) => {
        data['/rotation_vector/r2'] > -0.2 && data['/rotation_vector/r2'] < 0.1;
    },
    phoneIsUp : (data) => {
        data['/rotation_vector/r2'] > 0.4 && data['/rotation_vector/r2'] < 0.8;
    },

}