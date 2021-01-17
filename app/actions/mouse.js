const { mouse, right, down, left, up, Point} = require("@nut-tree/nut-js");
const store = require('../store')
const {bounce} = require('./filters');

const mapRange = (value, x1, y1, x2, y2) => {
    let val = (value - x1) * (y2 - x2) / (y1 - x1) + x2;
    val = val < x2 ? x2 : val > y2 ? y2 : val;

    return val;
}

const rangeX = [65, 17]; //left, right
const rangeZ = [165, 65]; // front , back
// let basePos = [0, 0];


module.exports = {
    control: async ({rot, pRot}) => {
        // rotY = height, rotZ = width when phone screen is large mode
        // if (bounce()){
        let x = mapRange(rot[2], rangeZ[0], rangeZ[1], 0, store.screenSize.x)
        let y = mapRange(rot[0], rangeX[0], rangeX[1], 0, store.screenSize.y)
        // console.log('X', rot[0], 'Y', rot[1], ' Z ', rot[2])

        let pos = new Point(x,y);
        await mouse.setPosition(pos).catch(err => console.log(err));
        // }
    },
    click: async () => {
        await mouse.setPosition(store.startingPos);
        await mouse.leftClick();
        console.log('Click !'.yellow)
    },
    setBasePos: ({rot}) => {
        basePos = [rot[0], rot[2]];
    }      
}

// move mouse according to movement quantity :

// const delta = rot.map((value, i) => value - pRot[i])

// // console.log('Delta :', delta)
// const deltaX = mapRange(delta[0], -0.1, 0.1, -10, 10);
// const deltaZ = mapRange(delta[2], -0.1, 0.1, -10, 10);

// /* if (deltaX < 0){
//     console.log('Move right')
//     await mouse.move(right(Math.abs(deltaX)));
// } else {
//     console.log('Move left')
//     await mouse.move(left(Math.abs(deltaX)));
// } */

// if (deltaZ < 0){
//     console.log('Move up')
//     mouse.move(up(Math.abs(deltaZ)));
// } else {
//     console.log('Move down')
//     mouse.move(down(Math.abs(deltaZ)));
// } 
