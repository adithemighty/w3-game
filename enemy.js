var Enemy = function(x,y,width) {
  this.speed = 1;
  this.posX = x;
  this.posY = y;
  this.width = width;
  this.newPos = function() {
    this.posX -= this.speed;
  };
  this.drawEnemy = function(){
    if (collisionDetected === false) {
      console.log('here')
      ctx.save();
      ctx.fillStyle = "red";
      ctx.fillRect(this.posX, this.posY, this.width, this.width);
      ctx.restore();
    }
  }
};
