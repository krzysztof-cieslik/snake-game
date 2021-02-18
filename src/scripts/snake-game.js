let canvas = document.getElementById("snake-game");
let ctx = canvas.getContext("2d");
let ax = canvas.width / 2 - 10;
let ay = canvas.height / 2 - 10;
let bx = canvas.width / 2 - 10;
let by = canvas.height / 2 - 10;
let cx = canvas.width / 2 - 10;
let cy = canvas.height / 2 - 10;
let dx = canvas.width / 2 - 10;
let dy = canvas.height / 2 - 10;
let move = 20;

for (let i = 20; i < canvas.width; i += 20) {
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
}


function draw() {
    ctx.beginPath();
    ctx.rect(ax, ay, 20, 20);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    ax += move;
    ay += move;
    ctx.beginPath();
    ctx.rect(bx, by, 20, 20);
    ctx.fill();
    ctx.closePath();
    bx -= move;
    by += move;
    ctx.beginPath();
    ctx.rect(cx, cy, 20, 20);
    ctx.fill();
    ctx.closePath();
    cx += move;
    cy -= move;
    ctx.beginPath();
    ctx.rect(dx, dy, 20, 20);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
    dx -= move;
    dy -= move;
}

setInterval(draw, 1000);