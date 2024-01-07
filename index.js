function run() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    alert("this game doesnt work on phone silly goose");
    for (; ;);
  }

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let map = {
    width: 6000,
    height: 6000,
    squareWidth: 25,
    squareHeight: 25,
    coins: 3000
  }
  let player = {
    width: 50,
    height: 50,
    color: "#EEEEEE",
    speed: 3,
    movingUp: false,
    movingDown: false,
    movingLeft: false,
    movingRight: false,
    coins: 0,
    upgradeSpeed: 1,
    upgradeSize: 1,
    upgradeMapCoins: 1,
    upgradeMapSize: 1
  }

  let spdprice = Math.floor(9.5 * (1 + 0.75 * player.upgradeSpeed) * (1.25 ** player.upgradeSpeed));
  let psizeupg = Math.floor(9.5 * (1 + 0.75 * player.upgradeSize) * (1.25 ** player.upgradeSize));
  let mcoinupg = Math.floor(9.5 * (1 + 0.75 * player.upgradeMapCoins) * (1.25 ** player.upgradeMapCoins));
  let msizeupg = Math.floor(9.5 * (1 + 0.75 * player.upgradeMapSize) * (1.25 ** player.upgradeMapSize));

  if (localStorage.coins === undefined) {
    player.coins = 0;
    localStorage.coins = 0;
  } else {
    player.coins = localStorage.coins;
  }
  if (localStorage.upgradeSpeed === undefined) {
    player.upgradeSpeed = 1;
    localStorage.upgradeSpeed = 1;
  } else {
    player.upgradeSpeed = localStorage.upgradeSpeed;
  }
  if (localStorage.upgradeSize === undefined) {
    player.upgradeSize = 1;
    localStorage.upgradeSize = 1;
  } else {
    player.upgradeSize = localStorage.upgradeSize;
  }
  if (localStorage.upgradeMapCoins === undefined) {
    player.upgradeMapCoins = 1;
    localStorage.upgradeMapCoins = 1;
  } else {
    player.upgradeMapCoins = localStorage.upgradeMapCoins;
  }
  if (localStorage.upgradeMapSize === undefined) {
    player.upgradeMapSize = 1;
    localStorage.upgradeMapSize = 1;
  } else {
    player.upgradeMapSize = localStorage.upgradeMapSize;
  }

  document.getElementsByClassName("cointext")[0].textContent = player.coins;
  document.getElementsByClassName("spdprice")[0].textContent = `Cost: ${spdprice}`;
  document.getElementsByClassName("psizeupg")[0].textContent = `Cost: ${psizeupg}`;
  document.getElementsByClassName("mcoinupg")[0].textContent = `Cost: ${mcoinupg}`;
  document.getElementsByClassName("msizeupg")[0].textContent = `Cost: ${msizeupg}`;

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

    //makes coins
    while (coins.length < map.coins) {
      createCoin();
    }

    //sees if player touches coin (not sexually)
    for (let i = 0; i < coins.length; i++) {
      let coin = coins[i];
      if (player.x < coin[0] + coinWH && player.x + player.width > coin[0]) {
        if (player.y < coin[1] + coinWH && player.y + player.height > coin[1]) {

          player.coins++;
          coins[i] = coins[coins.length - 1];
          coins.pop();
          localStorage.coins = player.coins;
          document.getElementsByClassName("cointext")[0].textContent = player.coins;
        }
      }
    }

    document.getElementsByClassName("speed")[0].textContent = `Player Speed: ${player.speed}`;
    document.getElementsByClassName("playersize")[0].textContent = `Player Size: ${player.width}`;
    document.getElementsByClassName("mapsize")[0].textContent = `Map Size: ${map.width}`;
    document.getElementsByClassName("mapcoins")[0].textContent = `Map Coins: ${map.coins}`;

    spdprice = Math.floor(9.5 * (1 + 0.75 * player.upgradeSpeed) * (1.25 ** player.upgradeSpeed));
    psizeupg = Math.floor(9.5 * (1 + 0.75 * player.upgradeSize) * (1.25 ** player.upgradeSize));
    mcoinupg = Math.floor(9.5 * (1 + 0.75 * player.upgradeMapCoins) * (1.25 ** player.upgradeMapCoins));
    msizeupg = Math.floor(9.5 * (1 + 0.75 * player.upgradeMapSize) * (1.25 ** player.upgradeMapSize));

    document.getElementsByClassName("spdprice")[0].textContent = `Cost: ${spdprice}`;
    document.getElementsByClassName("psizeupg")[0].textContent = `Cost: ${psizeupg}`;
    document.getElementsByClassName("mcoinupg")[0].textContent = `Cost: ${mcoinupg}`;
    document.getElementsByClassName("msizeupg")[0].textContent = `Cost: ${msizeupg}`;
    render();
  }
  setInterval(tick, 1000 / 120);

  function upgrade(x) {
    if (x === 1) { //speed
      if (player.coins >= spdprice) {
        player.coins -= spdprice;
        player.speed += 0.5;
        player.upgradeSpeed++;
        localStorage.upgradeSpeed = player.upgradeSpeed;
      }
    }
    if (x === 2) { //playersize
      if (player.coins >= psizeupg) {
        player.coins -= psizeupg;
        player.width += 5;
        player.height += 5;
        player.upgradeSize++;
        localStorage.upgradeSize = player.upgradeSize;
      }
    }
    if (x === 3) { //mapcoins
      if (player.coins >= mcoinupg) {
        player.coins -= mcoinupg;
        map.coins += 100;
        player.upgradeMapCoins++;
        localStorage.upgradeMapCoins = player.upgradeMapCoins;
      }
    }
    if (x === 4) { //mapsize
      if (player.coins >= msizeupg) {
        player.coins -= msizeupg;
        map.width -= 100;
        map.height -= 100;
        coins = [];
        player.upgradeMapSize++;
        localStorage.upgradeMapSize = player.upgradeMapSize;
      }
    }
    document.getElementsByClassName("cointext")[0].textContent = player.coins;
  }

  document.getElementsByClassName("divup1")[0].onclick = () => { upgrade(1); };
  document.getElementsByClassName("divup2")[0].onclick = () => { upgrade(2); };
  document.getElementsByClassName("divup3")[0].onclick = () => { upgrade(3); };
  document.getElementsByClassName("divup4")[0].onclick = () => { upgrade(4); };

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
}
run();