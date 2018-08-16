function generateRandomNumber(max, min) {
  if (typeof min == "undefined") {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min) + min);
}

function displayText() {
  ctx.save();
  ctx.font = "25px monospace";
  ctx.fillStyle = "white";
  var text = arguments[0].text + arguments[0].value;
  ctx.fillText(text, arguments[0].x, 50);
  ctx.restore();
}
