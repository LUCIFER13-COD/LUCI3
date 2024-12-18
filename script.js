let player = document.getElementById('player');
let coins = document.querySelectorAll('.coin');
let ground = document.getElementById('ground');
let gameContainer = document.getElementById('game-container');

let playerSpeed = 5;
let gravity = 0.5;
let jumpPower = 10;
let isJumping = false;
let isFalling = false;
let jumpHeight = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    movePlayer(1);
  }
  if (e.key === 'ArrowLeft') {
    movePlayer(-1);
  }
  if (e.key === ' ' && !isJumping) {
    jump();
  }
});

function movePlayer(direction) {
  let currentLeft = parseInt(window.getComputedStyle(player).left);
  if (currentLeft + direction * playerSpeed >= 0 && currentLeft + direction * playerSpeed <= gameContainer.offsetWidth - player.offsetWidth) {
    player.style.left = currentLeft + direction * playerSpeed + 'px';
  }
}

function jump() {
  isJumping = true;
  jumpHeight = jumpPower;
  let jumpInterval = setInterval(() => {
    if (jumpHeight > 0) {
      player.style.bottom = parseInt(window.getComputedStyle(player).bottom) + jumpHeight + 'px';
      jumpHeight -= gravity;
    } else {
      clearInterval(jumpInterval);
      fall();
    }
  }, 16);
}

function fall() {
  isFalling = true;
  let fallInterval = setInterval(() => {
    let currentBottom = parseInt(window.getComputedStyle(player).bottom);
    if (currentBottom > 50) {
      player.style.bottom = currentBottom - gravity + 'px';
    } else {
      clearInterval(fallInterval);
      isJumping = false;
      isFalling = false;
    }
  }, 16);
}

function collectCoins() {
  coins.forEach((coin) => {
    let coinRect = coin.getBoundingClientRect();
    let playerRect = player.getBoundingClientRect();

    if (
      playerRect.left < coinRect.left + coinRect.width &&
      playerRect.left + playerRect.width > coinRect.left &&
      playerRect.top < coinRect.top + coinRect.height &&
      playerRect.top + playerRect.height > coinRect.top
    ) {
      coin.remove();
      alert("Coin Collected!");
    }
  });
}

function gameLoop() {
  collectCoins();
  requestAnimationFrame(gameLoop);
}

gameLoop();
