var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var mario = new Hero(100, 140);
var backgrImg1 = new Background(10, 0, canvas.width, canvas.height - 50);
var backgrImg2 = new Background(
  backgrImg1.x - backgrImg1.width,
  0,
  backgrImg1.width,
  backgrImg1.height
);
var platform = new Platform(250, 250, 40, 10)

var enemies = [],
  collectedCats = [];

var intervalId;

var gameStart,
  timePassed = 0;

var playerHorizontalMovementFactor = 0;

var score;
var collisionDetected = false;

function getNumberOfCollectedCats() {
  return enemies.filter(function(el) {
    return el.collected === true;
  }).length;
}

//GAMES MAIN LOOP
function updateCanvas() {
  backgrImg1.newPos();
  backgrImg2.newPos();
  backgrImg1.drawBackground(backgrImg1, backgrImg2);
  mario.newPos();
  mario.drawHero();
  platform.newPos();
  platform.drawPlatform();
  enemies.forEach(function(enemy, ind) {
    mario.detectCollision(enemy);
    enemy.newPos();
    enemy.drawEnemy();
  });
  showScore();

  timePassed = Date.now() - gameStart;
  if (Math.floor(timePassed / 1000) >= 30) {
    gameEnd();
    clearInterval(intervalId);
  }
}

function gameEnd() {
  console.log("game ended");
}

function showScore() {
  score = getNumberOfCollectedCats();
  ctx.font = "30px monospace";
  ctx.fillStyle = "white";
  var text = `Your score: ${score}`;
  ctx.fillText(text, canvas.width - 250, 50);
}

document.onkeydown = function(e) {
  if (e.keyCode === 39) {
    //RIGHT
    playerHorizontalMovementFactor = 1;
  } else if (e.keyCode === 38) {
    //UP
    mario.jump();
  } else if (e.keyCode === 37) {
    //LEFT
    playerHorizontalMovementFactor = -1;
  }
};

//Whenever a player presses nothing there should be no movement of the background
document.onkeyup = function(e) {
  if (e.keyCode === 39) {
    playerHorizontalMovementFactor = 0;
  } else if (e.keyCode === 37) {
    playerHorizontalMovementFactor = 0;
  }
};

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
    document.getElementById("start-button").disabled = "disabled";
  };

  function startGame() {
    generateEnemies(10);
    gameStart = Date.now();
  }
};