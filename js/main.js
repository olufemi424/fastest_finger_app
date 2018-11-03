window.addEventListener("load", init);

const levels = {
  easy: 5,
  medium: 3,
  hard: 2
};

let currentLevel = 0;
//Global
let time = currentLevel;
let score = 0;
let isPlaying;

const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const gamelevel = document.querySelector("#gameLevel");

const words = [
  "nutrition",
  "if",
  "they",
  "me",
  "what",
  "who",
  "why",
  "testing",
  "game",
  "show",
  "this",
  "calhougn",
  "lampard",
  "wilson",
  "james"
];

// init game
function init() {
  //show number of seconds in UI
  gamelevel.addEventListener("option", levelChange);
  //load word from array
  showWord(words);
  //start matching on word input
  wordInput.addEventListener("input", startMatch);
  //call countdown every second
  setInterval(countdown, 1000);
  //check game status
  setInterval(checkStaus, 50);
}

//pick and show random words
function showWord(words) {
  const randIndex = Math.floor(Math.random() * words.length);
  currentWord.innerHTML = words[randIndex];
}

//start match function

function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = "";
    score++;
  }
  //if score is -1 display zero
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

//match words function
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

//seconds coundown function
function countdown() {
  //check if time is 0 to end game
  if (time > 0) {
    //decreat time by 1
    time--;
  } else if (time === 0) {
    isPlaying = false;
  }

  //showtime
  timeDisplay.innerHTML = time;
}

//check game status
function checkStaus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = '<div class="text-danger">Game Over<div/>';

    score = -1;
  }
}

//select option to choose level
function levelChange() {
  if (gamelevel.value === "hard") {
    currentLevel = levels.hard;
    seconds.innerHTML = currentLevel;
  } else if (gamelevel.value === "medium") {
    currentLevel = levels.medium;
    seconds.innerHTML = currentLevel;
  } else {
    gamelevel.value = "easy";
    currentLevel = levels.easy;
    seconds.innerHTML = currentLevel;
  }
  return currentLevel;
}
