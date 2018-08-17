var Pet = function(x, y, width, height) {
  this.speed = 1;
  this.posX = x;
  this.posY = y;
  this.width = width;
  this.height = height;
  this.collected = false;
  this.newPos = function() {
    this.posX -= this.speed;
  };
  this.drawPet = function() {
    if (this.collected === false) {
      ctx.save();
      ctx.fillStyle = "red";
      ctx.fillRect(this.posX, this.posY, this.width, this.height);
      ctx.restore();
    }
  };
};

var randomNumber;
function generateEnemies(enemNumb) {
  var startingX = canvas.width - 150;
  for (var i = 0; i < enemNumb; i++) {
    randomNumber = generateRandomNumber(canvas.height);
    pets.push(new Pet(startingX + 300 * i, randomNumber, 100, 100));
  }
  intervalId = setInterval(updateCanvas, 1);
}

function generateRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
