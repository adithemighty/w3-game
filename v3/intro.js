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
    height: canvas.height,
    drawLivingRoom: function() {
      this.drawPicture(
        this.livingRoom.src,
        this.livingRoom.posX,
        this.livingRoom.posY,
        this.livingRoom.width,
        this.livingRoom.height
      );
    }.bind(this)
  };
  this.grandma = {
    src: "./v3/pictures/grandma.png",
    posX: canvas.width / 2,
    posY: 200,
    width: 500,
    height: 600,
    drawGrandma: function() {
      this.drawPicture(
        this.grandma.src,
        this.grandma.posX,
        this.grandma.posY,
        this.grandma.width,
        this.grandma.height
      );
    }.bind(this)
  };
  this.text = {
    dialogOneOne: "I am granny Nice.",
    dialogOneTwo: "I like to help pets that got lost in the woods.",
    dialogOneThree: "Press any key to continue.",
    dialogTwoOne: "Press left to move left.",
    dialogTwoTwo: "Press right to move right.",
    dialogTwoThree: "Press up to jump.",
    dialogTwoFour: "Press space to create cat tree.",
    dialogThreeOne: "Ready?",
    dialogThreeTwo: "Press any key to continue",
    drawText: function(text, y) {
      displayText({
        text: text,
        value: "",
        x: 100,
        y: y
      });
    }.bind(this),
    drawFirstDialogue: function() {
      this.text.drawText(this.text.dialogOneOne, 100);
      this.text.drawText(this.text.dialogOneTwo, 150);
      this.text.drawText(this.text.dialogOneThree, 200);
    }.bind(this),
    drawSecondDialogue: function() {
      this.text.drawText(this.text.dialogTwoOne, 100);
      this.text.drawText(this.text.dialogTwoTwo, 150);
      this.text.drawText(this.text.dialogTwoThree, 200);
      this.text.drawText(this.text.dialogTwoFour, 250);
    }.bind(this),
    drawThirdDialogue: function() {
      this.text.drawText(this.text.dialogThreeOne, 100);
      this.text.drawText(this.text.dialogThreeTwo, 150);
    }.bind(this)
  };

  this.checkIfDone = function() {
    if (this.counter >= 4) {
      return true;
    } else {
      this.mainLoop();
      return false;
    }
  };

  this.mainLoop = function() {
    this.livingRoom.drawLivingRoom();
    if (this.counter === 1) {
      drawRect();
      this.text.drawFirstDialogue();
    } else if (this.counter === 2) {
      drawRect();
      this.text.drawSecondDialogue();
    } else if (this.counter === 3) {
      drawRect();
      this.text.drawThirdDialogue();
    }
    this.grandma.drawGrandma();
  };

  this.counter = 1;
}
