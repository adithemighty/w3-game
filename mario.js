var Hero = function(x, y) {
  this.x = x;
  this.y = y;
  this.src = "https://tinyurl.com/y9bhauff";
  this.width = 50;
  this.height = 70;
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

    if (this.x + 50 - enemy.enemX > 0) {
      collisionDetected = true;
    }
  };
};

function drawHero() {
  var img = new Image();
  img.src = mario.src;
  ctx.save();
  ctx.drawImage(img, mario.x, mario.y, mario.width, mario.height);
  ctx.restore();
}
