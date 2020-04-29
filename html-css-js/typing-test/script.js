const word = document.getElementById("word");
const textInput = document.getElementById("text");
const score = document.getElementById("score");
const time = document.getElementById("time");
const endGame = document.getElementById("end-game");
const endGameContainer = document.querySelector(".end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

let words = [
  "ability",
  "able",
  "aboard",
  "about",
  "above",
  "accept",
  "accident",
  "according",
  "account",
  "accurate",
  "acres",
  "across",
  "act",
  "action",
  "active",
  "activity",
  "actual",
  "actually",
  "add",
  "addition",
  "additional",
  "adjective",
  "adult",
  "adventure",
  "advice",
  "affect",
  "afraid",
  "after",
  "afternoon",
  "again",
  "against",
  "age",
  "ago",
  "agree",
  "ahead",
  "aid",
  "air",
  "airplane",
  "alike",
  "alive",
];

// Start page with focus on text input
textInput.focus();

// Time Interval
const timeInterval = setInterval(updateTime, 1000);

let randomWord;
let timeLeft = 6;
let levelTime = 0;
let totalScore = 0;
let difficulty =
  localStorage.getItem("difficulty") === null
    ? "medium"
    : localStorage.getItem("difficulty");
console.log(difficulty);

// Set difficulty select value
difficultySelect.value = difficulty;

const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

function addWordToDom() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

addWordToDom();

textInput.addEventListener("input", (event) => {
  const userInput = event.target.value;
  // console.log(userInput);
  if (userInput === randomWord) {
    addWordToDom();
    event.target.value = "";
    totalScore += 1;
    score.innerText = totalScore;

    switch (difficulty) {
      case "easy":
        levelTime = 6;
        break;
      case "medium":
        levelTime = 4;
        break;
      case "hard":
        levelTime = 2;
        break;
    }

    timeLeft += levelTime;
    time.innerText = timeLeft + "s";
  }
});

function updateTime() {
  timeLeft--;
  time.innerText = timeLeft + "s";
  if (timeLeft === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endGame.innerHTML = `
    <h2>Time Out</h2>
    <p> Your score is ${totalScore}</p>
    <button onclick="location.reload()">Restart</button>
  `;

  endGameContainer.style.display = "flex";
  endGame.style.display = "flex";
}

//click to hide settings button
settingsBtn.addEventListener("click", (event) => {
  // if (settings.classList.contains("hide")) {
  //   settings.classList.remove("hide");
  // } else {
  //   settings.classList.add("hide");
  // }

  settings.classList.toggle("hide");
});

settingsForm.addEventListener("change", (event) => {
  difficulty = event.target.value;
  console.log(difficulty);
  localStorage.setItem("difficulty", difficulty);
});
