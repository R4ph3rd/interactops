const acc = document.getElementById('accel');
const rot = document.getElementById('rot');
const fps = 30;

// const dahsboard = document.querySelector('')

function setup(){
    createCanvas(windowWidth, windowHeight);
    frameRate(fps);
}

/* move the touchscreen of the device to register the acceleration changes ACC Z
this is the one of the accelerations that suits the most in here
*/
function draw() {
    acc.innerHTML = `<strong>X: </strong> ${accelerationX} </br> <strong>Y:</strong>${accelerationY} </br> <strong>Z: </strong> ${accelerationZ}`
    rot.innerHTML = `<strong>X: </strong> ${rotationX} </br> <strong>Y: </strong>${rotationY} </br> <strong>Z: </strong> ${rotationZ}`

    if (mouseIsPressed){
        socket.emit('sensors-data', {
          acceleration : [accelerationX, accelerationY, accelerationZ],
          rotation: [rotationX, rotationY, rotationZ]
        })

        fill(130,0,0, 30)
        rect(0,0, width, height)

    } else {
        clear()
    }
}

function mouseReleased(){
    socket.emit('end-sending-data');
}

function mousePressed(){
    socket.emit('start-sending-data');
}
