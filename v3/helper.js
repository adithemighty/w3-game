function generateRandomNumber(max, min) {
  if (typeof min == "undefined") {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min) + min);
}

function displayText() {
  ctx.save();
  var text = arguments[0].text + arguments[0].value;
  var y;
  var color;
  color = "white";
  if (typeof arguments[0].y == "undefined") {
    y = 50;
  } else {
    y = arguments[0].y;
  }
  ctx.font = "25px monospace";
  ctx.fillStyle = color;
  ctx.fillText(text, arguments[0].x, y);
  ctx.restore();
}

function drawRect() {
  ctx.save();
  ctx.fillStyle = "black";
  ctx.fillRect(50, 50, 750, 300);
  ctx.restore();
}
