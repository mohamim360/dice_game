class ProbabilityCalculator {
	static calculateProbabilities(dice) {
			const probabilities = [];
			for (let i = 0; i < dice.length; i++) {
					probabilities[i] = [];
					for (let j = 0; j < dice.length; j++) {
							if (i === j) {
									probabilities[i][j] = 0.5;
							} else {
									let wins = 0;
									const total = dice[i].values.length * dice[j].values.length;
									for (const valueA of dice[i].values) {
											for (const valueB of dice[j].values) {
													if (valueA > valueB) wins++;
											}
									}
									probabilities[i][j] = wins / total;
							}
					}
			}
			return probabilities;
	}
}

module.exports = ProbabilityCalculator;