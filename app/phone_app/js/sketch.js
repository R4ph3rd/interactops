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
    /* background(220, 50);
    fill('magenta'); //it can be any color
    ellipse(width / 2, height / 2, accelerationZ); */

    if  (acc){
      acc.innerHTML = `<strong>X: </strong> ${accelerationX} </br> <strong>Y:</strong>${accelerationY} </br> <strong>Z: </strong> ${accelerationZ}`
    }
    if (rot){
      rot.innerHTML = `<strong>X: </strong> ${rotationX} </br> <strong>Y: </strong>${rotationY} </br> <strong>Z: </strong> ${rotationZ}`
    }

    if(!document.URL.includes('dashboard')){
      if (!document.URL.includes('control')){
        socket.emit('sensors-data', {
          acceleration : [accelerationX, accelerationY, accelerationZ],
          rotation: [rotationX, rotationY, rotationZ]
        })
      } else {
        if (mouseIsPressed){
          socket.emit('sensors-data', {
            acceleration : [accelerationX, accelerationY, accelerationZ],
            rotation: [rotationX, rotationY, rotationZ]
          })

          fill(0,0,130, 30)
          rect(0,0, width, height)
        } else {
          clear()
        }
      }
    }
}

/* Acceleration and rotation test
gets a TypeError in the p5 Editor because
it can't read a property toString of null:
line 12 to 15 [at the very least]

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
	
	text("accelerationX: " + nf(accelerationX, 0, 2), 50, 130);
	text("accelerationY: " + nf(accelerationY, 0, 2), 50, 150);
	text("accelerationZ: " + nf(accelerationZ, 0, 2), 50, 170);
	
	text("rotationX: " + nf(rotationX, 0, 2), 250, 130);
	text("rotationY: " + nf(rotationY, 0, 2), 250, 150);
	text("rotationZ: " + nf(rotationZ, 0, 2), 250, 170);
  
  // true/false used in && conditional with the statement below
  // before installing devicemotion event listener
  text("!window._isNodeWebkit: " + !window._isNodeWebkit, 50, 230);
  
  // will be undefined if not available
  text("window.DeviceMotionEvent: " + window.DeviceMotionEvent, 50, 250, 300);
}
*/