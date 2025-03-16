class Dice {
  constructor(values) {
    if (!Array.isArray(values) || values.length < 2) {
      throw new Error("Dice must have at least two values.");
    }
    this.values = values;
  }
  roll(index) {
    return this.values[index];
  }
}

module.exports = Dice;
