const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const size = 10;
const grid = canvas.width / size;

let snake, dir, food, score, loop, lock;

// swipe tracking
let startX = 0;
let startY = 0;

function init() {
  snake = [{ x: 20, y: 20 }];
  dir = "RIGHT";
  food = randomFood();
  score = 0;
  lock = false;

  document.getElementById("score").innerText = score;

  clearInterval(loop);
  loop = setInterval(update, 80);
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * grid),
    y: Math.floor(Math.random() * grid)
  };
}

/* =========================
   TOUCH + MOUSE CONTROL
   ========================= */

function handleStart(x, y) {
  startX = x;
  startY = y;
}

function handleEnd(x, y) {
  let dx = x - startX;
  let dy = y - startY;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 20) setDir("RIGHT");
    else if (dx < -20) setDir("LEFT");
  } else {
    if (dy > 20) setDir("DOWN");
    else if (dy < -20) setDir("UP");
  }
}

// TOUCH
canvas.addEventListener("touchstart", (e) => {
  let t = e.touches[0];
  handleStart(t.clientX, t.clientY);
});

canvas.addEventListener("touchend", (e) => {
  let t = e.changedTouches[0];
  handleEnd(t.clientX, t.clientY);
});

// MOUSE
canvas.addEventListener("mousedown", (e) => {
  handleStart(e.clientX, e.clientY);
});

canvas.addEventListener("mouseup", (e) => {
  handleEnd(e.clientX, e.clientY);
});

/* =========================
   GAME LOGIC
   ========================= */

function setDir(d) {
  if (lock) return;
  lock = true;

  if (d === "UP" && dir !== "DOWN") dir = "UP";
  else if (d === "DOWN" && dir !== "UP") dir = "DOWN";
  else if (d === "LEFT" && dir !== "RIGHT") dir = "LEFT";
  else if (d === "RIGHT" && dir !== "LEFT") dir = "RIGHT";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") setDir("UP");
  if (e.key === "ArrowDown") setDir("DOWN");
  if (e.key === "ArrowLeft") setDir("LEFT");
  if (e.key === "ArrowRight") setDir("RIGHT");
});

function update() {
  let head = { ...snake[0] };

  if (dir === "UP") head.y--;
  if (dir === "DOWN") head.y++;
  if (dir === "LEFT") head.x--;
  if (dir === "RIGHT") head.x++;

  // wall crash
  if (head.x < 0 || head.y < 0 || head.x >= grid || head.y >= grid) {
    return gameOver();
  }

  // self crash
  for (let s of snake) {
    if (s.x === head.x && s.y === head.y) return gameOver();
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = score;
    food = randomFood();
  } else {
    snake.pop();
  }

  draw();
  lock = false;
}

function draw() {
  ctx.fillStyle = "#0b1220";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // food glow
  ctx.fillStyle = "#f43f5e";
  ctx.shadowBlur = 12;
  ctx.shadowColor = "#f43f5e";
  ctx.fillRect(food.x * size, food.y * size, size, size);

  // snake
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#22c55e";

  for (let s of snake) {
    ctx.fillRect(s.x * size, s.y * size, size, size);
  }
}

function gameOver() {
  clearInterval(loop);
  alert("Game Over 💀 Score: " + score);
}

function restartGame() {
  init();
}

init();