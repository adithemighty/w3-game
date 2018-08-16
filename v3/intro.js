function Intro() {
  this.drawPicture = function(src, posX, posY, width, height) {
    this.img = new Image();
    ctx.save();
    this.img.src = src;
    ctx.drawImage(this.img, posX, posY, width, height);
    ctx.restore();
  };
  this.livingRoom = {
    src: "./v3/pictures/livingRoom.png",
    posX: 0,
    posY: 0,
    width: canvas.width,
    height: canvas.height
  };
  this.grandma = {
    src: "./v3/pictures/grandma.png",
    posX: canvas.width / 2 - 300,
    posY: 200,
    width: 500,
    height: 600
  };
  this.checkIfDone = function() {
    if (this.counter >= 1000) {
      console.log(this.counter);
      return true;
    } else {
      this.mainLoop();
      return false;
    }
  };
  this.mainLoop = function() {
    this.drawPicture(
      this.livingRoom.src,
      this.livingRoom.posX,
      this.livingRoom.posY,
      this.livingRoom.width,
      this.livingRoom.height
    );
    this.drawPicture(
      this.grandma.src,
      this.grandma.posX,
      this.grandma.posY,
      this.grandma.width,
      this.grandma.height
    );
  };

  this.counter = 1;
}
