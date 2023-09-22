const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function tick() {
  try {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //alert(canvas.width);
    //alert(canvas.height);

    //Background Start
    ctx.fillStyle = "#B22222";

    ctx.fillRect(0, 0, Math.ceil(canvas.width), Math.ceil(canvas.height));

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
  } catch (error) {
    alert(error);
  }
}
//Background End

window.onresize = () => {
  //alert("Resized");
  tick();
};
window.onload = () => {
  //alert("Loaded");
  tick();
};