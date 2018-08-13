var Enemy = function(width) {
  this.speed = 1;
  this.enemX = canvas.width - width;
  this.enemY = 100;
  this.width = width;
  this.newPos = function() {
    this.enemX -= this.speed;
  };
  this.drawEnemy = function(){
    if (collisionDetected === false) {
      ctx.save();
      ctx.fillStyle = "red";
      ctx.fillRect(this.enemX, this.enemY, this.width, this.width);
      ctx.restore();
    }
  }
};
