const player = document.getElementById('player');
let playerX, playerY; // Declare without initial values
let score = 0;
let difficulty = 1;
let isGameOver = false;
let spawnInterval, scoreInterval; // Variables to hold intervals

function setInitialPlayerPosition() {
  playerX = gameArea.offsetWidth / 2 - player.offsetWidth / 2;
  playerY = gameArea.offsetHeight / 2 - player.offsetHeight / 2;
  player.style.left = playerX + 'px';
  player.style.top = playerY + 'px';
}

document.addEventListener('DOMContentLoaded', setInitialPlayerPosition); // Set position on page load

document.addEventListener('keydown', (e) => {
  const speed = 10; // Increased speed for faster movement
  switch (e.key) {
    case 'ArrowLeft':
      playerX = Math.max(0, playerX - speed);
      break;
    case 'ArrowRight':
      playerX = Math.min(gameArea.offsetWidth - player.offsetWidth, playerX + speed);
      break;
    case 'ArrowUp':
      playerY = Math.max(0, playerY - speed);
      break;
    case 'ArrowDown':
      playerY = Math.min(gameArea.offsetHeight - player.offsetHeight, playerY + speed);
      break;
  }
  player.style.left = playerX + 'px';
  player.style.top = playerY + 'px';
});

function createFootball() {
  const football = document.createElement('div');
  football.classList.add('football');
  gameArea.appendChild(football);

  const footballSize = 30; // Fixed size for all footballs
  football.style.width = football.style.height = footballSize + 'px';

  const startPosition = Math.random() * (gameArea.offsetHeight - footballSize);
  football.style.top = startPosition + 'px';

  let footballX = gameArea.offsetWidth;

  function moveFootball() {
    if (isGameOver) {
      football.remove();
      return; // Stop moving if the game is over
    }

    footballX -= 2 + difficulty;
    football.style.left = footballX + 'px';

    if (!isGameOver && footballX < playerX + player.offsetWidth &&
      footballX + football.offsetWidth > playerX &&
      startPosition < playerY + player.offsetHeight &&
      startPosition + football.offsetHeight > playerY) {
      isGameOver = true;
      alert('Game Over! Score: ' + score);
      setTimeout(resetGame, 100); // Add a short delay before resetting
    } else if (footballX > 0) {
      requestAnimationFrame(moveFootball);
    } else {
      football.remove();
    }
  }
  moveFootball();
}

function resetGame() {
  clearInterval(spawnInterval);
  clearInterval(scoreInterval);

  document.querySelectorAll('.football').forEach(football => football.remove());
  score = 0;
  difficulty = 1;
  document.getElementById('score').innerText = score;
  document.getElementById('difficulty').innerText = difficulty; // Update difficulty display
  setInitialPlayerPosition(); // Reset player position
  isGameOver = false;

  startGame(); // Restart game mechanics
}

function updateDifficulty() {
  difficulty += 1;
  document.getElementById('difficulty').innerText = difficulty;
  clearInterval(spawnInterval); // Clear existing interval
  spawnInterval = setInterval(spawnFootball, Math.max(2000 - difficulty * 100, 500)); // Adjust spawn rate based on difficulty
}

setInterval(updateDifficulty, 10000); // Increase difficulty every 10 seconds

function spawnFootball() {
  if (!isGameOver) {
    createFootball();
  }
}

function startGame() {
  spawnInterval = setInterval(spawnFootball, 2000); // Start with a fixed interval
  scoreInterval = setInterval(() => {
    score++;
    document.getElementById('score').innerText = score;
  }, 1000);
}

resetGame(); // Initialize game settings