const Dice = require("./Dice");

class DiceParser {
    static parseDice(args) {
        // Ensure arguments are provided and contain at least 3 configurations
        if (!Array.isArray(args) || args.length < 3) {
            throw new Error("At least 3 dice configurations are required. Example: node index.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3");
        }

        // Parse each dice configuration
        const diceArray = args.map(arg => {
            const values = arg.split(',').map(Number);

            // Check if all values are valid numbers
            if (values.some(isNaN)) {
                throw new Error("All dice values must be integers. Example: 2,2,4,4,9,9");
            }

            // Check if any value is a non-integer
            if (values.some(value => !Number.isInteger(value))) {
                throw new Error("All dice values must be integers. Example: 2,2,4,4,9,9");
            }

            return new Dice(values);
        });

        // Ensure at least one valid dice set was parsed
        if (diceArray.length === 0) {
            throw new Error("No valid dice configurations were provided.");
        }

        // Check if all dice have the same number of values
        const numValues = diceArray[0].values.length;
        if (diceArray.some(dice => dice.values.length !== numValues)) {
            throw new Error("All dice must have the same number of sides. Example: 2,2,4,4,9,9");
        }

        return diceArray;
    }
}

module.exports = DiceParser;
