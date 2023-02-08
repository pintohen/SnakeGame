class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const repsInASecond = 7;
const millisInSecond = 1000;
const scoreParameter = document.getElementById('score');

let score = 0;
let colors = ['blue', 'green', 'yellow', 'purple', 'pink', 'brown', 'cyan', 'white'];

let tileCount=20;
let tileSize=18;

let apple = {x: 5, y: 5};

let head = {x: 10, y: 10};


let snakeSpeed = {
    x: Math.random() < 0.5 ? 1 : -1,
    y: 0
};

const snakeParts = [];
let tailLength = 0;

function drawGame(){
    

    changeSnakePosition();

    if(gameOver()){
        return;
    }

    clearScreen();
    drawSnake();
    drawApple();

    checkCollision();
    drawScore();
    setTimeout(drawGame, millisInSecond/repsInASecond);
}

function drawScore(){
    scoreParameter.innerHTML = "Score: " + score;
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function drawSnake(){
    

    for(i=0 ; i < snakeParts.length ; i++){
        ctx.fillStyle = colors[i % colors.length];
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
        
    }
    snakeParts.push(new SnakePart(head.x, head.y));
    if(snakeParts.length>tailLength){
        snakeParts.shift();//remove furthest item from  snake part if we have more than our tail size
    }
    ctx.fillStyle="orange";
    ctx.fillRect(head.x * tileCount, head.y * tileCount, tileSize, tileSize)
}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x * tileCount, apple.y * tileCount, tileSize, tileSize);
}

function changeSnakePosition(){
    head.x += snakeSpeed.x;
    head.y += snakeSpeed.y;
}


document.body.addEventListener('keydown', 
    (event) => {
        
            if(event.key === 'ArrowUp'){//up
                if(snakeSpeed.y === 1)
                    return; //prevent snake from going backwards
                snakeSpeed.x = 0;
                snakeSpeed.y = -1;
            }

            if (event.key === 'ArrowDown'){ //down
                if(snakeSpeed.y === -1)
                    return; //prevent snake from going backwards
                snakeSpeed.x = 0;
                snakeSpeed.y = 1;
            }

            if(event.key === 'ArrowLeft'){ //left
                if(snakeSpeed.x === 1)
                    return; //prevent snake from going backwards
                snakeSpeed.x = -1;
                snakeSpeed.y = 0;
            }

            if (event.key === 'ArrowRight'){ //right
                if(snakeSpeed.x === -1)
                    return; //prevent snake from going backwards
                snakeSpeed.x = 1;
                snakeSpeed.y = 0;
            }

        }
);

function checkCollision(){
    if(apple.x==head.x && apple.y==head.y){
        apple.x = Math.floor(Math.random()*tileCount);
        apple.y = Math.floor(Math.random()*tileCount);
        score++;
        tailLength++;
    }
}

function gameOver(){
    let dead = false;

    if(head.x < 0 || head.x > tileCount || head.y < 0 || head.y > tileCount){
        dead = true;
    }

    for(i=0 ; i < snakeParts.length ; i++){
        if(snakeParts[i].x == head.x && snakeParts[i].y == head.y){
            dead = true;
            break;
        }
    }

    if(dead){
        ctx.fillStyle = 'white';
        ctx.font = '50px Segoe UI';
        ctx.fillText('Game Over', canvas.clientWidth/6.5, canvas.clientHeight/2);
        ctx.font = '20px Segoe UI';
        ctx.fillText('Press ENTER to play again', canvas.clientWidth/6.5, canvas.clientHeight/2 + 50);
    }

    return dead;
}

function startGame(){
    clearScreen();

    ctx.fillStyle = 'white';
    ctx.font = '30px Segoe UI';
    ctx.fillText('Press ENTER to start', canvas.clientWidth/6.5, canvas.clientHeight/2);
}

document.body.addEventListener('keydown',
    (event) => {
        if(event.key === 'Enter'){
            score = 0;
            tailLength = 0;
            snakeParts.length = 0;
            head.x = 10;
            head.y = 10;
            snakeSpeed.x = 0;
            snakeSpeed.y = 0;
            drawGame();
        }
    }
);

startGame();