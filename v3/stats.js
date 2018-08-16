//DOCUMENT FOR SCORE, TIME AND PLATFORMS AVAILABLE

//todo migrate score, time and platforms related stats here
var gameStart,
  timePassed = 0,
  initTime = 10,
  totalTime = 100;
var score = 0;
var initNoOfPlatforms = 3,
  maxNoOfPlatforms = initNoOfPlatforms;

function getNumberOfCollectedCats() {
  return enemies.filter(function(el) {
    return el.collected === true;
  }).length;
}

function calculateStats() {
  maxNoOfPlatforms =
    initNoOfPlatforms + Math.floor(getNumberOfCollectedCats() / 2);
}

function showScore() {
  score = getNumberOfCollectedCats();
  displayText({
    text: "Your score: ",
    value: score,
    x: canvas.width - 250
  });
}

function showTime() {
  var remainingTime = Math.floor(totalTime - timePassed / 1000);
  displayText({
    text: "Remaining time: ",
    value: remainingTime,
    x: 20
  });
}

function showNoOfPlatforms() {
  displayText({
    text: "Platforms left: ",
    value: maxNoOfPlatforms,
    x: canvas.width / 2 - 100
  });
}