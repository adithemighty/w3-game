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
    dialogOne: {
      0: "I am granny Nice.",
      1: "I like to help pets that got lost in the woods.",
      2: "Press any key to continue."
    },
    dialogTwo: {
      0: "Press left to move left.",
      1: "Press right to move right.",
      2: "Press up to jump.",
      3: "Jump AND press space to get",
      4: "to pets that are too high."
    },
    dialogThree: {
      0: "You have a limited amount of time",
      1: "and platforms so use them wisely.",
      2: "With every second pet you catch",
      3: "you will get an additional platform."
    },
    dialogFour: {
      0: "Ready?",
      1: "Press any key to continue"
    },
    drawText: function(text, y) {
      displayText({
        text: text,
        value: "",
        x: 100,
        y: y
      });
    }.bind(this),
    drawDialogue: function(dialogNumb) {
      var length = Object.keys(this.text[dialogNumb]).length;
      for (var i = 0; i < length; i++) {
        this.text.drawText(this.text[dialogNumb][i], 100 + 50 * i);
      }
    }.bind(this)
  };

  this.checkIfDone = function() {
    if (this.counter >= 5) {
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
      this.text.drawDialogue("dialogOne");
    } else if (this.counter === 2) {
      drawRect();
      this.text.drawDialogue("dialogTwo");
    } else if (this.counter === 3) {
      drawRect();
      this.text.drawDialogue("dialogThree");
    } else if (this.counter === 4) {
      drawRect();
      this.text.drawDialogue("dialogFour");
    }
    this.grandma.drawGrandma();
  };

  this.counter = 1;
}
