const ball = document.getElementById("ball");
const fire = document.getElementById("fire");
const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
const gameOver = document.getElementById("gameOver");
const finalScoreElement = document.getElementById("finalScore");

let ballPosition = 0;
let firePosition = 800;
let score = 0;
let isGameOver = false;
let hasPassed = false;
let verticalVelocity = 0;
let lives = 3; // Start with 3 lives

const BALL_SPEED = 5;
const FIRE_SPEED = 3;
const BALL_SIZE = 30;
const FIRE_SIZE = 60;
const GRAVITY = 0.5;
const JUMP_FORCE = 15;

function updateGame() {
  if (isGameOver) return;

  verticalVelocity -= GRAVITY;
  ballPosition = Math.max(0, Math.min(370, ballPosition + verticalVelocity));
  ball.style.bottom = ballPosition + "px";

  firePosition -= FIRE_SPEED;
  if (firePosition < -FIRE_SIZE) {
    if (!hasPassed) {
      // Player missed the fire ring
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

  const ballRect = ball.getBoundingClientRect();
  const fireRect = fire.getBoundingClientRect();

  const ballCenter = {
    x: ballRect.left + ballRect.width / 2,
    y: ballRect.top + ballRect.height / 2,
  };
  const fireCenter = {
    x: fireRect.left + fireRect.width / 2,
    y: fireRect.top + fireRect.height / 2,
  };

  const distance = Math.sqrt(
    Math.pow(ballCenter.x - fireCenter.x, 2) +
      Math.pow(ballCenter.y - fireCenter.y, 2)
  );

  if (distance < FIRE_SIZE / 2) {
    if (!hasPassed) {
      score++;
      scoreElement.textContent = `Score: ${score}`;
      hasPassed = true;
    }
  }

  requestAnimationFrame(updateGame);
}

function endGame() {
  isGameOver = true;
  gameOver.style.display = "block";
  finalScoreElement.textContent = score;
}

function restartGame() {
  score = 0;
  lives = 3; // Reset lives
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

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    verticalVelocity = JUMP_FORCE;
  }
});

updateGame();
