var Platform = function(x, y, width, height) {
  Component.call(this, x, y, width, height);
  this.drawPlatform = function() {
    ctx.save();
    ctx.fillStyle = "red";
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
    ctx.restore();
  };
  this.newPos = function() {
    this.posX -= 1 * playerHorizontalMovementFactor;
  };
};

Platform.prototype = Object.create(Component.prototype);
Platform.prototype.constructor = Platform;

function generatePlatforms(numOfPlatf) {
  var startingX = canvas.width - 450;
  //find position to put platform
  for (var i = 0; i < numOfPlatf; i++) {
    platforms.push(new Platform());
  }
}
