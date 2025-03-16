const DiceParser = require("./DiceParser");


(async () => {
	try {
			const args = process.argv.slice(2);
			const dice = DiceParser.parseDice(args);

	} catch (error) {
			console.error(error.message);
	}
})();