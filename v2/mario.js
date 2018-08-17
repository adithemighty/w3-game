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
  this.newPos = function(pet) {
    if (this.posY >= world.ground) {
      this.posY = world.ground;
    } else {
      this.posY *= world.gravity;
    }

    if (pet && this.posX + granny.width >= pet.posX) {
      pet.collected = true;
      pets.splice(0, 1);
      score++;
    }
  };
  this.drawHero = function() {
    var img = new Image();
    img.src = granny.src;
    ctx.save();
    ctx.drawImage(img, granny.posX, granny.posY, granny.width, granny.height);
    ctx.restore();
  };
};
