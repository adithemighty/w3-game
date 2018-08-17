var Hero = function(x, y) {
  this.x = x;
  this.y = y;
  this.src = "https://tinyurl.com/y9bhauff";
  this.jump = function() {
    this.y -= 25;
  };
  this.newPos = function() {
    if (this.y >= world.ground) {
      this.y = world.ground;
    } else {
      this.y *= world.gravity;
    }
  };
};

function drawHero() {
    var img = new Image();
    img.src = granny.src;
    cc.save();
    cc.drawImage(img, granny.x, granny.y, 50, 70);
    cc.restore();
  }