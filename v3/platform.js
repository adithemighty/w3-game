var Platform = function(x, y, width, height) {
  Component.call(this, x, y, width, height);
  this.img = new Image();
  this.img.src = "./v3/pictures/cat-tree.png";
  this.drawPlatform = function() {
    ctx.save();
    ctx.drawImage(this.img, this.posX-50, this.posY, 200, 200);
    ctx.restore();
  };
  this.newPos = function() {
    this.posX -= 1 * playerHorizontalMovementFactor;
  };
};

Platform.prototype = Object.create(Component.prototype);
Platform.prototype.constructor = Platform;

function generatePlatforms(posX, posY) {
  platforms.push(new Platform(posX, posY, 50, 10));
}
