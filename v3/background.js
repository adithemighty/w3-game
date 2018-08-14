var Background = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.src = "https://tinyurl.com/ycelb88y";
  this.newPos = function() {
    if (this.x < 0 - canvas.width) {
      this.x = canvas.width;
    } else if (this.x > canvas.width) {
      this.x = 0 - canvas.width;
      //hero moves right
    } else if (playerHorizontalMovementFactor > 0) {
      this.x -= 1 * playerHorizontalMovementFactor;
    } else if (playerHorizontalMovementFactor < 0) {
      this.x -= 1 * playerHorizontalMovementFactor;
    }
  };
  this.drawBackground = function(bG1, bG2) {
    var img = new Image();
    // img.onload = drawBackground;
    img.src = this.src;
    ctx.save();
    ctx.drawImage(img, bG1.x, bG1.y, canvas.width, canvas.height);
    ctx.drawImage(img, bG2.x, bG2.y, canvas.width, canvas.height);
    ctx.restore();
  };
};
