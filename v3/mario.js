var World = function() {
  this.gravity = 0.1; // The bigger, the more you will be attracted to the earth
  this.airFriction = 0.02; // The bigger, the smoother the player will go down
  this.ground = canvas.height - 110;
};

var world = new World();
var Hero = function(x, y,ctx) {
  Component.call(this, x, y, 50, 100);
  this.speedY = 0;
  this.onPlatform = false;
  this.ctx = ctx;

  this.img = new Image();
  // this.src = './nan.png'
  this.img.src = "./v3/nan.png";

  this.curColumn = 0;
  this.curRow = 1;
  this.frameCount = 4;

  this.spriteWidth = 545;
  this.spriteHeight = 1049;
  this.rows = 13;
  this.columns = 9;

  this.picWidth = this.spriteWidth / this.columns;
  this.picHeight = this.spriteHeight / this.rows;

  this.srcX = 0;
  this.srcY = 0;

  this.speed = 100;

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
    this.onPlatform = false;
    if (
      newPosY + this.height >= platform.top() &&
      platform.bottom() >= newPosY + this.height
    ) {
      if (this.left() <= platform.right() && this.right() >= platform.left()) {
        newPosY = platform.top() - this.height;
        this.onPlatform = true;
      }
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
    this.ctx.save();
    this.ctx.drawImage(
      this.img,
      this.srcX,
      this.srcY,
      this.picWidth,
      this.picHeight,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    this.ctx.restore();
  };

  this.ownAnimation = function() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ownInterval = setInterval(
      this._updateOwnAnimation.bind(this),
      this.speed
    );
  };

  this._updateOwnAnimation = function() {
    this.curColumn = ++this.curColumn % this.frameCount;
    this.srcX = this.curColumn * this.picWidth;
    this.srcY = this.curRow * this.picHeight;
  };
};

Hero.prototype = Object.create(Component.prototype);
Hero.prototype.constructor = Hero;
