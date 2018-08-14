var World = function() {
  this.gravity = 1.007;
  this.ground = canvas.height - 110;
};

var world = new World();
var Hero = function(x, y) {
  MovingComponent.call(this, x, y, 50, 70);
  this.src = "https://tinyurl.com/y9bhauff";

  //MAKE HERO JUMP
  this.jump = function() {
    if (this.posY >= world.ground - 50) {
      this.posY -= 50;
    }
  };

  //CALCULATE NEW POSITION OF HERO
  this.newPos = function() {
    if (this.posY >= world.ground) {
      this.posY = world.ground;
    } else {
      this.posY *= world.gravity;
    }
  };

  //DETECTS IF HERO COLLIDED WITH ENEMY
  this.detectCollision = function(enemy) {
    if (enemy && this.right() >= enemy.left()) {
      if (mario.bottom() >= enemy.top() && mario.bottom() <= enemy.bottom()) {
        this.collectEnemy(enemy);
      } else if (
        mario.top() <= enemy.bottom() &&
        mario.bottom() >= enemy.bottom()
      ) {
        this.collectEnemy(enemy);
      }
    }
  };

  this.collectEnemy = function(enemy, ind) {
    enemy.collected = true;
  };

  //DRAW HERO TO CANVAS
  this.drawHero = function() {
    var img = new Image();
    img.src = mario.src;
    ctx.save();
    ctx.drawImage(img, mario.posX, mario.posY, mario.width, mario.height);
    ctx.restore();
  };
};

Hero.prototype = Object.create(MovingComponent.prototype);
Hero.prototype.constructor = Hero;
