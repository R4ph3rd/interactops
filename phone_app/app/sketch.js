function setup(){
    createCanvas(windowWidth, windowHeight);

    background(0);
}

function draw(){
    fill(255, 0, 0);
    rect(mouseX, mouseY, 50, 50);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}