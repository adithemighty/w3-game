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
  this.top = function() {
    return this.posY;
  };
  this.right = function() {
    return this.posX + this.width;
  };
  this.bottom = function() {
    return this.posY + this.height;
  };
  this.left = function() {
    return this.posX;
  };

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
    // console.log(enemy)
  };

  //
  this.collectEnemy = function(enemy, ind) {
    // console.log(enemies, collectedCats);
    enemy.collected = true;
    // if (enemies[ind].collected) {
    //   collectedCats.push(enemy);
    //   // enemies.splice(ind, 1);
    // }
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
