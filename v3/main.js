var platform,
  platforms = [];

var granny;
var pets = [],
  collectedCats = [];

var intervalCanvas;
var intervalScore;

var playerHorizontalMovementFactor = 0;

var gameStarted = false;

//GAMES MAIN LOOP
function updateCanvas(game) {
  game.backgrImg1.newPos();
  game.backgrImg2.newPos();
  game.backgrImg1.drawBackground(game.backgrImg1, game.backgrImg2);

  granny.newPos(platforms);
  platforms.forEach(function(platform) {
    platform.newPos();
    platform.drawPlatform();
  });
  pets.forEach(function(pet) {
    pet.newPos();
    pet.drawPet();
  });
  granny.drawHero();
  showScore();
  showTime();
  showNoOfPlatforms();

  timePassed = Date.now() - gameStart;
  if (
    Math.floor(timePassed / 1000) >= totalTime ||
    getNumberOfCollectedCats() === pets.length
  ) {
    clearInterval(intervalCanvas);
    clearInterval(intervalScore);
    gameEnd();
  }
}

function gameEnd() {
  var victoryText =
    "You did well, but some of these pets will die in this forest now";
  if (getNumberOfCollectedCats() === pets.length) {
    victoryText = `You collected all pets and they don't have to die in the forest`;
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  var middle = canvas.width / 2 - 150;
  var strings = {
    0: { text: "GAME OVER", value: "", x: middle },
    1: {
      text: "Pets saved: ",
      value: getNumberOfCollectedCats(),
      x: middle - 20
    },
    2: { text: "of ", value: pets.length, x: middle + 15 },
    3: { text: victoryText, value: "", x: 20 },
    4: { text: "Refresh to start new game", value: "", x: middle - 50 },
    5: { text: "SPECIAL THANKS TO ALL,", value: "", x: middle - 40 },
    6: {
      text: "who provided pictures of their pets! ",
      value: "",
      x: middle - 120
    }
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
  var game = {
    backgrImg1: new Background(10, 0, canvas.width, canvas.height - 50),
    backgrImg2: null
  };
  game.backgrImg2 = new Background(
    game.backgrImg1.x - game.backgrImg1.width,
    0,
    game.backgrImg1.width,
    game.backgrImg1.height
  );
  intro = new Intro();
  intervalIntro = setInterval(checkIntro);

  function checkIntro() {
    if (intro.checkIfDone()) {
      gameStarted = true;
      startGame(game);
      clearInterval(intervalIntro);
    }
  }

  function startGame(game) {
    generateEnemies(10);
    gameStart = Date.now();
    granny = new Hero(50, 70, ctx);
    granny.ownAnimation();
    intervalCanvas = setInterval(function() {
      return updateCanvas(game);
    }, 1);
    intervalScore = setInterval(calculatePlatforms, 1000);
  }
};
