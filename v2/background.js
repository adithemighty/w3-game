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
};

function drawBackground() {
  var img = new Image();
  // img.onload = drawBackground;
  img.src = bR1.src;
  ctx.save();
  ctx.drawImage(img, bR1.x, bR1.y, canvas.width, canvas.height);
  ctx.drawImage(img, bR2.x, bR2.y, canvas.width, canvas.height);
  ctx.restore();
}
