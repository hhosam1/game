// Listing of all the possible colors

const buttonColors = ["red", "blue", "green", "yellow"];

// Game state

let gamePattern = [];         //    Stores the sequence the game generates
let userClickedPattern = [];  // Stores the sequence the user clicks
let level = 0;
let started = false;
let waitingForUser = false;

// dom elements
const levelEl = document.querySelector(".level");
const statusEl = document.querySelector(".status");
const startBtn = document.querySelector(".start-btn");
const colorButtons = document.querySelectorAll(".color");

// Start the game on button click
startBtn.addEventListener("click", startGame);

function startGame() {
  // preventing starting again if already started
  if (started) return;

  // reset game state
  started = true;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  statusEl.textContent = "Watch the pattern...";
  levelEl.textContent = "Level 0";

  // Starting with the first sequence
  setTimeout(() => {
    nextSequence();
  }, 500);
}

function nextSequence() {
  // Reseting user input for new level
  userClickedPattern = [];
  level++;
  levelEl.textContent = `Level ${level}`;
  statusEl.textContent = "Watch the pattern...";

  // it willGenerate a random color and add it to the sequence
  const randomColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);

  // showing  sequence to user
  playSequence();
}

function playSequence() {
  let delay = 0;
  waitingForUser = false;

  // Animate each color in the sequence with a delay
  gamePattern.forEach((color) => {
    setTimeout(() => {
      animatePress(color);
    }, delay);
    delay += 600;
  });

  // After showing the full sequence, wait for user input
  setTimeout(() => {
    waitingForUser = true;
    statusEl.textContent = "Your turn!";
  }, delay);
}

function animatePress(color) {
  const button = document.querySelector(`.color.${color}`);
  button.classList.add("active");
  setTimeout(() => button.classList.remove("active"), 300);
}

// Handle user clicks on color buttons

colorButtons.forEach(button => {
  button.addEventListener("click", function () {


    // Ignore clicks if it's not user's turn or game hasn't started
    if (!waitingForUser || !started) return;

    // Get the clicked color from its class
    const userColor = this.classList[1];
    userClickedPattern.push(userColor);
    animatePress(userColor);



    // Check the current step of the pattern
    const currentStep = userClickedPattern.length - 1;

    // If user clicked the wrong color
    if (userColor !== gamePattern[currentStep]) {
      gameOver();
      return;
    }

    // If user completed the current level correctly
    if (userClickedPattern.length === gamePattern.length) {
      waitingForUser = false;
      statusEl.textContent = "Correct!";
      setTimeout(() => nextSequence(), 1000);
    }
  });
});

function gameOver() {
  // Display game over message and reset state

  statusEl.textContent = "Game Over! Click Start to try again.";
  levelEl.textContent = "Level 0";
  started = false;
  waitingForUser = false;
  gamePattern = [];
  userClickedPattern = [];
}
