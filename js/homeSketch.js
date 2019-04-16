// 'use strict';
// function setup() {
//     createCanvas(windowWidth, windowHeight,P2D);
//     // createCanvas(windowWidth, windowHeight,WEBGL);

// }
 
// function draw() {
//     ellipse(mouseX,mouseY, 50, 50);
// }

function setup() {
	createCanvas(windowWidth, windowHeight,P2D);
  //slow down the frameRate to make it more visible
  // var canvas = createCanvas(windowWidth/2, windowHeight,P2D);
  // canvas.parent('sketch-holder');
  frameRate(10);
}

function draw() {
  // background(244, 248, 252);
  background(255);
  
  line(mouseX, mouseY, pmouseX, pmouseY);
  print(pmouseX + ' -> ' + mouseX);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



// function mouseReleased() {
  
// }

// function keyPressed() {
// }
