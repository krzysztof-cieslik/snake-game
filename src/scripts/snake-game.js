let canvas = document.getElementById("snake-game");
let ctx = canvas.getContext("2d");
let ax = canvas.width / 2 - 10;
let ay = canvas.height / 2 - 10;

/*for (let i = 20; i < canvas.width; i += 20) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.strokeStyle = "rgb(181, 181, 181)";
    ctx.stroke();
    ctx.closePath();
}
for (let i = 20; i < canvas.height; i += 20) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.strokeStyle = "rgb(181, 181, 181)";
    ctx.stroke();
    ctx.closePath();
}*/

let color = 0;

for (let i = 0; i < canvas.height; i += 20) {
    for (let j = 0; j < canvas.width; j += 20) {
        ctx.beginPath();
        ctx.rect(j, i, 20, 20);
        if (color === 0) {
            ctx.fillStyle = "#99c2ff";
            color = 1;
        } else {
            ctx.fillStyle = "white";
            color = 0;
        }
        ctx.fill();
        ctx.closePath();
    }
}

function drawSnake() {
    ctx.beginPath();
    ctx.rect(ax, ay, 20, 20);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    drawSnake();
    ay -= 20;
}

setInterval(draw, 100);