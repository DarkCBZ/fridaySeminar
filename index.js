try {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  function tick() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    alert(canvas.width);
    alert(canvas.height);

    ctx.fillRect(0, 0, 200, 200);
  }

  window.onresize = () => {
    alert("Resized");
    tick();
  };
  window.onload = () => {
    alert("Loaded");
    tick();
  };
} catch (error) {
  alert(error);
}
