window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
    document.getElementById("start-button").disabled = "disabled";
  };

  function startGame() {
    intervalId = setInterval(updateCanvas, 1);
    gameStart = Date.now();
    // Math.floor(millis/1000)
    // console.log(gameStart)
  }
};

var World = function() {
  this.gravity = 1.007;
  this.ground = canvas.height / 2;
};
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var bR1 = new Background(10, 0, canvas.width, canvas.height - 50);
var bR2 = new Background(bR1.x - bR1.width, 0, bR1.width, bR1.height);
var mario = new Hero(100, 100);
var world = new World();
var enemy = new Enemy(100);
var intervalId;
var gameStart,
  timePassed = 0;
var playerHorizontalMovementFactor = 0;
var score = 0;

//update canvas is the main loop of the game
function updateCanvas() {
  bR1.newPos();
  bR2.newPos();
  mario.newPos();
  enemy.newPos();
  drawBackground();
  drawHero();
  drawEnemy();
  showScore();

  timePassed = Date.now() - gameStart;

  if (Math.floor(timePassed / 1000) >= 30) {
    gameEnd();
    clearInterval(intervalId);
  }
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

function gameEnd() {
  console.log("game ended");
}

function showScore() {
  ctx.font = "30px monospace";
  ctx.fillStyle = "white";
  var text = `Your score: ${score}`;
  ctx.fillText(text, canvas.width - 250, 50);
}

// intervalId = setInterval(updateCanvas, 10);
