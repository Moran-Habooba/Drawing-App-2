const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let painting = false;
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;
canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let color = "#fff";
let lineWidth = 5;

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

canvas.addEventListener("touchstart", startPositionTouch);
canvas.addEventListener("touchend", endPositionTouch);
canvas.addEventListener("touchmove", drawTouch);

function startPosition(e) {
  painting = true;

  startX = e.offsetX;
  startY = e.offsetY;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
}

function endPosition() {
  painting = false;
}

function draw(e) {
  if (!painting) return;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}

function startPositionTouch(e) {
  if (e.touches && e.touches.length > 0) {
    const touch = e.touches[0];
    painting = true;
    const startX = touch.pageX - canvasOffsetX;
    const startY = touch.pageY - canvasOffsetY;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
  }
}

function endPositionTouch() {
  painting = false;
}

function drawTouch(e) {
  if (!painting) return;
  e.preventDefault();
  if (e.touches && e.touches.length > 0) {
    const touch = e.touches[0];
    const x = touch.pageX - canvasOffsetX;
    const y = touch.pageY - canvasOffsetY;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
const size = document.getElementById("lineWidth");
size.addEventListener("click", (e) => {
  lineWidth = parseInt(e.target.value);

  lineWidth = e.target.value;
});
const clear = document.getElementById("clear");
clear.addEventListener("click", (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
color = document.getElementById("color");
color.addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value;
  canvas.style.cursor = "default";
  erasing = false;
});
const fillImage = document.getElementById("fillImage");

fillImage.addEventListener("click", (e) => {
  ctx.fillStyle = document.getElementById("color").value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// eraser

let erasing = false;
const eraserButton = document.getElementById("eraser");
eraserButton.addEventListener("click", (e) => {
  toggleEraser();
  lineWidth = parseInt(e.target.value);
  lineWidth = e.target.value;
});

function toggleEraser() {
  erasing = !erasing;
  if (erasing) {
    ctx.strokeStyle = "#FFFFFF";
    canvas.style.cursor = "crosshair";
  } else {
    ctx.strokeStyle = document.getElementById("color").value;
    ctx.lineWidth = lineWidth;
    ctx.globalCompositeOperation = "source-over";
  }
}

// Pencil
const pencilButton = document.getElementById("pencil");

pencilButton.addEventListener("click", () => {
  togglePencil();
  ctx.strokeStyle = document.getElementById("color").value;
  ctx.lineWidth = lineWidth;
});
function togglePencil() {
  erasing = false;
  ctx.globalCompositeOperation = "source-over";
  canvas.style.cursor = "default";
}
