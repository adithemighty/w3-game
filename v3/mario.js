var world = {
  gravity: 0.1,
  airFriction: 0.02,
  ground: canvas.height - 200
};

var Hero = function(x, y, ctx) {
  Component.call(this, x, y, 100, 150);
  this.speedY = 0;
  this.ctx = ctx;
  this.src = "./v3/pictures/nan.png";
  this.isJumping = false;
  this.platformsLeft = true;

  this.runningAnimation = {
    curRow: 1,
    frameCount: 5
  };

  this.idlingAnimation = {
    curRow: 0,
    frameCount: 4
  };

  this.jumpingAnimation = {
    curRow: 6,
    frameCount: 4
  };

  this.img = new Image();
  this.img.src = this.src;

  this.curColumn = 0;
  this.curRow = this.idlingAnimation.curRow;
  this.frameCount = this.idlingAnimation.frameCount;

  this.spriteWidth = 545;
  this.spriteHeight = 1000;
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
  this.newPos = function(platforms) {
    this.speedY += world.gravity - world.airFriction * this.speedY;

    var newPosY = this.posY + this.speedY;
    this.onPlatform = false;
    platforms.forEach(
      function(platform) {
        if (
          platform.top() <= newPosY + this.height &&
          newPosY + this.height <= platform.bottom()
        ) {
          if (
            this.left() <= platform.right() &&
            this.right() >= platform.left()
          ) {
            newPosY = platform.top() - this.height;
            this.onPlatform = true;
          }
        }
      }.bind(this)
    );

    // Ground detection
    if (newPosY >= world.ground) {
      newPosY = world.ground;
      mario.isJumping = false;
    }
    this.posY = newPosY;
    enemies.forEach(
      function(enemy) {
        this.detectEnemy(enemy);
      }.bind(this)
    );
  };

  this.detectPlatform = function(platform) {
    if (this.bottom() <= platform.bottom()) {
      if (this.left() >= platform.right() && this.right() <= platform.left()) {
        return true;
      }
    } else {
      return false;
    }
  };

  this.detectEnemy = function(enemy) {
    if (this.right() >= enemy.left() && this.left() <= enemy.right()) {
      if (mario.bottom() >= enemy.top() && mario.top() <= enemy.bottom()) {
        this.collectEnemy(enemy);
      } else if (
        mario.top() <= enemy.bottom() &&
        mario.bottom() >= enemy.top()
      ) {
        this.collectEnemy(enemy);
      }
    }
  };

  this.spawnPlatform = function() {
    //spawns a new platform just on top of hero
    if (this.platformsLeft) {
      generatePlatforms(this.posX + this.width / 2, this.posY - 50);
    }
  };

  //SET STATUS OF ENEMY TO COLLECTED SO THAT THEY ARE NOT DRAWN ON THE CANVAS ANYMORE
  this.collectEnemy = function(enemy) {
    enemy.collected = true;
  };

  //DRAW HERO TO CANVAS
  this.drawHero = function() {
    if (playerHorizontalMovementFactor === 0 && this.isJumping) {
      this.curRow = this.jumpingAnimation.curRow;
      this.frameCount = this.jumpingAnimation.frameCount;
    } else if (playerHorizontalMovementFactor !== 0) {
      this.curRow = this.runningAnimation.curRow;
      this.frameCount = this.runningAnimation.frameCount;
    } else if (playerHorizontalMovementFactor === 0) {
      this.curRow = this.idlingAnimation.curRow;
      this.frameCount = this.idlingAnimation.frameCount;
    }

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
