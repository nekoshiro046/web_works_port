var particles = [];
var numParticles = 800; // パーティクルの数 ,数はウィンドウサイズに合わせて調節
var moPr;
var moCount = 0;
var hue1,hue2;

var osc,osc2,osc3,osc4;
var selTim;
var firstTouch = 0;
var firstSound;


function setup(){
	// var canvas = createCanvas(windowWidth, windowHeight,P2D);
	// canvas.parent('sketch-holder');

	var canvas = createCanvas(windowWidth, windowHeight,P2D);
  canvas.position(0,0);
  canvas.style('z-index','-1');

  background(0);

	smooth();
  initParticles();

  soundSetup();
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
	moPr = mouseIsPressed;

	updata();
	soundUpdata();

	fill(255,255,255,20);
	noStroke();
	rect(0,0,windowWidth,windowHeight);


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

function touchStarted() {
  if(firstTouch == 0){
      // firstSound.start();
    firstSound = new p5.Oscillator();
    firstSound.setType('sine');
    firstSound.freq(0);
    firstSound.amp(0);
    firstSound.start();
    firstTouch = 1;
  }
  // else if(firstTouch == 1){
  //   firstSound.stop();
  //   firstTouch = 2;
  // } 
  else{

  } 
}


function windowResized() {
  // resizeCanvas(windowWidth, windowHeight,P2D);
  setup();
}

function soundSetup(){
	osc = new oscil('sine',1760);
  osc.setDelay(0.02,0.4,10000);
  	// osc.setEnv(0.2,0.4,10000);

  	// osc2 = new oscil('sine',2040 + int(random(-5,5)));
  osc2 = new oscil('sine',1174.659);
  osc2.setDelay(0.02,0.4,10000);
  osc3 = new oscil('sine',1318.510);
  osc3.setDelay(0.02,0.4,10000);

  selTim = new selectTimbre();
  selTim.addTimbre(osc);selTim.addTimbre(osc2);selTim.addTimbre(osc3);
}

function soundUpdata(){
	if(moPr && inCanvas()){
		if(!selTim.playing){
			selTim.playNow = int(random(3));
			selTim.timbres[selTim.playNow].playOscil();
			selTim.playing = true;
		}
	}
	else{
		selTim.timbres[selTim.playNow].stopOscil();
		selTim.playing = false;
	}
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

function inCanvas(){
  var back;
  if(mouseX < windowWidth/4 || mouseX > windowWidth/4*3 || mouseY < 0 || mouseY > windowHeight){
    back = false;
  }else{
    back = true;
  }
  return back;
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

    addMouse(){
    	var f = createVector(mouseX,mouseY);
	    var force = p5.Vector.sub(f, this.position);
	    var dist = force.mag();
	    if (dist <= 20) {
	      var pm = moCount;
	      force.normalize().mult(-0.5 * pm);
	      this.acceleration.add(force);
	    }
    	this.updata();
    }

  	updata() {
	    this.acceleration.add(this.gravity);
	    this.velocity.add(this.acceleration);
	    this.position.add(this.velocity);
	    this.acceleration.mult(0);
	    this.velocity.mult(0.98);
	    
	    if(this.position.y > windowHeight){
	      var posX = random(windowWidth/4,windowWidth/4*3);
	      	// var posX = random(windowWidth/2,windowWidth);
	      this.position = createVector(posX, 0);
	    }
    }

	addVertex() {
	  vertex(this.position.x, this.position.y);
	}
}

//----------------------sounds------------------------
class selectTimbre{
	constructor(){
		this.timbres = [];
		this.timNum = 0;
		this.playing = false;
		this.playNow = 0;
	}

	addTimbre(oscil){
		this.timbres[this.timNum] = oscil;
		this.timNum++;
	}
}

class oscil{
  constructor(wf,fr){
    this.osc = new p5.Oscillator();
    this.osc.setType(wf);
    this.osc.freq(fr);
    this.osc.amp(0);
    this.osc.pan(0,0);
    this.osc.start();

    this.bassOsc = new p5.Oscillator();
    this.bassOsc.setType(wf);
    this.bassOsc.freq(fr/8);
    this.bassOsc.amp(0);
    this.bassOsc.pan(0,0);
    this.bassOsc.start();

    this.beatOsc = new p5.Oscillator();
    this.beatOsc.setType(wf);
    this.beatOsc.freq(fr-5);
    this.beatOsc.amp(0);
    this.beatOsc.pan(0,0);
    this.beatOsc.start();

    this.bbeatOsc = new p5.Oscillator();
    this.bbeatOsc.setType(wf);
    this.bbeatOsc.freq((fr/8) -int(random(1,5)));
    this.bbeatOsc.amp(0);
    this.bbeatOsc.pan(0,0);
    this.bbeatOsc.start();


    // this.env = new p5.Envelope();
    this.delay  = new p5.Delay();

    this.waveform = wf;
    this.frequency = fr;

    this.playing = false;
  }

  setDelay(dt,fb,ff){
    this.delay.process(this.osc, dt, fb, ff);//.process(source, delayTime, feedback, filter frequency);
    
  }

  // setEnv(at,dt,sp,rt){
  //   this.env.setADSR(at, dt, sp, rt);
  //   this.env.play(this.osc);
  // }

  playOscil(){
    this.osc.amp(0.3, 0.05);
    this.bassOsc.amp(0.3, 0.05);
    
    this.delay.amp(0.2, 0.1);

    this.beatOsc.amp(0.3, 0.05);
    this.bbeatOsc.amp(0.3, 0.05);
  }

  stopOscil(){
  	this.osc.amp(0, 2.0);
  	this.bassOsc.amp(0, 1.0);

  	this.delay.amp(0, 0.5);

  	this.beatOsc.amp(0, 2);
  	this.bbeatOsc.amp(0, 1.5);
  }
}