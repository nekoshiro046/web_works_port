var particles = [];
var numParticles = 1500; // パーティクルの数 ,数はウィンドウサイズに合わせて調節
var moPr;
var moCount = 0;
var hue1,hue2;

function setup(){
	var canvas = createCanvas(windowWidth, windowHeight,P2D);
	canvas.parent('sketch-holder');
	smooth();
  initParticles();
}


function draw(){
	fill(255,255,255,20);
	noStroke();
	rect(0,0,windowWidth,windowHeight);
	
	// strokeWeight();
  	for(var a = 0; a < numParticles; a++){
  		particles[a].updata();
  	}
  	moPr = mouseIsPressed;
  	if(moPr){
    	if(moCount < 0.9)moCount+=0.01;
  	}
  	if(!moPr)moCount = 0;

  	beginShape(LINES);
  	for (var i = 0; i < numParticles; i++) {
    	// var fromP = particles.get(i);
    	var fromP = particles[i].position;
    	for (var j = i + 1; j < numParticles; j++) {
      		// var toP = particles.get(j);
      		var toP = particles[j].position;
      		var d = p5.Vector.dist(fromP, toP);

      		if (d < 30) {
        		stroke(particles[i].c);
        		//line(fromP.position.x,fromP.position.y,toP.position.x,toP.position.y);
        		// fromP.addVertex();
        		// toP.addVertex();
						// particles[i].addVertex();
						// particles[i].addVertex();
						vertex(particles[i].position.x, particles[i].position.y);
						vertex(particles[j].position.x, particles[j].position.y);
      		}
    	}
  	}
  	endShape();

}

function initParticles() {
	hue1 = int(random(255));
	hue2 = int(random(255));
	// particles.clear();
	for (var i = 0; i < numParticles; i++) {
	  var posX = int(random(windowWidth/4,windowWidth/4*3));
	  var posY = int(random(windowHeight));
	  //float posX = i;
	  // particles.add(createVector(posX, posY));
	  particles[i] = new Particle(posX, posY);
	}

}

class Particle {

    constructor(x, y) {
	    this.position = createVector(x, y);
	    this.velocity = createVector(0, 0);
	    this.acceleration = createVector(0, 0);
	    this.gravity = createVector(0, random(0.05, 0.1));
	    // this.c = color(0);
	    var r = int(random(100));
	    if (r < 80) {
	      this.c = color(hue1, random(30, 50), random(30, 60), 5);
	    } else {
	      this.c = color(hue2, random(30, 50), random(30, 60), 5);
	    }
    }
  	updata() {
	    var f = createVector(mouseX,mouseY);
	    var force = p5.Vector.sub(f, this.position);
	    var dist = force.mag();
	    if (dist <= 20 && moPr) {
	      var pm = moCount;
	      force.normalize().mult(-1 * pm);
	      this.acceleration.add(force);
	    }
	    
	    this.acceleration.add(this.gravity);
	    this.velocity.add(this.acceleration);
	    this.position.add(this.velocity);
	    this.acceleration.mult(0);
	    this.velocity.mult(0.98);
	    
	    if(this.position.y > windowHeight){
	      var posX = random(windowWidth/4,windowWidth/4*3);
	      this.position = createVector(posX, 0);
	    }
    }

	addVertex() {
	  vertex(this.position.x, this.position.y);
	}
}