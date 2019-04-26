var fr = 60;
let objNum;
let boxes =  [];let firstBox;

var scene;
var mouseCharge ;var oneFrame;

var sampleSound = [];//サウンドファイル格納

let fontSize = 40;
let font;

var userMove;

var soundNames = ["dog","cat","door","coffee","fish","watch","se","bump","asian","rabbit"];

function preload(){
	font = loadFont('assets/FreeSans.otf');
	soundFormats('mp3', 'ogg');

// 	for(var i = 0; i < 10; i++){
// 		sampleSound[i] = loadSound('./assets/se'+i+'.mp3');

	sampleSound[0] = loadSound('assets/se0.mp3');
	sampleSound[1] = loadSound('assets/se1.mp3');
	sampleSound[2] = loadSound('assets/se2.mp3');
	sampleSound[3] = loadSound('assets/se3.mp3');
	sampleSound[4] = loadSound('assets/se4.mp3');
	sampleSound[5] = loadSound('assets/se5.mp3');
	sampleSound[6] = loadSound('assets/se6.mp3');
	sampleSound[7] = loadSound('assets/se7.mp3');
	sampleSound[8] = loadSound('assets/se8.mp3');
	sampleSound[9] = loadSound('assets/se9.mp3');
	
// 	}
}


function setup() {
	objNum = 50;scene = 1;mouseCharge = 0;oneFrame = 0;userMove = 0;


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
		      if(boxes[i].inTerritory(mouseX,mouseY) && mouseCharge == 0){
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

//-----------------------------------Web Audio 関係--------------------------------------
function playOsci() {
	audioctx = new AudioContext();      // AudioContext を作成
    osc = new OscillatorNode(audioctx); // オシレータを作成
    osc.connect(audioctx.destination);  // オシレータを出力に接続
    osc.start();                        // オシレータ動作開始
}