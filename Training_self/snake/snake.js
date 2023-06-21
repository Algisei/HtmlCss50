document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const gameContainer = document.getElementById('game-container');
    const scoreText = document.getElementById('score-text');

    let snakeDots = [{ top: 180, left: 200 }, { top: 180, left: 180 }];
    let direction = 'right';
    let foodDot = null;
    let score = 0;
    let isCollisionChecked = false;
    let isGameOver = false;
    let isGameStarted = false;

    const snakeDotClass = 'snake-dot';
    const foodDotClass = 'food-dot';

    function createDot(dotClass, top, left) {
        const dot = document.createElement('div');
        dot.className = dotClass;
        dot.style.top = top + 'px';
        dot.style.left = left + 'px';
    
        if (dotClass === foodDotClass) {
            dot.style.border = '1px solid white';
        }
    
        gameBoard.appendChild(dot);
        return dot;
    }
    

    function drawSnake() {
        const snakeLength = snakeDots.length;
        for (let i = 0; i < snakeLength; i++) {
            const dot = snakeDots[i];
            const snakeDot = document.getElementsByClassName(snakeDotClass)[i];
            if (snakeDot) {
                snakeDot.style.top = dot.top + 'px';
                snakeDot.style.left = dot.left + 'px';
            } else {
                createDot(snakeDotClass, dot.top, dot.left);
            }
        }
    }


    function getRandomIndex(probabilities) {
        const rand = Math.random();
        let cumulativeProbability = 0;
        for (let i = 0; i < probabilities.length; i++) {
            cumulativeProbability += probabilities[i];
            if (rand <= cumulativeProbability) {
                return i;
            }
        }
        return probabilities.length - 1;
    }
    
    
    function drawFood() {
        if (!foodDot) {
            const top = Math.floor(Math.random() * 20) * 20;
            const left = Math.floor(Math.random() * 20) * 20;
            const colors = ['red', 'yellow', 'blue', 'purple', 'magenta'];
            const scores = [5, 10, 20, 50, 100];
            const probabilities = [0.70, 0.5, 0.25, 0.05, 0.01];
            const randomIndex = getRandomIndex(probabilities);
            const color = colors[randomIndex];
            const score = scores[randomIndex];
            foodDot = createDot(foodDotClass, top, left);
            foodDot.style.backgroundColor = color;
            foodDot.dataset.score = score;
        } else {
            const top = parseInt(foodDot.style.top);
            const left = parseInt(foodDot.style.left);
            foodDot.style.top = top + 'px';
            foodDot.style.left = left + 'px';
        }
    }
    function stopSongs() {
        const sounds = ['start-sound', 'death-sound'];
    
        sounds.forEach(sound => {
            const song = document.getElementById(sound);
    
            song.pause();
            song.currentTime = 0;
        });
    }

    function moveSnake() {
        const startSound = document.getElementById('start-sound');
        if (isGameOver) {
            return;
        }
        if (!isGameStarted) {
            startSound.play();
            isGameStarted = true;
        }
        const head = { top: snakeDots[0].top, left: snakeDots[0].left };
    
        if (direction === 'right') {
            head.left += 20;
        } else if (direction === 'left') {
            head.left -= 20;
        } else if (direction === 'up') {
            head.top -= 20;
        } else if (direction === 'down') {
            head.top += 20;
        }
    
        snakeDots.unshift(head);
        if (foodDot && head.top === parseInt(foodDot.style.top) && head.left === parseInt(foodDot.style.left)) {
            stopSongs();
            startSound.play();
            const foodScore = parseInt(foodDot.dataset.score);
            foodDot.remove();
            foodDot = null;
            score = score + foodScore;
            scoreText.textContent = `Score: ${score}`
        } else {
            snakeDots.pop();
        }
        
    
        checkCollision();
    }

    function changeDirection(event) {
        if (event.keyCode === 37 && direction !== 'right') {
            direction = 'left';
        } else if (event.keyCode === 38 && direction !== 'down') {
            direction = 'up';
        } else if (event.keyCode === 39 && direction !== 'left') {
            direction = 'right';
        } else if (event.keyCode === 40 && direction !== 'up') {
            direction = 'down';
        }
    }

    function gameOver() {
        isGameOver = true;
    clearInterval(gameInterval);
    stopSongs();
    const deathSound = document.getElementById('death-sound');
    deathSound.play();
        alert(`Game over! Your score: ${score}`);
    }
    
    
    function centerCamera() {
        const head = snakeDots[0];
        const gameContainerWidth = gameContainer.offsetWidth;
        const gameContainerHeight = gameContainer.offsetHeight;
        const gameBoardWidth = gameBoard.offsetWidth;
        const gameBoardHeight = gameBoard.offsetHeight;

        const leftOffset = Math.max(0, head.left - gameContainerWidth / 2);
        const topOffset = Math.max(0, head.top - gameContainerHeight / 2);

        const maxLeftOffset = gameBoardWidth - gameContainerWidth;
        const maxTopOffset = gameBoardHeight - gameContainerHeight;

        gameContainer.scrollLeft = Math.min(leftOffset, maxLeftOffset);
        gameContainer.scrollTop = Math.min(topOffset, maxTopOffset);
    }


    function checkCollision() {
        if (isCollisionChecked) {
            isCollisionChecked = false;
            return;
        }
    
        const head = snakeDots[0];
        if (
            head.left < 0 ||
            head.left >= gameBoard.offsetWidth ||
            head.top < 0 ||
            head.top >= gameBoard.offsetHeight ||
            snakeDots.slice(1).some(dot => dot.top === head.top && dot.left === head.left)
        ) {
            gameOver();
        }
        isCollisionChecked = true;
    }
    document.addEventListener('keydown', changeDirection);

    let gameInterval = setInterval(() => {
        moveSnake();
        drawSnake();
        checkCollision();
        drawFood();
        centerCamera();
        scoreText.textContent = `Score: ${score}`; // Обновление текста счета
    }, 200);
    
});
