var Pet = function(x, y, width, height, src) {
  Component.call(this, x, y, width, height);
  this.collected = false;
  this.img = new Image();
  this.img.src = src;

  //ENEMIES ONLY MOVE WHEN HERO MOVES
  this.newPos = function() {
    this.posX -= 1 * playerHorizontalMovementFactor;
  };

  //IF ENEMY IS COLLECTED IT'S NOT DRAWN
  this.drawPet = function() {
    if (this.collected === false) {
      ctx.save();
      ctx.drawImage(this.img, this.posX, this.posY, 70, 70);
      ctx.restore();
    }
  };

  this.makeSound = function() {
    var audio = new Audio("./v3/sounds/meow.wav");
    audio.play();
    audio.volume = 0.01;
    // audio.loop = false;
  };
};

var randomNumber;
var sources = [
  "https://tinyurl.com/y8jwf3vv",
  "https://tinyurl.com/y8ymv6cr",
  "https://tinyurl.com/yd2d4poq",
  "https://tinyurl.com/y74gs578",
  "./v3/pictures/cat.png",
  "./v3/pictures/cat1.png",
  "https://tinyurl.com/ycb5woup",
  "./v3/pictures/dog.png",
  "./v3/pictures/cat_of_lisa.png"
];

function generateEnemies(enemNumb) {
  var startingX = canvas.width - 450;
  for (var i = 0; i < enemNumb; i++) {
    randomNumber = generateRandomNumber(sources.length);
    var img = sources[randomNumber];
    randomNumber = generateRandomNumber(world.ground - 100, 0);
    pets.push(new Pet(startingX + 300 * i, randomNumber, 25, 25, img));
  }
}

Pet.prototype = Object.create(Component.prototype);
Pet.prototype.constructor = Pet;
