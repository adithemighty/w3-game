function generateRandomNumber(max, min) {
  if (typeof min == "undefined") {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min) + min);
}
