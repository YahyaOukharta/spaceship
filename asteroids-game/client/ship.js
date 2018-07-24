function Ship(){
  this.controller = new Controller(); /// controller object

  this.r = 30; //radius
  this.color=color(0);

  this.pos = createVector(width/2,height/2); ///position and
  this.vel = createVector(0,0);              ///speed vectors
  this.dir = PI;                            //direction the ship is facing

  this.render = function(){   //render function

      push();
        translate(this.pos.x,this.pos.y);
        rotate(this.dir);

        stroke(255);
        fill(this.color);

        triangle(0,this.r , this.r/2,0 ,-this.r/2,0);
      pop();

  }

  this.update=function(){
      this.pos.add(this.vel);//adding velocity vector to the position vector
      this.vel.mult(0.6);

      this.turn();
      this.accelerate();

      this.edges();
  }

  this.accelerate=function(){ //function responsible for the acceleration of the ship
      if(this.controller.up){
          var force = p5.Vector.fromAngle(this.dir+PI/2);
          force.mult(1.8);
          this.vel.add(force);
      }
  }

  this.turn=function(){  //function responsible for the rotation of the ship
    var turnspeed=0.1;
    if(this.controller.right){
        this.dir+=turnspeed;
    }
    else if(this.controller.left){
      this.dir+=-turnspeed
    }
  }

  this.edges=function(){ /// wrap around edges
      if(this.pos.x > width + this.r){
        this.pos.x = -this.r;
      }
      if(this.pos.y > height + this.r){
        this.pos.y = -this.r;
      }
      if(this.pos.x<-this.r){
        this.pos.x=width+this.r;
      }
      if(this.pos.y<-this.r){
        this.pos.y=height+this.r;
      }
  }

}
