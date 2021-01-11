function setup(){
    createCanvas(windowWidth, windowHeight);
}

function draw(){
    
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}

/* move the touchscreen of the device to register the acceleration changes ACC Z
this is the one of the accelerations that suits the most in here
*/
function draw() {
    background(220, 50);
    fill('magenta'); //it can be any color
    ellipse(width / 2, height / 2, accelerationZ);
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