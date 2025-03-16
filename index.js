const DiceParser = require("./DiceParser");
const Game = require("./Game");

(async () => {
	try {
			const args = process.argv.slice(2);
			const dice = DiceParser.parseDice(args);
			const game = new Game(dice);
			await game.play();
	} catch (error) {
			console.error(error.message);
	}
})();