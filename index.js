const fs = require("fs");
const chalk = require("chalk");
const words = fs
  .readFileSync("./dictionary.txt", { encoding: "utf-8" })
  .split("\n");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const unscramble = (scrambledWord) => {
  let counter = 0;
  let results = [];
  const scrambledLetters = [...scrambledWord];
  const dictionary = words.filter((x) => x.length === scrambledWord.length + 1); // idk why +1

  dictionary.forEach((word) => {
    let containsAllLetters = scrambledLetters.every((letter) =>
      word.includes(letter)
    );

    if (containsAllLetters) results.push(word);
  });

  if (results.length === 0) {
    console.log(chalk.keyword("red")(`No matches found :(`));
    restart();
  } else {
    console.log(chalk.bold.keyword("limegreen")(`Done`));
    results.forEach((result) =>
      console.log(
        chalk.keyword("lightgreen")(`Found potential result: ${result}`)
      )
    );
    console.log(
      chalk.bold.keyword("pink")(`${results.length} potential matches found :D`)
    );
    restart();
  }
};

readline.question(
  chalk.keyword("turquoise")(`What word do you want to unscramble?`),
  (word) => {
    unscramble(word);
    readline.close();
  }
);

function restart() {
  readline.question(
    chalk.keyword("turquoise")(`What word do you want to unscramble next?`),
    (word) => {
      unscramble(word);
      readline.close();
    }
  );
}

// zedroe
// siueoslicl
// anazlryse
