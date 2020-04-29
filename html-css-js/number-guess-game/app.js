// Game values
let min = 1,
  max = 10,
  guessesLeft = 3,
  winningNum = getRandomNumber(min, max);

// UI Elements
const gameUI = document.getElementById("game"),
  minNumUI = document.querySelector(".min-num"),
  maxNumUI = document.querySelector(".max-num"),
  guessBtnUI = document.querySelector("#guess-btn"),
  guessInputUI = document.querySelector("#guess-input"),
  messageUI = document.querySelector(".message");

// Assign min and max
minNumUI.textContent = min;
maxNumUI.textContent = max;

//Play again event listener
game.addEventListener("mousedown", function(e) {
  if (e.target.classList.contains("play-again")) {
    window.location.reload();
  }
});

//Listen for guess
guessBtnUI.addEventListener("click", function() {
  let guess = parseInt(guessInputUI.value);
  console.log(guess);

  // Validate our input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  //Check if winning num
  if (guess === winningNum) {
    // Game Over - WON
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    //Lose conditions

    // -1 from guess
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // Game Over LOST
      gameOver(false, `${winningNum} was correct number, you lost!`);
    } else {
      //Game Continues - answer wrong
      //Change border color
      guessInputUI.style.borderColor = "red";
      //Clear input
      guessInputUI.value = "";
      if (guessesLeft === 1) {
        setMessage(
          `${guess} is not correct. You have ${guessesLeft} guess left`,
          "red"
        );
      } else {
        setMessage(
          `${guess} is not correct. You have ${guessesLeft} guesses left`,
          "red"
        );
      }
    }
  }
});

function setMessage(errorMessage, color) {
  messageUI.style.color = color;
  messageUI.textContent = errorMessage;
}

function gameOver(won, msg) {
  let colorGame;
  won === true ? (colorGame = "green") : (colorGame = "red");

  // Disable the input
  guessInputUI.disabled = true;
  //Change border color
  guessInputUI.style.borderColor = colorGame;
  // Set message
  setMessage(msg, colorGame);

  //Play Again
  guessBtnUI.value = "Play Again";
  guessBtnUI.className += "play-again";
}

// Random winning number
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
