var ship;


function setup(){
  createCanvas(500,500);
  ship = new Ship();


}
function draw(){
  background(0);
  ship.render();
  ship.update();


}
