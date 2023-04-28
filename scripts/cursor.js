import { getMode } from './main.js';

const grid = document.getElementById("grid");
const cursorIcon = document.getElementById("cursor-icon");

grid.addEventListener("mousemove", (e) => {
  const mode = getMode();
  switch (mode) {
    case "color":
        cursorIcon.style.backgroundImage = "url('../icons/brush.svg')";
        break;
    case "fill":
        cursorIcon.style.backgroundImage = "url('../icons/fill.png')";
        break;
    case "eraser":
        cursorIcon.style.backgroundImage = "url('../icons/eraser.svg')";
        break;
    case "rainbow":
        cursorIcon.style.backgroundImage = "url('../icons/rainbow.png')";
        break;
    default:
      cursorIcon.style.backgroundImage = "none";
  }
  
  if (mode === "color" || mode === "fill" || mode === "eraser" || mode === "rainbow") {
    cursorIcon.style.left = `${e.pageX}px`;
    cursorIcon.style.top = `${e.pageY}px`;
  }
});