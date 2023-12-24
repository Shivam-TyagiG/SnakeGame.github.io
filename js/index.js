// Game Constant & Variable
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");
let speed = 5;
let score = 0;
let lastPainTime = 0;
let snakeArr = [{ x: 13, y: 15 }];

food = { x: 6, y: 9 };

// Game functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPainTime)/1000 < 1 / speed) {
    return;
  }
  lastPainTime = ctime;
  gameEngine();
}

function isCollide(arr){
  for (let i=1; i<snakeArr.length-1; i++){
    if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
      return true;
    }
  }

  // if you bump into wall
  if(snakeArr[0].x>=18 || snakeArr[0].x <= 0){
    return true;
  }
  if(snakeArr[0].y>=18 || snakeArr[0].y <= 0){
    return true;
  }
}

function gameEngine() {
  // Part 1: Updating the snake array & food
  if(isCollide(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    inputDir = {x:0, y:0};
    alert("Game over.Press any key to play again");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
    updateScoreDisplay();

  }

//   if you have eaten the food increment the food and regenrate the food
  if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    foodSound.play();
    score += 1;
    if(score > HighScoreval){
      HighScoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(HighScoreval));
      hiscoreBox.innerHTML = "HighScore: " + HighScoreval;
    }
    scoreBox.innerHTML = "Score: " + score; 
    snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
    let a = 2;
    let b = 16;
    food = {x: Math.round(a+ (b-a)*Math.random()), y: Math.round(a+ (b-a)*Math.random())};
  }

//   Moving the snake 
  for(let i=snakeArr.length - 2; i>=0; i--){
    snakeArr[i+1] = {...snakeArr[i]};
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Wrapping around the screen
  // if (snakeArr[0].x > 17) snakeArr[0].x -= 18;
  // else if (snakeArr[0].x < 0) snakeArr[0].x += 18;
  // if (snakeArr[0].y > 17) snakeArr[0].y -= 18;
  // else if (snakeArr[0].y < 0) snakeArr[0].y += 18;
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // drawSnake(ctx, snakeArr);
  // drawFood(ctx, food);
  // drawScore(score);
  



  // Part 2: Display the snake and food
  // Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index == 0) {
      snakeElement.classList.add("head");
    } else snakeElement.classList.add("snake");
    board.appendChild(snakeElement);
  });
  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// main logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
  HighScoreval = 0;
  localStorage.getItem("hiscore", JSON.stringify(HighScoreval));
}
else{
  HighScoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HighScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.y = -1;
      inputDir.x = 0;
      break;
    case "ArrowDown":
      inputDir.y = 1;
      inputDir.x = 0
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
        break;
  }
});
