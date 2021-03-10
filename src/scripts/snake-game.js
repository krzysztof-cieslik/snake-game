let canvas = document.getElementById("snake-game")
let ctx = canvas.getContext("2d")
let snakeDirection = {mx: 0, my: 0}
let snakeBody = [
    {x: 340, y: 340},
    {x: 340, y: 360},
    {x: 340, y: 380},
    {x: 340, y: 400},
    {x: 340, y: 420},
    {x: 340, y: 440},
    {x: 340, y: 460},
    {x: 340, y: 480},
    {x: 340, y: 500},
    {x: 340, y: 520},
    {x: 340, y: 540},
    {x: 340, y: 560},
    {x: 340, y: 580}
]
let foodPosition = {x: 340, y: 340}
let startGame = true

setInterval(drawBoard, 100)

drawSnakeStartingPosition()

function drawBoard() {
    changeSnakeDirection()

    if (snakeDirection.mx !== 0 || snakeDirection.my !== 0) {
        if (onSnake(foodPosition)) {
            drawFood()
        }

        eraseSnakeTail()

        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i].x = snakeBody[i - 1].x
            snakeBody[i].y = snakeBody[i - 1].y
        }

        drawSnakeHead()
    }

    if (snakeBody[0].x < 0 || snakeBody[0].x >= 700 || snakeBody[0].y < 0 || snakeBody[0].y >= 700 || snakeCollision()) {
        ctx.beginPath()
        ctx.clearRect(0, 0, 700, 700)
        ctx.closePath()
        foodPosition = {x: 340, y: 340}
        startGame = true
        snakeDirection = {mx: 0, my: 0}
        snakeBody = [
            {x: 340, y: 340},
            {x: 340, y: 360},
            {x: 340, y: 380},
            {x: 340, y: 400},
            {x: 340, y: 420},
            {x: 340, y: 440},
            {x: 340, y: 460},
            {x: 340, y: 480},
            {x: 340, y: 500},
            {x: 340, y: 520},
            {x: 340, y: 540},
            {x: 340, y: 560},
            {x: 340, y: 580}
        ]
        drawSnakeStartingPosition()
    }
}

function drawSnakeStartingPosition() {
    for (let i = 0; i < snakeBody.length; i++) {
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
    let keydown = function (e) {
        switch (e.key) {
            case 'ArrowUp':
                if (snakeDirection.my === 20) break
                snakeDirection = {mx: 0, my: -20}
                startGame = false
                break
            case 'ArrowDown':
                if (snakeDirection.my === -20 || startGame) break
                snakeDirection = {mx: 0, my: 20}
                startGame = false
                break
            case 'ArrowLeft':
                if (snakeDirection.mx === 20) break
                snakeDirection = {mx: -20, my: 0}
                startGame = false
                break
            case 'ArrowRight':
                if (snakeDirection.mx === -20) break
                snakeDirection = {mx: 20, my: 0}
                startGame = false
                break
        }
        removeEventListener('keydown', keydown)
    }
    addEventListener('keydown', keydown)
}

function getRandomPosition() {
    return {
        x: Math.floor(Math.random() * Math.floor(35)) * 20,
        y: Math.floor(Math.random() * Math.floor(35)) * 20
    }
}

function getRandomFoodPosition() {
    let foodPosition
    while (foodPosition == null || onSnake(foodPosition)) {
        foodPosition = getRandomPosition()
    }
    return foodPosition
}

function onSnake(position) {
    return snakeBody.some(element => {
        return equalPositions(element, position)
    })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function drawFood() {
    foodPosition = getRandomFoodPosition()
    ctx.beginPath()
    ctx.rect(foodPosition.x, foodPosition.y, 20, 20)
    ctx.fillStyle = "green"
    ctx.fill()
    ctx.closePath()
}

function snakeCollision() {
    for (let i = 1; i < snakeBody.length - 1; i++) {
        if (snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y) {
            console.log('true')
            return true
        }
    }
    console.log('false')
    return false
}

window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);