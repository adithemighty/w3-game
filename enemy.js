var Enemy = function(x,y,width, height) {
  this.speed = 1;
  this.posX = x;
  this.posY = y;
  this.width = width;
  this.height = height;
  this.newPos = function() {
    this.posX -= this.speed;
  };
  this.drawEnemy = function(){
    if (collisionDetected === false) {
      ctx.save();
      ctx.fillStyle = "red";
      ctx.fillRect(this.posX, this.posY, this.width, this.height);
      ctx.restore();
    }
  }
};
