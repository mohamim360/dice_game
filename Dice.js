class Dice {
	constructor(values) {
			if (!Array.isArray(values) || values.length < 2) {
					throw new Error("Dice must have at least two values.");
			}
			this.values = values;
	}
}

module.exports = Dice;
