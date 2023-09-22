try {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  function tick() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    alert(canvas.width);
    alert(canvas.height);

    ctx.fillStyle = "#232425";

    ctx.fillRect(
      0,
      0,
      Math.round(canvas.width / 2),
      Math.round(canvas.height / 2)
    );
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
