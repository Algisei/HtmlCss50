document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const bullets = [];
    let canShoot = true;
    let isMoving = false;
    let shootingInterval;
  
    document.addEventListener('keydown', (event) => {
      const key = event.key;
      const playerPos = player.getBoundingClientRect();
  
      if (key !== ' ' && !isMoving) {
        isMoving = true;
        movePlayer(key);
      }
  
      if (key === ' ' && canShoot) { // Space key
        shootBullet(playerPos);
        shootingInterval = setInterval(() => {
          shootBullet(player.getBoundingClientRect());
        }, 100);
        canShoot = false;
      }
    });
  
    document.addEventListener('keyup', (event) => {
      const key = event.key;
      if (key !== ' ') {
        isMoving = false;
      }
  
      if (key === ' ' && !canShoot) {
        clearInterval(shootingInterval);
        canShoot = true;
      }
    });
  
    function movePlayer(key) {
      const playerPos = player.getBoundingClientRect();
      const step = 10;
  
      if (key === 'ArrowUp' && playerPos.top > 0) {
        player.style.top = playerPos.top - step + 'px';
      } else if (key === 'ArrowDown' && playerPos.bottom < window.innerHeight) {
        player.style.top = playerPos.top + step + 'px';
      } else if (key === 'ArrowLeft' && playerPos.left > 0) {
        player.style.left = playerPos.left - step + 'px';
      } else if (key === 'ArrowRight' && playerPos.right < window.innerWidth) {
        player.style.left = playerPos.left + step + 'px';
      }
  
      if (isMoving) {
        requestAnimationFrame(() => movePlayer(key));
      }
    }
  
    function shootBullet(playerPos) {
      const bullet = document.createElement('div');
      bullet.classList.add('bullet');
      bullet.style.top = playerPos.top + 15 + 'px';
      bullet.style.left = playerPos.right + 'px';
      document.body.appendChild(bullet);
      bullets.push(bullet);
    }
  
    function updateBullets() {
      for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        const bulletPos = bullet.getBoundingClientRect();
        bullet.style.left = bulletPos.left + 5 + 'px';
  
        if (bulletPos.right > window.innerWidth) {
          bullet.remove();
          bullets.splice(i, 1);
        }
      }
    }
  
    function gameLoop() {
      updateBullets();
      requestAnimationFrame(gameLoop);
    }
  
    gameLoop();
  });
  