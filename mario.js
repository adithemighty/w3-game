var World = function() {
  this.gravity = 1.007;
  this.ground = canvas.height - 110;
};

var world = new World();
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
  this.newPos = function(enemy) {
    if (this.y >= world.ground) {
      this.y = world.ground;
    } else {
      this.y *= world.gravity;
    }

    if (enemy && this.x + 50 - enemy.posX > 0) {
      collisionDetected = true;
      enemies.splice(0, 1)
      score++
    } else {
      collisionDetected = false;
    }
  };
  this.drawHero = function() {
    var img = new Image();
    img.src = mario.src;
    ctx.save();
    ctx.drawImage(img, mario.x, mario.y, mario.width, mario.height);
    ctx.restore();
  };
};
