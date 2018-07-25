var ship;
var ships=[];
var socket;

function setup(){
  createCanvas(500,500);

  var username = prompt("Enter a username :");
  ship = new Ship(username);

  socket=io(); //connects client to server

  Join(ship,socket);  //function that adds ship to the server's database

  socket.on("shipsUpdate",function(data){
    var arr=[];
    for(var i=0;i<data.length;i++){
      if(data[i].username !== ship.username){
          var tempship = new Ship(data[i].username, data[i]);
          arr.push(tempship);
      }
    }
    ships=arr;
    console.log(ships.length);
  });


}
function draw(){
  background(0);
  ship.render();
  ship.update();

  ships.forEach(function(ship){
    ship.render();
    ship.renderUsername();
  });

  Update(ship,socket);
}
function Join(ship, socket){
    var data = {
      username:ship.username,
      x:ship.pos.x,
      y:ship.pos.y,
      vx:ship.vel.x,
      vy:ship.vel.y,

      r:ship.r,
      dir:ship.dir,
      color:ship.color
    };
    socket.emit("join",data);

}
function Update(ship, socket){
    var data = {
      username:ship.username,
      x:ship.pos.x,
      y:ship.pos.y,
      vx:ship.vel.x,
      vy:ship.vel.y,

      r:ship.r,
      dir:ship.dir,
      color:ship.color
    };
    socket.emit("update",data);
}
function updateShip(ship,data){
  ship.username=data.username;
  ship.pos.x=data.pos.x;
  ship.pos.y=data.pos.y;
  ship.vel.x=data.vx;
  ship.vel.y=data.vy;

  ship.r=data.r;
  ship.dir=data.dir;
  ship.color=data.color;
}
