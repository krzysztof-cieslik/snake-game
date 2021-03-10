let canvas = document.getElementById("snake-game")
let ctx = canvas.getContext("2d")
let snakeDirection
let snakeBody
let foodPosition

setInterval(drawBoard, 100)

gameBegin()

function drawBoard() {
    changeSnakeDirection()

    if (snakeBody[0].x < 0 || snakeBody[0].x >= 700 || snakeBody[0].y < 0 || snakeBody[0].y >= 700 || snakeCollision()) {
        gameBegin()
    }

    if (snakeDirection.mx !== 0 || snakeDirection.my !== 0) {
        if (onSnake(foodPosition)) {
            drawFood()
            snakeBody.push({...snakeBody[snakeBody.length - 1]})
        }

        for (let i = snakeBody.length - 1; i > 0; i--) {
            snakeBody[i].x = snakeBody[i - 1].x
            snakeBody[i].y = snakeBody[i - 1].y
        }
        eraseSnakeTail()
        drawSnakeHead()
    }
}

function gameBegin() {
    ctx.beginPath()
    ctx.clearRect(0, 0, 700, 700)
    ctx.closePath()
    foodPosition = {x: 340, y: 340}
    snakeDirection = {mx: 0, my: 0}
    snakeBody = [
        {x: 340, y: 340},
        {x: 340, y: 360},
        {x: 340, y: 380}
    ]
    drawSnakeStartingPosition()
}

function drawSnakeStartingPosition() {
    for (let i = 0; i < snakeBody.length; i++) {
        ctx.beginPath()
        ctx.rect(snakeBody[i].x, snakeBody[i].y, 20, 20)
        ctx.fillStyle = "#339966"
        ctx.fill()
        ctx.closePath()
    }
}

function changeSnakeDirection() {
    let keydown = function (e) {
        switch (e.key) {
            case 'ArrowUp':
                if (snakeDirection.my === 20) break
                snakeDirection = {mx: 0, my: -20}
                break
            case 'ArrowDown':
                if (snakeDirection.my === -20 || snakeDirection.mx === 0 && snakeDirection.my === 0) break
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
    ctx.fillStyle = "red"
    ctx.fill()
    ctx.closePath()
}

function getRandomFoodPosition() {
    let foodPosition
    while (foodPosition == null || onSnake(foodPosition)) {
        foodPosition = getRandomPosition()
    }
    return foodPosition
}

function getRandomPosition() {
    return {
        x: Math.floor(Math.random() * Math.floor(35)) * 20,
        y: Math.floor(Math.random() * Math.floor(35)) * 20
    }
}

function eraseSnakeTail() {
    ctx.beginPath()
    ctx.clearRect(snakeBody[snakeBody.length - 1].x, snakeBody[snakeBody.length - 1].y, 20, 20)
    ctx.closePath()
}

function drawSnakeHead() {
    snakeBody[0].x += snakeDirection.mx
    snakeBody[0].y += snakeDirection.my
    ctx.beginPath()
    ctx.rect(snakeBody[0].x, snakeBody[0].y, 20, 20)
    ctx.fillStyle = "#339966"
    ctx.fill()
    ctx.closePath()
}

window.addEventListener("keydown", function (e) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);