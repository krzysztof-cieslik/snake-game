let canvas = document.getElementById("snake-game")
let ctx = canvas.getContext("2d")
let snakeDirection = {mx: 0, my: 0}
let snakeBody = [
    {x: 340, y: 340},
    {x: 340, y: 360},
    {x: 340, y: 380},
    {x: 340, y: 400}
]

setInterval(animateSnake, 100)

drawSnakeStartingPosition()

function animateSnake() {
    changeSnakeDirection()

    if (snakeDirection.mx !== 0 || snakeDirection.my !== 0) {
        for (let i = snakeBody.length - 1; i >= 1; i--) {
            snakeBody[i].x = snakeBody[i - 1].x
            snakeBody[i].y = snakeBody[i - 1].y
        }
        drawSnakeHead()
        eraseSnakeTail()
    }
}

function drawSnakeStartingPosition() {
    for(let i = 0; i < snakeBody.length - 1; i++ ) {
        ctx.beginPath()
        ctx.rect(snakeBody[i].x, snakeBody[i].y, 20, 20)
        ctx.fillStyle = "red"
        ctx.fill()
        ctx.closePath()
    }
}

function drawSnakeHead() {
    snakeBody[0].x += snakeDirection.mx
    snakeBody[0].y += snakeDirection.my
    ctx.beginPath()
    ctx.rect(snakeBody[0].x, snakeBody[0].y, 20, 20)
    ctx.fillStyle = "red"
    ctx.fill()
    ctx.closePath()
}

function eraseSnakeTail() {
    ctx.beginPath()
    ctx.clearRect(snakeBody[snakeBody.length - 1].x, snakeBody[snakeBody.length - 1].y, 20, 20)
    ctx.closePath()
}

function changeSnakeDirection() {
    let keydown = function(e) {
        switch (e.key) {
            case 'ArrowUp':
                if (snakeDirection.my === 20) break
                snakeDirection = {mx: 0, my: -20}
                break
            case 'ArrowDown':
                if (snakeDirection.my === -20) break
                snakeDirection = {mx: 0, my: 20}
                break
            case 'ArrowLeft':
                if (snakeDirection.mx === 20) break
                snakeDirection = {mx: -20, my: 0}
                break
            case 'ArrowRight':
                if (snakeDirection.mx === -20) break
                snakeDirection = {mx: 20, my: 0}
                break
        }
        removeEventListener('keydown', keydown)
    }
    addEventListener('keydown', keydown)
}