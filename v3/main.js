var canvas;
var ctx;
var backgrImg1;
var backgrImg2;
var platform,
  platforms = [],
  maxNoOfPlatforms = 3;
var mario;
var enemies = [],
  collectedCats = [];

var intervalCanvas;
var intervalScore;

var gameStart,
  timePassed = 0,
  initTime = 10,
  totalTime = 100;

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

  mario.drawHero();
  mario.newPos(platforms);

  platforms.forEach(function(platform) {
    platform.newPos();
    platform.drawPlatform();
  });
  enemies.forEach(function(enemy) {
    // mario.detectCollision(enemy);
    enemy.newPos();
    enemy.drawEnemy();
  });
  // updateScore();
  showScore();
  showTime();

  timePassed = Date.now() - gameStart;
  if (Math.floor(timePassed / 1000) >= totalTime) {
    clearInterval(intervalCanvas);
    clearInterval(intervalScore);
    gameEnd();
  }
}

function updateScore() {
  // totalTime = initTime + getNumberOfCollectedCats();
  // console.log(totalTime);
}

function gameEnd() {
  console.log("game ended");
}

function showScore() {
  score = getNumberOfCollectedCats();
  ctx.save();
  ctx.font = "30px monospace";
  ctx.fillStyle = "white";
  var text = `Your score: ${score}`;
  ctx.fillText(text, canvas.width - 250, 50);
  ctx.restore();
}

function showTime() {
  // totalTime += (getNumberOfCollectedCats() * 3) / 1000;
  var remainingTime = Math.floor(totalTime - timePassed / 1000);
  ctx.font = "30px monospace";
  ctx.fillStyle = "white";
  var text = `Remaining time: ${remainingTime}`;
  ctx.fillText(text, 20, 50);
}

document.onkeydown = function(e) {
  if (e.keyCode === 39) {
    //RIGHT
    playerHorizontalMovementFactor = 1;
  } else if (e.keyCode === 38) {
    //UP
    mario.jump();
    mario.isJumping = true;
  } else if (e.keyCode === 37) {
    //LEFT
    playerHorizontalMovementFactor = -1;
  } else if (e.keyCode === 32) {
    mario.spawnPlatform();
  }
};

//Whenever a player presses nothing there should be no movement of the background
document.onkeyup = function(e) {
  if (e.keyCode === 39 || e.keyCode === 37) {
    playerHorizontalMovementFactor = 0;
  } else if (e.keyCode === 38) {
    mario.isJumping = false;
  }
};

window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  backgrImg1 = new Background(10, 0, canvas.width, canvas.height - 50);
  backgrImg2 = new Background(
    backgrImg1.x - backgrImg1.width,
    0,
    backgrImg1.width,
    backgrImg1.height
  );
  // platform = new Platform(250, 250, 40, 10);
  startGame();

  document.getElementById("start-button").onclick = function() {
    // startGame();
    document.getElementById("start-button").disabled = "disabled";
  };

  function startGame() {
    generateEnemies(10);
    // generatePlatforms(10);
    gameStart = Date.now();
    mario = new Hero(50, 70, ctx);
    mario.ownAnimation();
    intervalCanvas = setInterval(updateCanvas, 1);
    intervalScore = setInterval(updateScore, 1000);
  }
};
