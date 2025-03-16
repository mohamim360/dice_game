class HelpTable {
  static displayTable(probabilities, dice) {
    console.log("\nHelp Table:");
    console.log("Dice\t" + dice.map((d, i) => `D${i}`).join("\t"));
    probabilities.forEach((row, i) => {
      console.log(`D${i}\t` + row.map(p => p.toFixed(2)).join("\t"));
    });
    console.log("\n");
  }
}

module.exports = HelpTable;