const acc = document.getElementById('accel');
const rot = document.getElementById('rot');
const fps = 30;

let mode = true;
let feedbackAction = undefined;
let clearFeedbackAction;
let altClutch = true;
let localScreencastBounce = false;
// const dahsboard = document.querySelector('')

function setup(){
    if (document.URL.includes('dashboard')){
      console.log('dashboard !')
      let control = document.getElementById('control');
      let cnv = createCanvas(control.getBoundingClientRect().width, control.getBoundingClientRect().height);
      cnv.parent(control)
    } else {
      createCanvas(windowWidth, windowHeight);
    }

    frameRate(fps);
    textAlign(CENTER)

    // setShakeThreshold(50);
}

function draw() {
    if  (acc){
      acc.innerHTML = `<strong>X: </strong> ${accelerationX} </br> <strong>Y:</strong>${accelerationY} </br> <strong>Z: </strong> ${accelerationZ}`
    }
    if (rot){
      rot.innerHTML = `<strong>X: </strong> ${rotationX} </br> <strong>Y: </strong>${rotationY} </br> <strong>Z: </strong> ${rotationZ}`
    }

    if ((!mode && document.URL.includes('dashboard')) || !document.URL.includes('dashboard')){
      if (touches.length == 1){
        socket.emit('sensors-data', {
          acceleration : [accelerationX, accelerationY, accelerationZ],
          rotation: [rotationX, rotationY, rotationZ]
        })
  
        fill(0, 30)
        rect(0,0, width, height)
  
        if (!altClutch){
          altClutch = !altClutch;
        }
  
      } else if (touches.length == 2){
        if (altClutch){
          socket.emit('alt-tab')
          altClutch = !altClutch;
        }
      } else if (touches.length == 3){
        if (!localScreencastBounce){
          socket.emit('screencast-companion-request');
          localScreencastBounce = !localScreencastBounce;
        }
      } else {
        if (localScreencastBounce){
          localScreencastBounce = !localScreencastBounce;
        }
        clear()
      }
    }
    

    if (feedbackAction){
      background(12,205,0);
      fill(255);
      textSize(width / (feedbackAction.length/2))
      text(feedbackAction, width/2, height/2); 
    }

    if (!mode){
      push()
        noFill();
        stroke(255,2555,0);
        strokeWeight(20);
        rect(0,0, width, height);
      pop()
    }
}

// function mouseReleased(){
//   socket.emit('end-sending-data');
// }

// function mousePressed(){
//   socket.emit('start-sending-data');
// }

function touchStarted(){

  if (touches[0].x > windowWidth * .9 && touches[0].y < windowHeight * .1){
    window.location.href = '/companion'
  }
  if (!document.URL.includes('dashboard')){
    socket.emit('start-sending-data');
    return false;
  }

}

function touchEnded(){
  if (!document.URL.includes('dashboard')){
    socket.emit('end-sending-data');

    return false;
  }
}

// TODO : check if it is ok
// function deviceShaken() {
//   if (touches.length == 1 ){
//     socket.emit('change-control-mode')
//   }
// }

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