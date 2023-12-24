const player = document.getElementById('player');
let playerX = 250, playerY = 150;
let score = 0;
let difficulty = 1;

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
      footballX -= 2 + difficulty; // Increase speed based on difficulty
      football.style.left = footballX + 'px';

      if (footballX < playerX + player.offsetWidth &&
          footballX + football.offsetWidth > playerX &&
          startPosition < playerY + player.offsetHeight &&
          startPosition + football.offsetHeight > playerY) {
          alert('Game Over! Score: ' + score);
          resetGame();
      }

      if (footballX > 0) {
          requestAnimationFrame(moveFootball);
      } else {
          football.remove();
      }
  }
  moveFootball();
}

function resetGame() {
  document.querySelectorAll('.football').forEach(football => football.remove());
  score = 0;
  document.getElementById('score').innerText = score;
  playerX = gameArea.offsetWidth / 2 - player.offsetWidth / 2;
  playerY = gameArea.offsetHeight / 2 - player.offsetHeight / 2;
  player.style.left = playerX + 'px';
  player.style.top = playerY + 'px';
}

function updateDifficulty() {
  difficulty += 1; // Increase difficulty by whole numbers
  document.getElementById('difficulty').innerText = difficulty;
}

setInterval(updateDifficulty, 10000); // Increase difficulty every 10 seconds

function spawnFootball() {
  createFootball();
  setTimeout(spawnFootball, Math.max(2000 - difficulty * 100, 500)); // Adjust spawn rate based on difficulty
}
spawnFootball();

setInterval(() => {
  score++;
  document.getElementById('score').innerText = score;
}, 1000); // Increment score every second

resetGame(); // Initialize game settings