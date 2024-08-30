const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
let snake;
let food;
let score;
let gameInterval;

function init() {
    canvas.width = 400;
    canvas.height = 400;
    snake = [];
    snake[0] = { x: 10 * scale, y: 10 * scale };
    food = generateFood();
    score = 0;
    document.getElementById('score').innerText = 'Score: ' + score;
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
    document.addEventListener('keydown', changeDirection);
}

function gameLoop() {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    checkCollision();
    checkFoodCollision();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, scale, scale);
    });
}

function moveSnake() {
    const head = { ...snake[0] };
    switch (direction) {
        case 'RIGHT':
            head.x += scale;
            break;
        case 'LEFT':
            head.x -= scale;
            break;
        case 'UP':
            head.y -= scale;
            break;
        case 'DOWN':
            head.y += scale;
            break;
    }

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('score').innerText = 'Score: ' + score;
        food = generateFood();
    } else {
        snake.pop();
    }
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, scale, scale);
}

function generateFood() {
    return {
        x: Math.floor(Math.random() * columns) * scale,
        y: Math.floor(Math.random() * rows) * scale
    };
}

function changeDirection(event) {
    switch (event.keyCode) {
        case 37:
            if (direction !== 'RIGHT') direction = 'LEFT';
            break;
        case 38:
            if (direction !== 'DOWN') direction = 'UP';
            break;
        case 39:
            if (direction !== 'LEFT') direction = 'RIGHT';
            break;
        case 40:
            if (direction !== 'UP') direction = 'DOWN';
            break;
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        endGame();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}

function checkFoodCollision() {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('score').innerText = 'Score: ' + score;
        food = generateFood();
    }
}

function endGame() {
    clearInterval(gameInterval);
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over!', canvas.width / 4, canvas.height / 2);
}

document.getElementById('startButton').addEventListener('click', init);

let direction = 'RIGHT';
