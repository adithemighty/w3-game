var Enemy = function(x, y, width, height, src) {
  Component.call(this, x, y, width, height);
  this.collected = false;
  this.img = new Image();
  this.img.src = src;

  //ENEMIES ONLY MOVE WHEN HERO MOVES
  this.newPos = function() {
    this.posX -= 1 * playerHorizontalMovementFactor;
  };

  //IF ENEMY IS COLLECTED IT'S NOT DRAWN
  this.drawEnemy = function() {
    if (this.collected === false) {
      ctx.save();
      ctx.drawImage(this.img, this.posX, this.posY, 70, 70);
      ctx.restore();
    }
  };
};

var randomNumber;
var sources = [
  "https://tinyurl.com/y8jwf3vv",
  "https://tinyurl.com/y8ymv6cr",
  "https://tinyurl.com/y8bggj5w",
  "https://tinyurl.com/yd2d4poq",
  "https://tinyurl.com/y74gs578"
];

function generateEnemies(enemNumb) {
  var startingX = canvas.width - 150;
  for (var i = 0; i < enemNumb; i++) {
    randomNumber = generateRandomNumber(sources.length);
    var img = sources[randomNumber];
    randomNumber = generateRandomNumber(canvas.height);
    enemies.push(new Enemy(startingX + 300 * i, randomNumber, 25, 25, img));
  }
  intervalId = setInterval(updateCanvas, 1);
}

function generateRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

Enemy.prototype = Object.create(Component.prototype);
Enemy.prototype.constructor = Enemy;
