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