let canvas = document.getElementById("snake-game");
let ctx = canvas.getContext("2d");
let px = canvas.width / 2 - 10;
let py = canvas.height / 2 - 10;
let input;
let mx = 0, my = 0;

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
    ctx.rect(px, py, 20, 20);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    drawSnake();
    px += mx;
    py += my
    window.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowUp':
                if (input === 'down') break
                mx = 0;
                my = -20;
                input = 'up';
                break
            case 'ArrowDown':
                if (input === 'up') break
                mx = 0;
                my = 20;
                input = 'down';
                break
            case 'ArrowLeft':
                if (input === 'right') break
                mx = -20;
                my = 0;
                input = 'left';
                break
            case 'ArrowRight':
                if (input === 'left') break
                mx = 20;
                my = 0;
                input = 'right';
                break
        }
    })
}


setInterval(draw, 100);