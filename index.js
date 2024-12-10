const readline = require("readline");

// Tạo giao diện dòng lệnh
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askDifficulty(secretNumber) {
  rl.question(
    "\nEnter your choice (1: Easy, 2: Medium, 3: Hard, or type 'exit' to quit): ",
    (choice) => {
      if (choice === "1") {
        console.log(
          "\nGreat! You have selected the Easy difficulty level.\nLet's start the game!\n"
        );
        askForGuess(secretNumber, 10, startGame);
      } else if (choice === "2") {
        console.log(
          "\nGreat! You have selected the Medium difficulty level.\nLet's start the game!\n"
        );
        askForGuess(secretNumber, 5, startGame);
      } else if (choice === "3") {
        console.log(
          "\nGreat! You have selected the Hard difficulty level.\nLet's start the game!\n"
        );
        askForGuess(secretNumber, 3, startGame);
      } else if (choice.toLowerCase() === "exit") {
        console.log("\nExiting the game. Goodbye!");
        rl.close();
      } else {
        console.log("\nInvalid choice. Please try again.\n");
        askDifficulty(secretNumber); // Quay lại câu hỏi mà không gọi lại toàn bộ startGame
      }
    }
  );
}

function askForGuess(secretNumber, chancesLeft, callback) {
  if (chancesLeft === 0) {
    console.log(`\nGame over! The correct number was ${secretNumber}.\n`);
    callback();
    return;
  }

  rl.question(
    `You have ${chancesLeft} chance(s) left. Enter your guess: `,
    (guess) => {
      guess = parseInt(guess);

      if (guess === secretNumber) {
        console.log(
          `\nCongratulations! You guessed the correct number: ${secretNumber}\n`
        );
        callback();
      } else if (guess < secretNumber) {
        console.log("The number is greater than your guess.\n");
        askForGuess(secretNumber, chancesLeft - 1, callback);
      } else {
        console.log("The number is less than your guess.\n");
        askForGuess(secretNumber, chancesLeft - 1, callback);
      }
    }
  );
}

function startGame() {
  const secretNumber = Math.floor(Math.random() * 100) + 1;

  console.log(
    "Welcome to the Number Guessing Game!\nI'm thinking of a number between 1 and 100.\n" +
      "Please select the difficulty level:\n1. Easy (10 chances)\n2. Medium (5 chances)\n3. Hard (3 chances)\nType 'exit' to quit the game.\n"
  );

  askDifficulty(secretNumber); // Đặt câu hỏi về độ khó
}

// Bắt đầu trò chơi
startGame();
