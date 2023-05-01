import { getMode } from './main.js';

const grid = document.getElementById("grid");
const cursorIcon = document.getElementById("cursor-icon");

grid.addEventListener("mousemove", (e) => {
  const mode = getMode();
  switch (mode) {
    case "color":
        cursorIcon.style.backgroundImage = "url('./../icons/brush.svg')";
        break;
    case "fill":
        cursorIcon.style.backgroundImage = "url('./../icons/fill.png')";
        break;
    case "eraser":
        cursorIcon.style.backgroundImage = "url('./../icons/eraser.svg')";
        break;
    case "rainbow":
        cursorIcon.style.backgroundImage = "url('./../icons/rainbow.png')";
        break;
    default:
      cursorIcon.style.backgroundImage = "none";
  }
  
  if (mode === "color" || mode === "fill" || mode === "eraser" || mode === "rainbow") {
    cursorIcon.style.left = `${e.pageX}px`;
    cursorIcon.style.top = `${e.pageY}px`;
  }
});

let timeoutActive = false;
let gridActive = false;

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  if (button.id === "small-brush" || button.id === "medium-brush" || button.id === "big-brush") {
    const brushButton = document.getElementById("brush");
    button.addEventListener("click", () => {
      buttons.forEach(b => {
        if (b.id !== "timeout" && b.id !== "show-grid") {
          b.classList.remove("selected");
        }
      });
      brushButton.classList.add("selected");
      button.classList.add("selected");
    });
  } else if (button.id === "small-eraser" || button.id === "medium-eraser" || button.id === "big-eraser") {
    const brushButton = document.getElementById("eraser");
    button.addEventListener("click", () => {
      buttons.forEach(b => {
        if (b.id !== "timeout" && b.id !== "show-grid") {
          b.classList.remove("selected");
        }
      });
      brushButton.classList.add("selected");
      button.classList.add("selected");
    });
  } else if (button.id === "timeout") {
    button.addEventListener("click", () => {
      if (timeoutActive) {
        button.classList.remove("selected");
        timeoutActive = false;
      } else {
        button.classList.add("selected");
        timeoutActive = true;
      }
    });
  } else if (button.id === "show-grid") {
    button.addEventListener("click", () => {
      if (gridActive) {
        button.classList.remove("selected");
        gridActive = false;
      } else {
        button.classList.add("selected");
        gridActive = true;
      }
    });
  } else if (button.id !== "undo" && button.id !== "do" && button.id !== "export" && button.id !== "erase-all") {
    button.addEventListener("click", () => {
      buttons.forEach(b => {
        if (b.id !== "timeout" && b.id !== "show-grid") {
          b.classList.remove("selected");
        }
      });
      button.classList.add("selected");
    });
  } 
});