var c = document.getElementById("canvas");
var cc = c.getContext("2d");

var World = function() {
  this.gravity = 1.01;
  this.ground = c.height / 2;
};

var bR1 = new Background(10, 0, c.width, c.height - 50);
var bR2 = new Background(bR1.x - bR1.width, 0, bR1.width, bR1.height);
var mario = new Hero(100, 100);
var world = new World();
var intervalId;
var counter = 0;
var playerHorizontalMovementFactor = 0;


function updateCanvas() {
  bR1.newPos();
  bR2.newPos();
  mario.newPos();
  drawBackground();
  drawHero();
}

document.onkeydown = function(e) {
  if (e.keyCode === 39) {
    //RIGHT
    mario.newPos();
    playerHorizontalMovementFactor = 1;
    // console.log('i moved right')
  } else if (e.keyCode === 38) {
    //UP
    mario.jump();
    mario.newPos();
  } else if (e.keyCode === 37) {
    // console.log(e)
    playerHorizontalMovementFactor = -1;
  }
};

document.onkeyup = function(e){
  playerHorizontalMovementFactor=0
}

intervalId = setInterval(updateCanvas, 10);
