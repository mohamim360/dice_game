
const FairRandomGenerator = require("./FairRandomGenerator");
const HelpTable = require("./HelpTable");
const ProbabilityCalculator = require("./ProbabilityCalculator");

class Game {
  constructor(dice) {
    this.dice = dice;
    this.probabilities = ProbabilityCalculator.calculateProbabilities(dice);
  }

  async determineFirstMove() {
    console.log("Let's determine who makes the first move.");
    const { key, x, hmac } = FairRandomGenerator.generateFairRandom(2);
    console.log(`I selected a random value in the range 0..1 (HMAC=${hmac}).`);
    console.log("Try to guess my selection.");
    console.log("0 - 0");
    console.log("1 - 1");
    console.log("X - exit");
    console.log("? - help");

    const userSelection = await this.getUserInput();
    if (userSelection === "X") process.exit();
    if (userSelection === "?") {
      HelpTable.displayTable(this.probabilities, this.dice);
      return this.determineFirstMove();
    }

    const y = parseInt(userSelection);
    const result = FairRandomGenerator.calculateResult(x, y, 2);
    console.log(`My selection: ${result} (KEY=${key}).`);
    return result === 1 ? "computer" : "user";
  }

	async play() {
		const firstMove = await this.determineFirstMove();
		const availableDice = [...this.dice.keys()];
	
		if (firstMove === "computer") {
			// Computer chooses first
			const computerDiceIndex = availableDice.splice(
				Math.floor(Math.random() * availableDice.length),
				1
			)[0];
			console.log(
				`I make the first move and choose the [${this.dice[computerDiceIndex].values}] dice.`
			);
			const userDiceIndex = await this.selectDice(availableDice);
			await this.rollDice(computerDiceIndex, userDiceIndex);
		} else {
			// User chooses first
			const userDiceIndex = await this.selectDice(availableDice);
			const computerDiceIndex = availableDice.splice(
				Math.floor(Math.random() * availableDice.length),
				1
			)[0];
			console.log(`I choose the [${this.dice[computerDiceIndex].values}] dice.`);
			await this.rollDice(computerDiceIndex, userDiceIndex);
		}
	}
  async selectDice(availableDice) {
    console.log("Choose your dice:");
    availableDice.forEach((diceIndex, i) => {
      console.log(`${i} - ${this.dice[diceIndex].values}`);
    });
    console.log("X - exit");
    console.log("? - help");

    const userSelection = await this.getUserInput();
    if (userSelection === "X") process.exit();
    if (userSelection === "?") {
      HelpTable.displayTable(this.probabilities, this.dice);
      return this.selectDice(availableDice);
    }

    return availableDice[parseInt(userSelection)];
  }

	async rollDice(computerDiceIndex, userDiceIndex) {
		const computerDice = this.dice[computerDiceIndex];
		const userDice = this.dice[userDiceIndex];
	
		console.log("It's time for my roll.");
		const computerRoll = await this.fairRoll(computerDice.values.length);
		const computerResult = computerDice.roll(computerRoll);
		console.log(`My roll result is ${computerResult}.`);
	
		console.log("It's time for your roll.");
		const userRoll = await this.fairRoll(userDice.values.length);
		const userResult = userDice.roll(userRoll);
		console.log(`Your roll result is ${userResult}.`);
	
		if (userResult > computerResult) {
			console.log(`You win (${userResult} > ${computerResult})!`);
		} else if (userResult < computerResult) {
			console.log(`I win (${computerResult} > ${userResult})!`);
		} else {
			console.log(`It's a tie (${userResult} = ${computerResult})!`);
		}
	}

  async fairRoll(range) {
    const { key, x, hmac } = FairRandomGenerator.generateFairRandom(range);
    console.log(
      `I selected a random value in the range 0..${range - 1} (HMAC=${hmac}).`
    );
    console.log(`Add your number modulo ${range}.`);
    for (let i = 0; i < range; i++) {
      console.log(`${i} - ${i}`);
    }
    console.log("X - exit");
    console.log("? - help");

    const userSelection = await this.getUserInput();
    if (userSelection === "X") process.exit();
    if (userSelection === "?") {
      HelpTable.displayTable(this.probabilities, this.dice);
      return this.fairRoll(range);
    }

    const y = parseInt(userSelection);
    const result = FairRandomGenerator.calculateResult(x, y, range);
    console.log(`My number is ${x} (KEY=${key}).`);
    console.log(
      `The fair number generation result is ${x} + ${y} = ${result} (mod ${range}).`
    );
    return result;
  }

  async getUserInput() {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      readline.question("Your selection: ", (input) => {
        readline.close();
        resolve(input);
      });
    });
  }
}

module.exports = Game;
