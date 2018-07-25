var express = require("express");
var app = express();

var http=require("http").Server(app);

var io=require("socket.io")(http);//socket.io setup

app.use(express.static(__dirname+"/client"));

app.get("/",function(req,res){
    res.render("index.html");
});
///
var ships=[]
var socket;
io.on("connection",function(socket){
    console.log( socket.id +" has connected.");

    socket.on("join",function(data){    //first entry of a ship's data (setup)
        var ship = new Ship(data,socket);
        ships.push(ship);
    });
    //receiving updates to clients
    socket.on("update",function(data){
      broadcastShipsData(socket , ships);

        var index;
        var updated = new Ship(data,socket).username;

        //bruteforce search ;(
        for(var i=0;i<ships.length;i++){
          if(ships[i].username === updated){
            index =i;
            break;
          }
        }
        UpdateShip(ships[index],data);


    });

    socket.on("disconnect",function(){
          console.log(socket.id + " has disconnected");
    });

});

function Ship(data,socket){ ///constructor for a ship object
    this.id=socket.id;
    this.username=data.username;

    this.x=data.x;
    this.y=data.y;
    this.vx=data.vx;
    this.vy=data.vy;

    this.r=data.r;
    this.dir=data.dir;
    this.color=data.color;
}
function UpdateShip(ship,data){
  ship.username=data.username,
  ship.x=data.x,
  ship.y=data.y,
  ship.vx=data.vx,
  ship.vy=data.vy,

  ship.r=data.r,
  ship.dir=data.dir,
  ship.color=data.color
}

function broadcastShipsData(socket, ships){
    io.emit("shipsUpdate",ships);
}

////

http.listen(3000,function(){
  console.log("listening on port 3000");
});
