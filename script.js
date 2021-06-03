const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const score = document.getElementById("score");


let posX = [];
let posY = [];
let nextX = 0;
let nextY = 0;
let snakeLength = 3; 
let live = true;

let fruitX = Math.floor(Math.random() * 19);
let fruitY = Math.floor(Math.random() * 19);

let userScore = 0;

const moves = 20;
const size = canvas.clientWidth/moves;
let speed = 150;
let idRun;
let initialMove = true;

window.onload = function(){
  startSnake();
  document.addEventListener("keydown", keyDownEvent);
  idRun = setInterval(game,speed);

};

function startSnake() {
  
  for(let i=0; i<snakeLength; i++){
    posX.push(i + 10);
    posY.push(10);
  }
}

function drawGame() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  ctx.fillStyle = '#00AA00';
  ctx.strokeStyle = '#00AA00';
  for(let i=0; i<snakeLength; i++){
    if(i===0){
      ctx.strokeRect(posX[i] * size, posY[i] * size, size , size );
    }
    else{
      ctx.fillRect(posX[i] * size, posY[i] * size, size , size );
    }
  }
  ctx.fillStyle = "red";
  ctx.fillRect(fruitX * size , fruitY * size, size, size);
  
}

function moveSnake() {
  
  if(nextX !== 0 || nextY !== 0) {
    initialMove = false;
    for(let i=snakeLength -1 ; i>0; i--){
      posX[i] = posX[i-1];
      posY[i] = posY[i-1];
    }
    posX[0] = posX[0] + nextX;
    posY[0] = posY[0] + nextY;
  }
}

function check(){
  if(posX[0] === fruitX && posY[0] === fruitY){
    fruitX = Math.floor(Math.random() * 19);
    fruitY = Math.floor(Math.random() * 19);
    snakeLength = snakeLength + 1;
    userScore = userScore + 1;
    score.innerHTML = `Score: ${userScore}`;
  }


  if(posX[0] < 0){
    posX[0] = moves;
  }

  if(posX[0] > moves){
    posX[0] = 0;
  }

  if(posY[0] < 0){
    posY[0] = moves;
  }

  if(posY[0] > moves){
    posY[0] = 0;
  }

  for(let i=1; i<snakeLength; i++){
    if(posX[0] === posX[i] && posY[0] == posY[i]){
      live = false;
    }
  }


}

function game() {
  if(live) {
    drawGame();
    moveSnake();
    check();
  }
  else{
    clearInterval(idRun);
  }
}
 

function keyDownEvent(event){

  switch(event.keyCode){
    case 37:
      if(nextX === 0) {
        nextX = -1;
        nextY = 0;
      }
      break;
    case 38:
      if(nextY === 0){
        nextX = 0;
        nextY = -1;
      }
      break;
    case 39:
      if(nextX === 0 && !initialMove ){
        nextX = 1;
        nextY = 0;
      }
      break;
    case 40:
      if(nextY === 0){
        nextX = 0;
        nextY = 1;
      }
        break;
}
}
      