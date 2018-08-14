var World = function() {
  this.gravity = 0.1; // The bigger, the more you will be attracted to the earth
  this.airFriction = 0.02; // The bigger, the smoother the player will go down
  this.ground = canvas.height - 110;
};

var world = new World();
var Hero = function(x, y) {
  Component.call(this, x, y, 50, 70);
  this.speedY = 0;
  this.onPlatform = false;
  this.src = "https://tinyurl.com/y9bhauff";
  //MAKE HERO JUMP
  this.jump = function() {
    if (this.posY >= world.ground || this.onPlatform) {
      //HERO CAN'T GO UNDERGROUND
      this.speedY = -10;
    }
  };

  //CALCULATE NEW POSITION OF HERO
  this.newPos = function() {
    this.speedY += world.gravity - world.airFriction * this.speedY;

    var newPosY = this.posY + this.speedY;
    // Platforms detection
    if (
      this.bottom() <= platform.top() &&
      platform.top() < newPosY + this.height
    ) {
      if (this.left() <= platform.right() && this.right() >= platform.left()) {
        newPosY = platform.top() - this.height;
        this.onPlatform = false;
      }
      this.onPlatform = true;
    }
    // Ground detection
    else if (newPosY >= world.ground) {
      newPosY = world.ground;
    }
    this.posY = newPosY;
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

  //SET STATUS OF ENEMY TO COLLECTED SO THAT THEY ARE NOT DRAWN ON THE CANVAS ANYMORE
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

Hero.prototype = Object.create(Component.prototype);
Hero.prototype.constructor = Hero;
