var Hero = function(x, y) {
  this.x = x;
  this.y = y;
  this.src = "https://tinyurl.com/y9bhauff";
  this.jump = function() {
    if (this.y >= world.ground - 50) {
      this.y -= 50;
    }
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
  img.src = mario.src;
  ctx.save();
  ctx.drawImage(img, mario.x, mario.y, 50, 70);
  ctx.restore();
}
