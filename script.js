
// process canvas
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// define FPS
const repsInASecond = 7;
const millisInSecond = 1000;

// get score element
const scoreParameter = document.getElementById('score');

// score counter
let score = 0;

// define snake colors
let colors = ['blue', 'green', 'yellow', 'purple', 'pink', 'brown', 'cyan', 'white'];

// define area
let tileCount=20;
let tileSize=18;

// define apple first position
let apple = {x: 5, y: 5};

// define snake first position(its head)
let head = {x: 10, y: 10};

// define game over variable (can only restart game if game is over)
let gameOverVariable = true;

// define snake speed (changes when user presses arrow keys)
let snakeSpeed = {
    x: 0,
    y: 0
};

// define snake parts
const snakeParts = [];
let tailLength = 0;

// draw game every 1/7 second
function drawGame(){
    
    document.getElementById("coords").innerHTML = "X: " + head.x + " Y: " + head.y;


    changeSnakePosition();

    gameOverVariable = gameOver();

    if(gameOverVariable){
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

// for each snake part, draw a square with a different color
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

// draw apple at a random position in the canvas
function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x * tileCount, apple.y * tileCount, tileSize, tileSize);
}

// change snake position according to the speed
function changeSnakePosition(){
    head.x += snakeSpeed.x;
    head.y += snakeSpeed.y;
}

// process arrow keys and change snake speed
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

// if snake eats apple, increase score, tail length and change apple position(randomized)
function checkCollision(){
    if(apple.x==head.x && apple.y==head.y){
        apple.x = Math.floor(Math.random()*tileCount);
        apple.y = Math.floor(Math.random()*tileCount);
        score++;
        tailLength++;
    }
}

// if snake hits the wall or itself, game over
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
        if(event.key === 'Enter' && gameOverVariable){
            score = 0;
            tailLength = 0;
            snakeParts.length = 0;
            head.x = 10;
            head.y = 10;
            snakeSpeed.x = 0;
            snakeSpeed.y = 0;
            gameOverVariable = false;
            drawGame();
        }
    }
);

startGame();