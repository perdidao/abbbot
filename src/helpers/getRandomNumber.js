function getRandomInt(min, max) {
  const start = Math.ceil(min);
  const end = Math.floor(max);
  return Math.floor(Math.random() * (start - end + 1)) + start;
}

module.exports = {
  getRandomInt,
};
