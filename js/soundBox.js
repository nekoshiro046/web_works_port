var fr = 60;
let objNum = 50;
let boxes =  [];let firstBox;

var scene = 1;
var mouseCharge = 0;var oneFrame = 0;

var sampleSound = [];//サウンドファイル格納

let fontSize = 40;
let font;

var userMove = 0;

var soundNames = ["dog","cat","door","coffee","fish","watch","se","bump","asian","rabbit"];

var firstTouch = 0;
var firstSound;

function preload(){
	font = loadFont('assets/font/FreeSans.otf');
	soundFormats('mp3', 'ogg');

// 	for(var i = 0; i < 10; i++){
// 		sampleSound[i] = loadSound('./assets/se'+i+'.mp3');

	sampleSound[0] = loadSound('assets/sound/se0.mp3');
	sampleSound[1] = loadSound('assets/sound/se1.mp3');
	sampleSound[2] = loadSound('assets/sound/se2.mp3');
	sampleSound[3] = loadSound('assets/sound/se3.mp3');
	sampleSound[4] = loadSound('assets/sound/se4.mp3');
	sampleSound[5] = loadSound('assets/sound/se5.mp3');
	sampleSound[6] = loadSound('assets/sound/se6.mp3');
	sampleSound[7] = loadSound('assets/sound/se7.mp3');
	sampleSound[8] = loadSound('assets/sound/se8.mp3');
	sampleSound[9] = loadSound('assets/sound/se9.mp3');
	
// 	}
}


function setup() {
  // createCanvas(windowWidth, windowHeight,WEBGL);
  var canvas = createCanvas(windowWidth, windowHeight,WEBGL);
 
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  frameRate(fr);
  initBox();
  firstBox = new box(0,0,-20,100);
	//---------------font------------
  textFont(font);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
	
  rectMode(CENTER);
}

function initBox() {
	for(var i = 0; i < objNum; i++){
	    var posX = 0;var posY = 0;var posZ = 0;
	    var inch = random(5,50);
	    boxes[i] = new box(posX,posY,posZ,inch);
		
  	}

}

function draw() {
	// userAction();
	selectScene();
}

function touchStarted() {
  if(firstTouch == 0 && inCanvas()){
      // firstSound.start();
    sampleSound[0].play();
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
  resizeCanvas(windowWidth, windowHeight);
}


function selectScene(){
	if(scene == 1){
	    if(mouseIsPressed && inCanvas() && firstBox.inTerritory(mouseX,mouseY)){
	      scene = 2;
	    }else{
	      drawScene1();
	    }
	}
	else if(scene == 2){
	    if(mouseIsPressed && inCanvas()){
				oneFrame++;
		    for(var i = 0; i < objNum; i++){
		      if(boxes[i].inTerritory(mouseX,mouseY) && mouseCharge == 0 && (boxes[i].core.mag() > 0.5)){
						sampleSound[boxes[i].soundID].play();
						// drawText(boxes[i].core.x,boxes[i].core.y);
        		}
				if(oneFrame > 60){
							boxes[i].Head4Core();
	        	}else{
							boxes[i].updata();
	        	}
		    }
				if(oneFrame > fr*0.8)mouseCharge++;
		    if(mouseCharge > fr*2){
		      scene = 1;
		      drawScene1();
		      initBox();
		    }
		    else if(mouseCharge != 0 && oneFrame > fr){
		      drawScene2();
		      var sx = map(mouseCharge,0,fr*2,0,windowWidth/2);
		      var sy = map(mouseCharge,0,fr*2,0,windowHeight/2);
		      noFill();
		      stroke(0);
		      rect(0,0,windowWidth-sx*2,windowHeight-sy*2);
		    }
		    else{
		      drawScene2();
		    }
	    }
	    else{
	      for(var i = 0; i < objNum; i++){
	        boxes[i].updata();
	      }
	      drawScene2();
	      mouseCharge = 0;oneFrame = 0;
	    }
	}
}

function drawScene1(){
	background(0);
  var a = int(random(1,7));//5択
  if(a == 1 || a == 4){
    if(firstBox.inTerritory(mouseX,mouseY)){
      stroke(255,0,0);
      firstBox.drawTetrahedron();
    }
    stroke(255);
    firstBox.drawBox();
    drawText(firstBox.core.x,firstBox.core.y - windowHeight/4,'click box or keep clciking',windowHeight/20,255);
  }
  else if(a == 2 || a == 5){
  	drawText(firstBox.core.x,firstBox.core.y - windowHeight/4,'click box or keep clciking',windowHeight/20,255);
  	push();
    translate(-0.5,1,-1.5);
    stroke(255,0,0);
    firstBox.drawBox();
    pop();
    push();
    translate(1.0,-2.5,0);
    stroke(0,255,0);
    firstBox.drawBox();
    pop();
    push();
    translate(-1.8,2.5,1.9);
    stroke(0,0,255);
    firstBox.drawBox();
    pop();
  }
  else if(a == 3){
  	drawText(firstBox.core.x,firstBox.core.y - windowHeight/4,'click box or keep clciking',windowHeight/20,255);
    stroke(255);
    var r = random(1,4);
    for(var i = 0; i < r; i++){
      var randiv = random(4,20);
      beginShape(LINES);
      vertex(random(-windowWidth/randiv,windowWidth/randiv),random(-windowHeight/randiv,windowHeight/randiv),random(-10,10));
      vertex(random(-windowWidth/randiv,windowWidth/randiv),random(-windowHeight/randiv,windowHeight/randiv),random(-10,10));
      endShape();
    }
	}
}

function drawScene2(){
  background(255);
  for(var j = 0; j < objNum; j++){
    if(boxes[j].inTerritory(mouseX,mouseY)){
      stroke(boxes[j].baseColor);
      boxes[j].drawTetrahedron();
	  drawText(boxes[j].core.x,boxes[j].core.y,soundNames[boxes[j].soundID],boxes[j].inch,0);
    }else{
      stroke(0);
    }
    boxes[j].drawBox(); 
  }
}

function drawText(x,y,str,strSiz,col){
	push();  
	translate(x,y);
	fill(col);
	textSize(strSiz);
	text(str, 0,0);
	pop();
}

function inCanvas(){
	var back;
	if(mouseX < 0 || mouseX > windowWidth || mouseY < 0 || mouseY > windowHeight){
		back = false;
	}else{
		back = true;
	}
	return back;
}


// function mouseReleased() {
  
// }

// function keyPressed() {
// }

//-----------------------------------box_class-----------------------------
class box{

	constructor(x,y,z,inc){
		this.core =	createVector(x,y,z);
		this.inch = inc;
		this.territory = this.inch;
		this.bVertex  = [];
	    this.velocity = createVector(random(1,5), random(1,5));
	    this.acceleration = createVector(random(0.01,0.05), random(0.01,0.05));
	    this.firstAc = createVector(random(-10,10),random(-10,10),0);
		this.head4Speed = random(0.1,0.8);
	    this.soundID = int(random(10));
	    this.angleX = random(360);this.angleY = random(360);this.angleZ = random(360);
	    this.angleStep = 0.5;
	    this.baseColor = color(random(255),random(255),random(255));
	    this.shapeBox();
	}

	shapeBox(){
	    var pointx1 = this.core.x -this.inch;
	    var pointx2 = this.core.x +this.inch;
	    var pointy1 = this.core.y -this.inch;
	    var pointy2 = this.core.y +this.inch;
	    var pointz1 = this.core.z -this.inch;
	    var pointz2 = this.core.z +this.inch;

	    for(let i = 0; i <= 7; i++){
	      switch(i){
	        case 0:
	           this.bVertex[i]  = createVector(pointx1,pointy1,pointz1);
	           break;
	        case 1:
	           this.bVertex[i]  = createVector(pointx1,pointy1,pointz2);
	           break;   
	        case 2:
	           this.bVertex[i]  = createVector(pointx1,pointy2,pointz2);
	           break;
	        case 3:
	           this.bVertex[i]  = createVector(pointx1,pointy2,pointz1);
	           break; 
	        case 4:
	           this.bVertex[i]  = createVector(pointx2,pointy2,pointz1);
	           break;
	        case 5:
	           this.bVertex[i]  = createVector(pointx2,pointy2,pointz2);
	           break; 
	        case 6:
	           this.bVertex[i]  = createVector(pointx2,pointy1,pointz2);
	           break; 
	        case 7:
	           this.bVertex[i]  = createVector(pointx2,pointy1,pointz1);
	           break;   
	      }
	    }
    
  	}

  	updata(){
	    this.acceleration.add(this.firstAc);
	    this.firstAc.div(4);
	    this.velocity.add(this.acceleration);
	    this.core.add(this.velocity);
	    this.acceleration.mult(0);
	    this.velocity.mult(0.98);
  	}

  	Head4Core(){
	    // var moCh = map(this.head4Speed,0,this.head4Speed,0.1,1.0);
	    var f = createVector(0,0,0);
	    var force = p5.Vector.sub(f, this.core);
	    force.normalize().mult(this.head4Speed);
	    this.acceleration.add(force);
	    this.updata();
	}

	drawBox(){
		push();
		translate(this.core.x,this.core.y);
	    rotateX(radians(this.angleX));this.angleX+= this.angleStep;if(this.angleX > 360)this.angleX=0;
	    rotateY(radians(this.angleY));this.angleY+= this.angleStep;if(this.angleY > 360)this.angleY=0;
	    rotateZ(radians(this.angleZ));this.angleZ+= this.angleStep;if(this.angleZ > 360)this.angleZ=0;
	    noFill();
	    beginShape(); 
	    for(let i = 0; i< 7; i++){
	      vertex(this.bVertex[i].x,this.bVertex[i].y,this.bVertex[i].z);
	      vertex(this.bVertex[i+1].x,this.bVertex[i+1].y,this.bVertex[i+1].z);
	    }
	    endShape(CLOSE); 
	    beginShape(LINES);
	    for(let i = 0; i<6 ; i++){
	      if(i == 1){
	        vertex(this.bVertex[1].x,this.bVertex[1].y,this.bVertex[1].z);
	        vertex(this.bVertex[6].x,this.bVertex[6].y,this.bVertex[6].z);
	        endShape(); 
	      }
	      if(i % 2 == 0 || i == 0){
	        vertex(this.bVertex[i].x,this.bVertex[i].y,this.bVertex[i].z);
	        vertex(this.bVertex[i+3].x,this.bVertex[i+3].y,this.bVertex[i+3].z);
	        endShape(); 
	      }
	    }  
	    pop();
	}

	drawTetrahedron(){
	    push();  
	    translate(this.core.x,this.core.y);
	    rotateX(radians(this.angleX));
	    rotateY(radians(this.angleY));
	    rotateZ(radians(this.angleZ));
	    noFill();
	    
	    beginShape(); 
	    for(var i = 0; i < 5; i+=2){
	      vertex(this.bVertex[i].x,this.bVertex[i].y,this.bVertex[i].z);
	      vertex(this.bVertex[i+2].x,this.bVertex[i+2].y,this.bVertex[i+2].z);
	    }
	    endShape(CLOSE);
	    beginShape(LINES); 
	    vertex(this.bVertex[0].x,this.bVertex[0].y,this.bVertex[0].z);
	    vertex(this.bVertex[4].x,this.bVertex[4].y,this.bVertex[4].z);
	    endShape();
	    beginShape(LINES); 
	    vertex(this.bVertex[2].x,this.bVertex[2].y,this.bVertex[2].z);
	    vertex(this.bVertex[6].x,this.bVertex[6].y,this.bVertex[6].z);
	    endShape();
	    pop();
  	}

	inTerritory(mx,my){
	    var back;
	    var f = createVector(mx-windowWidth/2,my-windowHeight/2);
	    var dbox = p5.Vector.sub(f, this.core);
	    var dist_box = dbox.mag();
	    if(dist_box < this.territory){
	      back = true;
	    }else{
	      back = false;
	    }
	    return back;
	}
}