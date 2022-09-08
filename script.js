// Global variables
const choices = ["rock", "paper", "scissors"];
let winners = [];

function showGameField() {
  document.querySelector(".player").style.display = "flex";
  document.querySelector(".computer").style.display = "flex";
  document.querySelector(".instruction").style.display = "none";
  document.querySelector(".start").style.display = "none";
  document.querySelector(".gameTop").style.display = "flex";

  startGame();
}

function resetGame() {
  winners = [];
  document.querySelector(".reset").style.display = "none";
  document.querySelector(".top").textContent = "Win 5 Rounds!";
  document.querySelector(".gamePlay").style.display = "none";
  document.querySelector("#playerWins").textContent = "";
  document.querySelector("#computerWins").textContent = "";
  document.querySelector("#ties").textContent = "";
  document.querySelector(".winnerDisplay").textContent = "";
}

function startGame() {
  winners = [];
  //   New round starts when player selects a move
  let playerMoves = document.getElementsByName("move");
  playerMoves.forEach((move) =>
    move.addEventListener("click", () => {
      if (move.className) {
        // remove displayed image from previous move

        // display new selected move image
        document.getElementById(
          "playerSelect"
        ).innerHTML = `<img src='images/${move.className}.png' alt="${move.className}"/>`;

        console.log(`Player: ${move.className}`);
        playRound(move.className);
      }
    })
  );
}

function playRound(playerChoice) {
  let numOfWins = checkWins();
  if (numOfWins >= 5) {
    return;
  }

  // reset computer choice for each round
  const computerChoice = computerSelect();

  // Display player and computer's choice
  displayChoice();

  const winner = checkWinner(playerChoice, computerChoice);
  winners.push(winner);
  countWins();
  displayRound(playerChoice, computerChoice, winner);

  //  count and log wins
  wins = checkWins();
  if (wins == 5) {
    displayEnd();
  }
}

function computerSelect() {
  const choice = choices[Math.floor(Math.random() * choices.length)];
  console.log(`Computer: ${choice}`);

  // Display computer's choice, and then remove it after 1s
  let move = document.querySelector(`.computer${choice}`);

  move.style.backgroundColor = "rgba(255, 255, 255, 1)";
  setTimeout(() => {
    move.style.backgroundColor = "rgba(255, 255, 255, 0)";
  }, 400);

  // Display computre's chocie in game field
  document.getElementById(
    "computerSelect"
  ).innerHTML = `<img src='images/${choice}.png' alt="${choice}"/>`;
  return choice;
}

function displayEnd() {
  let playerWins = winners.filter((winner) => winner == "Player").length;

  //   Display final winneer
  if (playerWins == 5) {
    console.log(`You won 5 games, goob job!`);
    document.querySelector(".top").textContent = "Congrats, You Won!";
    document.querySelector(".winnerDisplay").textContent =
      "Goob job! Ready for another round?";
  } else {
    console.log("Oops, the computer beat you.");
    document.querySelector(".top").textContent = "You Lose...";
    document.querySelector(".winnerDisplay").textContent =
      "Better luck next time.";
  }

  //  Display button with text "Play Again"
  let restartButton = document.querySelector(".reset");
  restartButton.style.display = "inline";
  restartButton.textContent = "Play Again";

  restartButton.addEventListener("click", () => {
    resetGame();
  });
}

function displayChoice() {
  document.querySelector(".gamePlay").style.display = "flex";
  document.querySelector(".result").style.display = "flex";
}

function displayRound(playerChoice, computerChoice, winner) {
  // change image to match player and computer's moves

  // chage move text
  document.querySelector("#playerThisRound").textContent = `${
    playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
  }`;
  document.querySelector("#computerThisRound").textContent = `${
    computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
  }`;
}

function checkWins() {
  const pWinCount = winners.filter((item) => item == "Player").length;
  const cWinCount = winners.filter((item) => item == "Computer").length;
  return Math.max(pWinCount, cWinCount);
}

function countWins() {
  const pWinCount = winners.filter((winner) => winner == "Player").length;
  const cWinCount = winners.filter((winner) => winner == "Computer").length;
  const ties = winners.filter((winner) => winner == "Tie").length;
  document.querySelector(
    "#playerWins"
  ).textContent = `[Player: ${pWinCount} wins]`;
  document.querySelector(
    "#computerWins"
  ).textContent = `[Computer: ${cWinCount} wins]`;
  document.querySelector("#ties").textContent = `[Tie: ${ties}]`;
}

function checkWinner(choiceP, choiceC) {
  if (
    (choiceP == "rock" && choiceC == "scissors") ||
    (choiceP == "scissors" && choiceC == "paper") ||
    (choiceP == "paper" && choiceC == "rock")
  ) {
    console.log("PLAYER");
    return "Player";
  } else if (choiceP == choiceC) {
    console.log("TIE");
    return "Tie";
  } else {
    console.log("COMPUTER");
    return "Computer";
  }
}
