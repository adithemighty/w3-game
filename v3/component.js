var Component = function(x, y, width, height) {
  this.posX = x;
  this.posY = y;
  this.width = width;
  this.height = height;
  this.top = function() {
    return this.posY;
  };
  this.right = function() {
    return this.posX + this.width;
  };
  this.bottom = function() {
    return this.posY + this.height;
  };
  this.left = function() {
    return this.posX;
  };
};
