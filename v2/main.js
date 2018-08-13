var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var World = function() {
  this.gravity = 1.007;
  this.ground = canvas.height / 2;
};

var bR1 = new Background(10, 0, canvas.width, canvas.height - 50);
var bR2 = new Background(bR1.x - bR1.width, 0, bR1.width, bR1.height);
var mario = new Hero(100, 100);
var world = new World();
var enemy = new Enemy(100);
var intervalId;
var timeCounter = 0;
var playerHorizontalMovementFactor = 0;

//update canvas is the main loop of the game
function updateCanvas() {
  bR1.newPos();
  bR2.newPos();
  mario.newPos();
  enemy.newPos();
  drawBackground();
  drawHero();
  drawEnemy();
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

document.onkeyup = function(e) {
  if (mario.y >= world.ground) {
    playerHorizontalMovementFactor = 0;
  }
};

intervalId = setInterval(updateCanvas, 10);
