const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function render() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.fillStyle = "#822222";

  ctx.fillRect(0, 0, map.width, map.height);

  ctx.lineWidth = 1;
  for (let i = 0; i < map.width; i += 30) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, map.height);
    ctx.stroke();
  }
  for (let i = 0; i < map.height; i += 30) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(map.width, i);
    ctx.stroke();
  }

  ctx.lineWidth = 1;
  ctx.fillStyle = player.color;
  ctx.fillRect(canvas.width / 2 - player.width / 2, canvas.height / 2 - player.height / 2, player.width, player.height);

  let playerRenderX = canvas.width / 2 - player.width / 2;
  let playerRenderY = canvas.height / 2 - player.height / 2;
  //top
  ctx.beginPath();
  ctx.moveTo(playerRenderX, playerRenderY);
  ctx.lineTo(playerRenderX + player.width, playerRenderY);
  ctx.stroke();

  //bottom
  ctx.beginPath();
  ctx.moveTo(playerRenderX + player.width, playerRenderY + player.height);
  ctx.lineTo(playerRenderX, playerRenderY + player.height);
  ctx.stroke();

  //left
  ctx.beginPath();
  ctx.moveTo(playerRenderX, playerRenderY + player.height);
  ctx.lineTo(playerRenderX, playerRenderY);
  ctx.stroke();

  //right
  ctx.beginPath();
  ctx.moveTo(playerRenderX + player.width, playerRenderY);
  ctx.lineTo(playerRenderX + player.width, playerRenderY + player.height);
  ctx.stroke();
}
let player = {
  x: 20,
  y: 20,
  width: 50,
  height: 50,
  color: "#303030",
  speed: 5,
  movingUp: false,
  movingDown: false,
  movingLeft: false,
  movingRight: false
}
let map = {
  width: 5000,
  height: 5000
}
function tick() {
  if (player.movingUp) player.y -= player.speed;
  if (player.movingDown) player.y += player.speed;
  if (player.movingLeft) player.x -= player.speed;
  if (player.movingRight) player.x += player.speed;

  render();
}
setInterval(tick, 1000 / 30);

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
