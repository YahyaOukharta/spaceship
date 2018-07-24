function Controller(){
  this.up=false;
  this.down=false;
  this.right=false;
  this.left=false;
  this.space=false;
}
function keyPressed(){

  if(keyCode==UP_ARROW){
    ship.controller.up=true;
  }

  if(keyCode==LEFT_ARROW){
    ship.controller.left=true;
  }

  if(keyCode==RIGHT_ARROW){
    ship.controller.right=true;
  }

  if(key==" "){
    ship.controller.space=true;
  }

}
function keyReleased(){

  if(keyCode==UP_ARROW){
    ship.controller.up=false;
  }

  if(keyCode==LEFT_ARROW){
    ship.controller.left=false;
  }

  if(keyCode==RIGHT_ARROW){
    ship.controller.right=false;
  }

  if(key==" "){
    ship.controller.space=false;
  }

}
