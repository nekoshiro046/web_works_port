var particles = [];
var numParticles = 800; // パーティクルの数 ,数はウィンドウサイズに合わせて調節
var moPr;
var moCount = 0;
var hue1,hue2;

function setup(){
	// var canvas = createCanvas(windowWidth, windowHeight,P2D);
	// canvas.parent('sketch-holder');

	var canvas = createCanvas(windowWidth, windowHeight,P2D);
    canvas.position(0,0);
    canvas.style('z-index','-1');

	smooth();
  	initParticles();
}


function updata(){
	for(var a = 0; a < numParticles; a++){
  		if(moPr){
    		if(moCount < 0.9)moCount+=0.05;
    		particles[a].addMouse();
  		}
  		else{
  			particles[a].updata();
  			moCount = 0;
  		}
  	}
}

function draw(){
	updata();

	fill(255,255,255,20);
	noStroke();
	rect(0,0,windowWidth,windowHeight);

	// strokeWeight(5);
	moPr = mouseIsPressed;
	// strokeWeight();

  	beginShape(LINES);
  	for (var i = 0; i < numParticles; i++) {
    	// var fromP = particles.get(i);
    	var fromP = particles[i].position;
    	for (var j = i + 1; j < numParticles; j++) {
      		// var toP = particles.get(j);
      		var toP = particles[j].position;
      		var d = p5.Vector.dist(fromP, toP);

      		if (d < windowWidth / 25) {
        		stroke(particles[i].c);
				vertex(particles[i].position.x, particles[i].position.y);
				vertex(particles[j].position.x, particles[j].position.y);
      		}
    	}
  	}
  	endShape();

}
function windowResized() {
  // resizeCanvas(windowWidth, windowHeight,P2D);
  setup();
}

function initParticles() {
	hue1 = int(random(255));
	hue2 = int(random(255));
	// particles.clear();
	for (var i = 0; i < numParticles; i++) {
	  var posX = int(random(windowWidth/4,windowWidth/4*3));
	  // var posX = random(windowWidth/2,windowWidth);
	  var posY = int(random(windowHeight));
	  // var posY = 0;
	  //float posX = i;
	  // particles.add(createVector(posX, posY));
	  particles[i] = new Particle(posX, posY);
	}

}