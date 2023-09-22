try {
    const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function tick() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillRect(0, 0, 500, 500);
}

window.onresize = () => {
    alert("Resized");
    tick();
}
window.onload = () => {
    alert("Loaded");
    tick();
}
} catch (error) {
    alert(error);
}