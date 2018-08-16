var canvas;
var ctx;
var backgrImg1;
var backgrImg2;
var platform,
  platforms = [];

var mario;
var enemies = [],
  collectedCats = [];

var intervalCanvas;
var intervalScore;

var playerHorizontalMovementFactor = 0;

var collisionDetected = false;

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
  showScore();
  showTime();
  showNoOfPlatforms();

  timePassed = Date.now() - gameStart;
  if (Math.floor(timePassed / 1000) >= totalTime) {
    clearInterval(intervalCanvas);
    clearInterval(intervalScore);
    gameEnd();
  }
}

function gameEnd() {
  console.log("game ended");
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
  startGame();

  document.getElementById("start-button").onclick = function() {
    document.getElementById("start-button").disabled = "disabled";
  };

  function startGame() {
    generateEnemies(10);
    gameStart = Date.now();
    mario = new Hero(50, 70, ctx);
    mario.ownAnimation();
    intervalCanvas = setInterval(updateCanvas, 1);
    intervalScore = setInterval(calculateStats, 1000);
  }
};
