var c = document.getElementById("canvas");
var cc = c.getContext("2d");

// var Hero = function(x, y) {
//   this.x = x;
//   this.y = y;
//   this.src = "https://tinyurl.com/y9bhauff";
//   this.jump = function() {
//     this.y -= 25;
//   };
//   this.newPos = function() {
//     if (this.y >= world.ground) {
//       this.y = world.ground;
//     } else {
//       this.y *= world.gravity;
//     }
//   };
// };

var Pet = function(x, y) {
  this.posX = x;
  this.posY = y;
};

var World = function() {
  this.gravity = 1.01;
  this.ground = c.height / 2;
};

var bR1 = new Background(10, 0, c.width, c.height - 50);
var bR2 = new Background(bR1.x - bR1.width, 0, bR1.width, bR1.height);
var granny = new Hero(100, 100);
var world = new World();
var intervalId;
var counter = 0;
var playerHorizontalMovementFactor = 0;

intervalId = setInterval(updateCanvas, 10);

function updateCanvas() {
  bR1.newPos();
  bR2.newPos();
  granny.newPos();
  drawBackground();
  drawHero();
}

document.onkeydown = function(e) {
  if (e.keyCode === 39) {
    //RIGHT
    granny.newPos();
    playerHorizontalMovementFactor = 1;
    // console.log('i moved right')
  } else if (e.keyCode === 38) {
    //UP
    granny.jump();
    granny.newPos();
  } else if (e.keyCode === 37) {
    // console.log(e)
    playerHorizontalMovementFactor = -1;
  }
};
