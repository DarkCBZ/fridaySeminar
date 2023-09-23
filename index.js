const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let map = {
  width: 1000,
  height: 1000,
  squareWidth: 25,
  squareHeight: 25
}
let player = {
  width: 50,
  height: 50,
  color: "#303030",
  speed: 5,
  movingUp: false,
  movingDown: false,
  movingLeft: false,
  movingRight: false
}
player.x = map.width / 2 - player.width / 2;
player.y = map.height / 2 - player.height / 2;

let playerRenderX;
let playerRenderY;

function render() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  playerRenderX = canvas.width / 2 - player.width / 2;
  playerRenderY = canvas.height / 2 - player.height / 2;

  //RENDER MAP
  ctx.fillStyle = "#822222";
  ctx.fillRect(playerRenderX - player.x, playerRenderY - player.y, map.width, map.height);

  ctx.lineWidth = 1;
  for (let i = playerRenderX - player.x; i < map.width - player.x + playerRenderX; i += map.squareWidth) {
    ctx.beginPath();
    ctx.moveTo(i, playerRenderY - player.y);
    ctx.lineTo(i, map.height - player.y + playerRenderY);
    ctx.stroke();
  }
  for (let i = playerRenderY - player.y; i < map.height - player.y + playerRenderY; i += map.squareHeight) {
    ctx.beginPath();
    ctx.moveTo(playerRenderX - player.x, i);
    ctx.lineTo(map.width - player.x + playerRenderX, i);
    ctx.stroke();
  }

  //RENDER PLAYER
  ctx.lineWidth = 1;
  ctx.fillStyle = player.color;
  ctx.fillRect(playerRenderX, playerRenderY, player.width, player.height);
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

function tick() {
  if (player.movingUp) player.y -= player.speed;
  if (player.movingDown) player.y += player.speed;
  if (player.movingLeft) player.x -= player.speed;
  if (player.movingRight) player.x += player.speed;

  if (player.x >= map.width - player.width) player.x = map.width - player.width;
  if (player.x <= 0) player.x = 0;
  if (player.y >= map.height - player.height) player.y = map.height - player.height;
  if (player.y <= 0) player.y = 0;

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
