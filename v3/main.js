var canvas;
var ctx;
var backgrImg1;
var backgrImg2;
var platform,
  platforms = [];

var granny;
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

  granny.newPos(platforms);
  platforms.forEach(function(platform) {
    platform.newPos();
    platform.drawPlatform();
  });
  enemies.forEach(function(enemy) {
    enemy.newPos();
    enemy.drawEnemy();
  });
  granny.drawHero();
  showScore();
  showTime();
  showNoOfPlatforms();

  timePassed = Date.now() - gameStart;
  if (
    Math.floor(timePassed / 1000) >= totalTime ||
    getNumberOfCollectedCats() === enemies.length
  ) {
    clearInterval(intervalCanvas);
    clearInterval(intervalScore);
    gameEnd();
  }
}

function gameEnd() {
  var victoryText =
    "You did well, but some of these pets will die in this forest now";
  if (getNumberOfCollectedCats() === enemies.length) {
    victoryText = `You collected all pets and they don't have to die in the forest`;
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  var middle = canvas.width / 2 - 150;
  var strings = {
    0: { text: "GAME OVER", value: "", x: middle },
    1: { text: "Pets saved: ", value: getNumberOfCollectedCats(), x: middle - 20},
    2: { text: "of ", value: enemies.length, x: middle + 15 },
    3: { text: victoryText, value: "", x: 20 },
    4: { text: "Refresh to start new game", value: "", x: middle -50 },
    5: { text: "SPECIAL THANKS TO ALL,", value: "", x: middle - 40},
    6: { text: "who provided pictures of their pets! ", value: "", x: middle - 120}
  };
  var length = Object.keys(strings).length;
  for (var i = 0; i < length; i++) {
    displayText({
      text: strings[i].text,
      value: strings[i].value,
      x: strings[i].x,
      y: 50 + 50 * i
    });
  }
}

document.onkeydown = function(e) {
  if (gameStarted) {
    if (e.keyCode === 39) {
      //RIGHT
      playerHorizontalMovementFactor = 1;
    } else if (e.keyCode === 38) {
      //UP
      granny.jump();
      granny.isJumping = true;
    } else if (e.keyCode === 37) {
      //LEFT
      playerHorizontalMovementFactor = -1;
    } else if (e.keyCode === 32) {
      granny.spawnPlatform();
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
    granny.isJumping = false;
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
    granny = new Hero(50, 70, ctx);
    granny.ownAnimation();
    intervalCanvas = setInterval(updateCanvas, 1);
    intervalScore = setInterval(calculatePlatforms, 1000);
  }
};
