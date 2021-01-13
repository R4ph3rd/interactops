const fs = require('fs');
const DTW = require('dtw');
let model = require('./data/model.json');

const dtw = new DTW();
const threshold = 5;

let currentData = [];
let gesturesLength = 10000;

// var s = [1,1,2,3,2,0];
// var t = [0,5,7,8,3,2,1];
// var cost = dtw.compute(s, t);
// var path = dtw.path();
// console.log('Cost: ' + cost);
// console.log('Path: ');
// console.log(path);


const setDataFlow = (data, training) => {
    currentData.push(data);
    if (currentData.length > gesturesLength && !training){
        currentData.shift();
    }
}

const clearCurrentData = () => {
    currentData = [];
    gesturesLength = 1000;
}

module.exports = {
    clear: () => {
        clearCurrentData();
    },
    trainGesture : (data) => {
        setDataFlow(data, true);
    },
    registerExample: (gestureName) => {

        if (model.gestures[gestureName]){
            model.gestures[gestureName].push(currentData[0]);
        } else {
            model.gestures[gestureName] = currentData;
        }

        // console.log("model :! ", model)
        
        fs.writeFile(__dirname + '/data/model.json', JSON.stringify(model), function writeJSON(err) {
            if (err) return console.error(err);
            // console.log('model stringify : ', JSON.stringify(model));
            // console.log('Example N°' + model.gestures[gestureName].length + ' registered : ', gestureName, )
        });
        clearCurrentData();

    },
    compute: ({data}) => {
        setDataFlow(data);
        for (let gesture in model.gestures){
            const confidence = dtw.compute(model.gestures[gesture], currentData);
            
            if (confidence < threshold){
                console.log('gesture recognized !'.green, gesture)
            }

        }
    }
}