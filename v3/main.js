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

var gameStarted = false;

//GAMES MAIN LOOP
function updateCanvas() {
  backgrImg1.newPos();
  backgrImg2.newPos();
  backgrImg1.drawBackground(backgrImg1, backgrImg2);

  mario.newPos(platforms);
  platforms.forEach(function(platform) {
    platform.newPos();
    platform.drawPlatform();
  });
  enemies.forEach(function(enemy) {
    enemy.newPos();
    enemy.drawEnemy();
  });
  mario.drawHero();
  showScore();
  showTime();
  showNoOfPlatforms();

  timePassed = Date.now() - gameStart;
  if (Math.floor(timePassed / 1000) >= totalTime || getNumberOfCollectedCats() === enemies.length) {
    clearInterval(intervalCanvas);
    clearInterval(intervalScore);
    gameEnd();
  }
}

function gameEnd() {
  var victoryText =
    "You did well, but some of these pets will die in this forest now";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  displayText({
    text: "GAME OVER",
    value: "",
    x: canvas.width / 2 - 100,
    y: 50
  });
  displayText({
    text: "Cats collected: ",
    value: getNumberOfCollectedCats(),
    x: canvas.width / 2 - 150,
    y: 100
  });
  displayText({
    text: "of ",
    value: enemies.length,
    x: canvas.width / 2 + 150,
    y: 100
  });
  if (getNumberOfCollectedCats() === enemies.length) {
    victoryText = `You collected all pets and they don't have to die in the forest`;
  }
  displayText({
    text: victoryText,
    value: "",
    x: 20,
    y: 200
  });
  displayText({
    text: 'Refresh to start new game',
    value: "",
    x: canvas.width / 2-150,
    y: 250
  });
}

document.onkeydown = function(e) {
  if (gameStarted) {
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
  } else {
    intro.counter++;
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
  intro = new Intro();
  intervalIntro = setInterval(checkIntro);

  function checkIntro() {
    if (intro.checkIfDone()) {
      gameStarted = true;
      startGame();
      clearInterval(intervalIntro);
    }
  }

  function startGame() {
    generateEnemies(10);
    gameStart = Date.now();
    mario = new Hero(50, 70, ctx);
    mario.ownAnimation();
    intervalCanvas = setInterval(updateCanvas, 1);
    intervalScore = setInterval(calculatePlatforms, 1000);
  }
};
