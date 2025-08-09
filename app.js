document.addEventListener('DOMContentLoaded', () => {
  const colors = ["red", "blue", "green", "yellow"];
  let gamePattern = [];
  let userPattern = [];
  let level = 0;
  let started = false;
  let highScore = 0;
  let strictMode = false;
  let delay = 800; // delay between steps (will decrease)

  const levelTitle = document.getElementById("level-title");
  const startBtn = document.getElementById("start-btn");
  const strictToggle = document.getElementById("strict-toggle");
  const highScoreDisplay = document.getElementById("high-score");
  const statusText = document.getElementById("status");

  function nextSequence() {
    userPattern = [];
    level++;
    delay = Math.max(300, 800 - level * 30); // Increase speed
    updateUI();

    const randomColor = colors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);
    playSequence();
  }

  function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
      const color = gamePattern[i];
      flashButton(color);
      playSound(color);
      i++;
      if (i >= gamePattern.length) clearInterval(interval);
    }, delay);
  }

  function flashButton(color) {
    const button = document.getElementById(color);
    button.classList.add("pressed");
    setTimeout(() => button.classList.remove("pressed"), 200);
  }

  function playSound(name) {
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
  }

  function checkAnswer(index) {
    if (userPattern[index] !== gamePattern[index]) {
      playSound("wrong");
      levelTitle.textContent = "Game Over!";
      statusText.textContent = "You pressed the wrong button.";

      if (strictMode) {
        startBtn.textContent = "Restart";
        started = false;
        return;
      } else {
        statusText.textContent += " Replaying sequence.";
        setTimeout(playSequence, 1000);
        userPattern = [];
        return;
      }
    }

    if (userPattern.length === gamePattern.length) {
      if (level > highScore) {
        highScore = level;
        highScoreDisplay.textContent = `High Score: ${highScore}`;
      }
      setTimeout(nextSequence, 1000);
    }
  }

  function updateUI() {
    levelTitle.textContent = `Level ${level}`;
    statusText.textContent = "";
  }

  function startGame() {
    level = 0;
    gamePattern = [];
    started = true;
    delay = 800;
    startBtn.textContent = "Restart";
    nextSequence();
  }

  startBtn.addEventListener("click", () => {
    if (!started) {
      startGame();
    } else {
      startGame(); // Restart game
    }
  });

  strictToggle.addEventListener("click", () => {
    strictMode = !strictMode;
    strictToggle.textContent = `Strict Mode: ${strictMode ? "ON" : "OFF"}`;
  });

  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!started) return;

      const color = btn.id;
      userPattern.push(color);
      flashButton(color);
      playSound(color);
      checkAnswer(userPattern.length - 1);
    });
  });
});
