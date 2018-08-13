var Enemy = function(width) {
  this.speed = 1;
  this.enemX = canvas.width - width;
  this.enemY = 100;
  this.width = width;
  this.newPos = function() {
    this.enemX -= this.speed;
  };
};

function drawEnemy() {
  if (collisionDetected === false) {
    ctx.save();
    ctx.fillStyle = "red";
    ctx.fillRect(enemy.enemX, enemy.enemY, enemy.width, enemy.width);
    ctx.restore();
  } else {
    collisionDetected = false
    // score++;
  }
}
