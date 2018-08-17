window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
    document.getElementById("start-button").disabled = "disabled";
  };

  function startGame() {
    generateEnemies(5);
    gameStart = Date.now();
  }
};

var granny = new Hero(100, 200);
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var backgrImg1 = new Background(10, 0, canvas.width, canvas.height - 50);
var backgrImg2 = new Background(
  backgrImg1.x - backgrImg1.width,
  0,
  backgrImg1.width,
  backgrImg1.height
);
var pets = [];
var intervalId;
var gameStart,
  timePassed = 0;
var playerHorizontalMovementFactor = 0;
var score = 0;
var collisionDetected = false;

//GAMES MAIN LOOP
function updateCanvas() {
  backgrImg1.drawBackground(backgrImg1, backgrImg2);
  backgrImg1.newPos();
  backgrImg2.newPos();
  granny.drawHero();
  granny.newPos(pets[0]);
  pets.forEach(function(pet) {
    pet.newPos();
    pet.drawPet();
  });
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
    pets.forEach(function(pet) {
      granny.newPos(pet);
    });
    playerHorizontalMovementFactor = 1;
  } else if (e.keyCode === 38) {
    //UP
    granny.jump();
    pets.forEach(function(pet) {
      granny.newPos(pet);
    });
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

function gameEnd() {
  console.log("game ended");
}

function showScore() {
  ctx.font = "30px monospace";
  ctx.fillStyle = "white";
  var text = `Your score: ${score}`;
  ctx.fillText(text, canvas.width - 250, 50);
}
