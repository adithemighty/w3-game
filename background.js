var Background = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.src = "https://tinyurl.com/ycelb88y";
    this.newPos = function() {
      if (this.x < 0 - c.width) {
        this.x = c.width;
      } else if (this.x > c.width) {
        this.x = 0 - c.width;
      } else {
        this.x -= 1 * playerHorizontalMovementFactor;
      }
    };
  };

  function drawBackground() {
    var img = new Image();
    // img.onload = drawBackground;
    img.src = bR1.src;
    cc.save();
    cc.drawImage(img, bR1.x, bR1.y, c.width, c.height);
    cc.drawImage(img, bR2.x, bR2.y, c.width, c.height);
    cc.restore();
  }
  