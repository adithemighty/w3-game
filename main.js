window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
    document.getElementById("start-button").disabled = "disabled";
  };

  function startGame() {
    intervalId = setInterval(updateCanvas, 1);
    gameStart = Date.now();
  }
};

var World = function() {
  this.gravity = 1.007;
  this.ground = canvas.height / 2;
};

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var backgrImg1 = new Background(10, 0, canvas.width, canvas.height - 50);
var backgrImg2 = new Background(backgrImg1.x - backgrImg1.width, 0, backgrImg1.width, backgrImg1.height);
var enemy = new Enemy(100);
var mario = new Hero(100, 100);
var world = new World();
var intervalId;
var gameStart,
    timePassed = 0;
var playerHorizontalMovementFactor = 0;
var score = 0;
var collisionDetected = false;

//GAMES MAIN LOOP
function updateCanvas() {
  backgrImg1.newPos();
  backgrImg2.newPos();
  mario.newPos(enemy);
  enemy.newPos();
  backgrImg1.drawBackground(backgrImg1, backgrImg2);
  mario.drawHero();
  enemy.drawEnemy();
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
  } else if (e.keyCode === 38) {
    //UP
    mario.jump();
    mario.newPos();
  } else if (e.keyCode === 37) {
    //LEFT
    playerHorizontalMovementFactor = -1;
  }
};

//Whenever a player presses nothing there should be no movement of the background
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
