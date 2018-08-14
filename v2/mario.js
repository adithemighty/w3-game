var World = function() {
  this.gravity = 1.007;
  this.ground = canvas.height - 110;
};

var world = new World();
var Hero = function(x, y) {
  this.posX = x;
  this.posY = y;
  this.src = "https://tinyurl.com/y9bhauff";
  this.width = 50;
  this.height = 70;

  this.jump = function() {
    if (this.posY >= world.ground - 50) {
      this.posY -= 50;
    }
  };
  this.newPos = function(enemy) {
    if (this.posY >= world.ground) {
      this.posY = world.ground;
    } else {
      this.posY *= world.gravity;
    }

    if (enemy && this.posX + mario.width >= enemy.posX) {
      enemy.collected = true;
      enemies.splice(0, 1);
      score++;
    }
  };
  this.drawHero = function() {
    var img = new Image();
    img.src = mario.src;
    ctx.save();
    ctx.drawImage(img, mario.posX, mario.posY, mario.width, mario.height);
    ctx.restore();
  };
};
