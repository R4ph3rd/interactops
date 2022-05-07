let antiBounce = false;

module.exports = {
    lastRecognizedGesture: undefined,
    clicks: 0,
    toggleBounce: (value) => {
        antiBounce = value || !antiBounce;

        if (antiBounce){
            module.exports.clicks ++ ;
        }
        // console.log('toogle bounce', antiBounce)
    },
    bounce: () => {
        return antiBounce;
    },
    resetClicks: () => {
        module.exports.clicks = 0;
    }
}