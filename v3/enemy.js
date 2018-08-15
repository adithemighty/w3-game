var Enemy = function(x, y, width, height) {
  Component.call(this, x, y, width, height);
  this.collected = false;
  this.img = new Image();
  this.img.src = "https://tinyurl.com/y8ymv6cr";

  //ENEMIES ONLY MOVE WHEN HERO MOVES
  this.newPos = function() {
    this.posX -= 1 * playerHorizontalMovementFactor;
  };

  //IF ENEMY IS COLLECTED IT'S NOT DRAWN
  this.drawEnemy = function() {
    if (this.collected === false) {
      ctx.save();
      ctx.drawImage(this.img, this.posX, this.posY)
      // ctx.fillStyle = "red";
      // ctx.fillRect(this.posX, this.posY, this.width, this.height);
      ctx.restore();
    }
  };
};

var randomNumber;

function generateEnemies(enemNumb) {
  var startingX = canvas.width - 150;
  for (var i = 0; i < enemNumb; i++) {
    randomNumber = generateRandomNumber(canvas.height);
    enemies.push(new Enemy(startingX + 300 * i, randomNumber, 25, 25));
  }
  intervalId = setInterval(updateCanvas, 1);
}

function generateRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

Enemy.prototype = Object.create(Component.prototype);
Enemy.prototype.constructor = Enemy;
