const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let map = {
  width: 2000,
  height: 2000,
  squareWidth: 25,
  squareHeight: 25
}
let player = {
  coins: 0,
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

let coins = [];
let coinWH = 25 / 2;
function render() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  playerRenderX = canvas.width / 2 - player.width / 2;
  playerRenderY = canvas.height / 2 - player.height / 2;

  //RENDER MAP
  function renderMap() {
    ctx.fillStyle = "#822222";
    ctx.fillRect(playerRenderX - player.x, playerRenderY - player.y, map.width, map.height);

    //lines
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
  }

  function renderCoin(x, y) {
    coinX = playerRenderX - player.x + x;
    coinY = playerRenderY - player.y + y;

    ctx.fillStyle = "#DAA520";
    ctx.fillRect(coinX, coinY, coinWH, coinWH);
    //top
    ctx.beginPath();
    ctx.moveTo(coinX, coinY);
    ctx.lineTo(coinX + coinWH, coinY);
    ctx.stroke();
    //bottom
    ctx.beginPath();
    ctx.moveTo(coinX + coinWH, coinY + coinWH);
    ctx.lineTo(coinX, coinY + coinWH);
    ctx.stroke();
    //left
    ctx.beginPath();
    ctx.moveTo(coinX, coinY + coinWH);
    ctx.lineTo(coinX, coinY);
    ctx.stroke();
    //right
    ctx.beginPath();
    ctx.moveTo(coinX + coinWH, coinY);
    ctx.lineTo(coinX + coinWH, coinY + coinWH);
    ctx.stroke();
  }

  function renderPlayer() {
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

  renderMap();

  for (coin of coins) {
    renderCoin(coin[0], coin[1]);
  }

  renderPlayer();
}

function tick() {
  // Speed
  if (player.movingUp) player.y -= player.speed;
  if (player.movingDown) player.y += player.speed;
  if (player.movingLeft) player.x -= player.speed;
  if (player.movingRight) player.x += player.speed;

  // Diagonal speed
  if (player.movingUp && player.movingRight) {
    player.x -= player.speed - player.speed / Math.sqrt(2);
    player.y += player.speed - player.speed / Math.sqrt(2);
  }
  if (player.movingUp && player.movingLeft) {
    player.x += player.speed - player.speed / Math.sqrt(2);
    player.y += player.speed - player.speed / Math.sqrt(2);
  }
  if (player.movingDown && player.movingRight) {
    player.x -= player.speed - player.speed / Math.sqrt(2);
    player.y -= player.speed - player.speed / Math.sqrt(2);
  }
  if (player.movingDown && player.movingLeft) {
    player.x += player.speed - player.speed / Math.sqrt(2);
    player.y -= player.speed - player.speed / Math.sqrt(2);
  }

  //clamp player to map
  player.x = Math.max(0, Math.min(player.x, map.width - player.width));
  player.y = Math.max(0, Math.min(player.y, map.height - player.height));

  function createCoin() {
    let x = Math.floor(Math.random() * map.width + 1);
    let y = Math.floor(Math.random() * map.height + 1);

    if (x > map.width - 25) x -= coinWH;
    if (y > map.height - 25) y -= coinWH;
    coins.push([x, y]);
  }

  while (coins.length < 1000) {
    createCoin();
  }

  for (let i = 0; i < coins.length; i++) {
    let coin = coins[i];
    if (player.x < coin[0] + coinWH && player.x + player.width > coin[0]) {
      if (player.y < coin[1] + coinWH && player.y + player.height > coin[1]) {

        player.coins++;
        coins[i] = coins[coins.length - 1];
        coins.pop();
      }
    }
  }

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
    case x.code === "Space":

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
    case x.code === "Space":

      break;
  }
}
window.onresize = () => {
  render();
};
window.onload = () => {
  render();
};
