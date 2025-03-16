class Dice {
  constructor(values) {
    this.values = values;
  }
  roll(index) {
    return this.values[index];
  }
}

module.exports = Dice;
