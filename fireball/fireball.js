let ball = document.getElementById("ball");
let fire = document.getElementById("fire");
let scoreElement = document.getElementById("score");
let livesElement = document.getElementById("lives");
let gameOver = document.getElementById("gameOver");
let finalScoreElement = document.getElementById("finalScore");

let ballPosition = 0;
let firePosition = 800;
let score = 0;
let isGameOver = false;
let hasPassed = false;
let verticalVelocity = 0;
let lives = 3;
const GRAVITY = 0.5;
const JUMP_FORCE = 15;
const FIRE_SPEED = 3;

function updateGame() {
  if (isGameOver) return;

  verticalVelocity -= GRAVITY;
  ballPosition = Math.max(0, Math.min(370, ballPosition + verticalVelocity));
  ball.style.bottom = ballPosition + "px";

  firePosition -= FIRE_SPEED;
  if (firePosition < -60) {
    if (!hasPassed) {
      lives--;
      livesElement.textContent = `Lives: ${lives}`;
      if (lives === 0) {
        endGame();
        return;
      }
    }
    firePosition = 800;
    hasPassed = false;
  }
  fire.style.right = 800 - firePosition + "px";

  checkCollision();

  requestAnimationFrame(updateGame);
}

function checkCollision() {
  let ballRect = ball.getBoundingClientRect();
  let fireRect = fire.getBoundingClientRect();

  if (
    ballRect.left < fireRect.right &&
    ballRect.right > fireRect.left &&
    ballRect.top < fireRect.bottom &&
    ballRect.bottom > fireRect.top
  ) {
    if (!hasPassed) {
      score++;
      scoreElement.textContent = `Score: ${score}`;
      hasPassed = true;
    }
  }
}

function endGame() {
  isGameOver = true;
  gameOver.style.display = "block";
  finalScoreElement.textContent = score;
}

function restartGame() {
  score = 0;
  lives = 3;
  isGameOver = false;
  hasPassed = false;
  ballPosition = 0;
  verticalVelocity = 0;
  firePosition = 800;
  scoreElement.textContent = "Score: 0";
  livesElement.textContent = "Lives: 3";
  gameOver.style.display = "none";
  ball.style.bottom = "0px";
  fire.style.right = "0px";
  updateGame();
}

document.getElementById("instructionsButton").addEventListener("click", () => {
  document.getElementById("welcomeContainer").style.display = "none";
  document.getElementById("instructionsContainer").style.display = "block";
});

document.getElementById("backButton").addEventListener("click", () => {
  document.getElementById("instructionsContainer").style.display = "none";
  document.getElementById("welcomeContainer").style.display = "block";
});

document.getElementById("startGameButton").addEventListener("click", () => {
  document.getElementById("welcomeContainer").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";
  document.getElementById("jumpButton").style.display = "block";
  updateGame();
});

document.getElementById("jumpButton").addEventListener("click", () => {
  verticalVelocity = JUMP_FORCE;
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    verticalVelocity = JUMP_FORCE;
  }
});
