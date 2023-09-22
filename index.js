const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function tick() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillRect(0, 0, 500, 500);
}

document.onresize = () => {
    alert("Resized");
    tick();
}
document.onload = () => {
    alert("Loaded");
    tick();
}