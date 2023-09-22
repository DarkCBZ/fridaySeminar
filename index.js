const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function render() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.fillStyle = "#822222";

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = 1;
  for (let i = 0; i < canvas.width; i += 30) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for (let i = 0; i < canvas.height; i += 30) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }

  ctx.lineWidth = 1;
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  //top
  ctx.beginPath();
  ctx.moveTo(player.x, player.y);
  ctx.lineTo(player.x + player.width, player.y);
  ctx.stroke();

  //bottom
  ctx.beginPath();
  ctx.moveTo(player.x + player.width, player.y + player.height);
  ctx.lineTo(player.x, player.y + player.height);
  ctx.stroke();

  //left
  ctx.beginPath();
  ctx.moveTo(player.x, player.y + player.height);
  ctx.lineTo(player.x, player.y);
  ctx.stroke();

  //right
  ctx.beginPath();
  ctx.moveTo(player.x + player.width, player.y);
  ctx.lineTo(player.x + player.width, player.y + player.height);
  ctx.stroke();
}
let player = {
  x: 20,
  y: 20,
  width: 50,
  height: 50,
  color: "#303030",
  speed: 10,
  movingUp: false,
  movingDown: false,
  movingLeft: false,
  movingRight: false
}
function tick() {
  if (player.movingUp) player.y -= player.speed;
  if (player.movingDown) player.y += player.speed;
  if (player.movingLeft) player.x -= player.speed;
  if (player.movingRight) player.x += player.speed;

  render();
}
setInterval(tick, 1000 / 20);

window.onkeydown = x => {
  switch (true) {
    case x.code === "KeyW":
      player.movingUp = true;
      break;
    case x.code === "KeyA":
      player.movingLeft = true;
      break;
    case x.code === "KeyS":
      player.movingDown = true;
      break;
    case x.code === "KeyD":
      player.movingRight = true;
      break;
  }
}
window.onkeyup = x => {
  switch (true) {
    case x.code === "KeyW":
      player.movingUp = false;
      break;
    case x.code === "KeyA":
      player.movingLeft = false;
      break;
    case x.code === "KeyS":
      player.movingDown = false;
      break;
    case x.code === "KeyD":
      player.movingRight = false;
      break;
  }
}
window.onresize = () => {
  render();
};
window.onload = () => {
  render();
};
