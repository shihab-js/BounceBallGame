// JavaScript source code
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let score = 0;

let x = canvas.width / 2;
let y = canvas.height - 20;

let dx = 2;
let dy = -2;

let ballRadius = 10;

let paddleHeight = 10;
let paddleWidth = 75;

let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight;

let brickHeight = 20;
let brickWidth = 75;
let brickPadding = 6;
let brickOffsetLeft = 10;
let brickOffsetTop = 30;
let brickColumnCount = 7;
let brickRowCount = 5;
let brickStatus = 0;
let bricks = [];


for (var i = 0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for (var j = 0; j < brickRowCount; j++) {
        bricks[i][j] = { x: 0, y: 0, status: 1 };
    }
}

let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);


function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBricks() {
    for (var i = 0; i < brickColumnCount; i++) {
        for (var j = 0; j < brickRowCount; j++) {
            if (bricks[i][j].status == 1) {
                var bricksX = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
                var bricksY = (j * (brickHeight + brickPadding)) + brickOffsetTop;

                bricks[i][j].x = bricksX;
                bricks[i][j].y = bricksY;
                ctx.beginPath();
                ctx.rect(bricksX, bricksY, brickWidth, brickHeight);
                ctx.fillStyle = "#B22222";
                ctx.fill();
                ctx.closePath();
            }

        }
    }
}

function collisionDetection() {
    for (var i = 0; i < brickColumnCount; i++) {
        for (var j = 0; j < brickRowCount; j++) {
            var brick = bricks[i][j];

            if (brick.status == 1) {
                if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
                    dy = -dy;
                    brick.status = 0;
                    if (score < 50) {
                        score += 5;
                    } else if (score >= 50 && score < 100) {
                        score += 10;
                    } else if (score >= 100) {
                        score += 15;
                    }

                }
            }

        }
    }
}



function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#ff69b4";
    ctx.fill();
    ctx.closePath();


    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX - 2 && x < paddleX + paddleWidth + 2) {
            if (y = y - paddleHeight) {
                dy = -dy;
            }
        } else {
            alert("GAME OVER!");
            document.location.reload();
            clearInterval(interval);
        }
    }
    x += dx;
    y += dy;


    if (rightPressed) {
        paddleX += 4;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;

        }
    }
    else if (leftPressed) {
        paddleX -= 4;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }


    drawBricks();
    drawPaddle();
    collisionDetection();
    myScore();

}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#ff69b4";
    ctx.fill();
    ctx.closePath();
}

function myScore() {
    ctx.font = "15px comic sans MS";
    ctx.fillStyle = "#006400";

    ctx.fillText("Your Score is: " + score, canvas.width - 570, canvas.height - 380);
}

let interval = setInterval(drawBall, 10);