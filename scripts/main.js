import { GraphAdjList } from "./graphAdjList.js";
import { Node } from "./node.js";
import {
  COLOR_BLACK,
  COLOR_WHITE,
  GRID_SIZE,
  getRandomNumber,
  getSquareById,
  getSquareId,
} from "./utils.js";
import { Color } from "./color.js";

const grid = document.querySelector(".grid");
const graph = new GraphAdjList();
let idCount = 1;
let rowCount = 1;
let children = [];
/**
 * All the possible modes that the user can select
 * to change the grid.
 */
const MODES = {
  color: "color",
  rainbow: "rainbow",
  eraser: "eraser",
  fill: "fill",
  eraseAll: "eraseAll",
};
/** The `currentBrushSize` variable controls the size
 * that the user is currently using in brush.
 */
let currentBrushSize = "medium";
/** The `currentMode` variable controls the mode
 * that the user is currently using.
 */
let currentMode = MODES.color;
/**
 * Control for the grid filling timeout.
 */
let timeout = false;
/**
 * Export this module's mode to other modules.
 */
export function getMode() {
  return currentMode;
}
/**
 * The `currentColor` variable controls the color 
 * that the user is currently using.
 */
let currentColor = COLOR_BLACK;
/**
 * Creates a row of a grid.
 * @returns The new row.
 */
function createRow() {
  const row = document.createElement("div");
  row.classList.add("grid-row");
  row.classList.add("flex");
  return row;
}

/**
 * Creates the graph adjacencies for a given node.
 * @param rootSquare The square/node of interest.
 */
function createAdjacencies(rootSquare) {
  const rootNodeId = getSquareId(rootSquare);

  // upper adjacency
  const upperAdjacencyId = rootNodeId - GRID_SIZE;
  if (upperAdjacencyId > 0) {
    graph.createAdjacency(graph.nodes[rootNodeId], graph.nodes[upperAdjacencyId]);
  }

  // rightmost adjacency
  const rightmostAdjacencyId = rootNodeId + 1;
  const rightmostAdjacentSquare = getSquareById(rightmostAdjacencyId);
  if (
    rightmostAdjacencyId <= GRID_SIZE * GRID_SIZE &&
    +rightmostAdjacentSquare.getAttribute("row") ===
      +rootSquare.getAttribute("row")
  ) {
    graph.createAdjacency(graph.nodes[rootNodeId], graph.nodes[rightmostAdjacencyId]);
  }
}

/**
 * Creates a column of a grid.
 * @param row The row in which the column is inserted.
 */
function createColumn(row) {
  const square = document.createElement("div");

  square.setAttribute("id", `sq_${idCount++}`);
  square.setAttribute("row", `${rowCount}`);

  square.style.backgroundColor = COLOR_WHITE.getRGB();

  square.classList.add("square");
  square.classList.add("undraggable");

  const squareId = getSquareId(square);
  const node = new Node(squareId, COLOR_WHITE);
  graph.addNode(node);

  square.addEventListener("mouseover", updateGrid);
  square.addEventListener("click", updateGrid);

  children.push(square);

  row.appendChild(square);
}
/**
 * Create a NxN grid.
 * @param size The grid's number of rows and cols.
 */
function createGrid(size) {
  for (let i = 0; i < size; i++) {
    const row = createRow();
    for (let j = 0; j < size; j++) {
      createColumn(row);
    }
    grid.appendChild(row);
    rowCount++;
  }
  children.forEach((child) => createAdjacencies(child));
}
/**
 * The following events must be listened to
 * in order to control if the grid is only being
 * drawn into if the user is moving the mouse while
 * holding it down.
 */
/**
 * Variable that controls if the left mouse button
 * is being pressed.
 */
let mouseIsBeingHeld = false;
document.addEventListener("mousedown", () => {
  mouseIsBeingHeld = true;
});
document.addEventListener("mouseup", () => {
  mouseIsBeingHeld = false;
});
/**
 * Checks if mouse is being moved and held down.
 * @param event The event that triggers the function.
 */
function mouseIsMovingAndHeldDown(event) {
  if (event.type === "mouseover" && mouseIsBeingHeld) return true;
  return false;
}
/**
 * Updates the grid.
 * @param event The event that triggers the function.
 */
function updateGrid(event) {
  const squareId = getSquareId(event.target);

  if (event.type === "click") {
    if (currentMode === MODES.fill) {

      graph.breadthFirstSearch(
        squareId,
        graph.nodes[squareId].color,
        currentColor,
        new Set(),
        timeout
      );
      return;
    }
    graph.updateNodeColor(squareId, currentColor, currentBrushSize);
    return;
  }

  if (!mouseIsMovingAndHeldDown(event)) return;

  if (currentMode === MODES.color) {
    graph.updateNodeColor(squareId, currentColor, currentBrushSize);
    return;
  }
  if (currentMode === MODES.rainbow) {
    const randomRed = getRandomNumber();
    const randomGreen = getRandomNumber();
    const randomBlue = getRandomNumber();
    const randomColor = new Color(randomRed, randomGreen, randomBlue);

    graph.updateNodeColor(squareId, randomColor, currentBrushSize);
    return;
  }
  if (currentMode === MODES.eraser) {
    graph.updateNodeColor(squareId, COLOR_WHITE, currentBrushSize);
    return;
  }
}

createGrid(GRID_SIZE);

const rainbowButton = document.getElementById("rainbow");
const showGridButton = document.getElementById("show-grid");
const fillButton = document.getElementById("fill");
const colorPicker = document.querySelector("#color-picker");
const eraseAllButton = document.getElementById("erase-all");
const timeoutButton = document.getElementById("timeout");
/**
 * Object to hold the brush buttons and add the event
 * listener for each of them using a loop.
 */
const brushButtons = [
  { id: "brush", size: "medium" },
  { id: "small-brush", size: "small" },
  { id: "medium-brush", size: "medium" },
  { id: "big-brush", size: "big" },
];
/**
 * Object to hold the eraser buttons and add the event
 * listener for each of them using a loop.
 */
const eraserButtons = [
  { id: "eraser", size: "medium" },
  { id: "small-eraser", size: "small" },
  { id: "medium-eraser", size: "medium" },
  { id: "big-eraser", size: "big" },
];

brushButtons.forEach(button => {
  const element = document.getElementById(button.id);
  element.addEventListener("click", () => {
    currentBrushSize = button.size;
    currentMode = MODES.color;
  });
});

eraserButtons.forEach(button => {
  const element = document.getElementById(button.id);
  element.addEventListener("click", () => {
    currentBrushSize = button.size;
    currentMode = MODES.eraser;
  });
});

rainbowButton.addEventListener("click", () => {
  currentMode = MODES.rainbow;
});

fillButton.addEventListener("click", () => {
  currentMode = MODES.fill;
});

colorPicker.addEventListener("change", () => {
  /**Color in the hexadecimal value. */
  currentColor = new Color(
    parseInt(colorPicker.value.substr(1, 2), 16),
    parseInt(colorPicker.value.substr(3, 2), 16),
    parseInt(colorPicker.value.substr(5, 2), 16)
  );
});

eraseAllButton.addEventListener("click", () => {
  if(!confirm('Você deseja excluir o rascunho?')) return;
  currentMode = MODES.eraseAll;
  const squares = document.getElementsByClassName("square");

  [...squares].forEach((square) => {
    const squareId = getSquareId(square);
    graph.updateNodeColor(squareId, COLOR_WHITE);
  });
});

showGridButton.addEventListener("click", () => {
  const squares = document.getElementsByClassName("square");

  [...squares].forEach((square) => {
    square.classList.toggle("show-tracks");
  });
});

timeoutButton.addEventListener('click', () => {
  timeout = !timeout;
});
