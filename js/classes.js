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

