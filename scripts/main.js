import { GraphAdjList } from "./graphAdjList.js";
import { Node } from "./node.js";
import {
  COLOR_BLACK,
  COLOR_WHITE,
  GRID_SIZE,
  getRandomNumber,
  getSquareById,
  getSquareId,
  getRGB
} from "./utils.js";


const grid = document.querySelector(".grid");
const graph = new GraphAdjList();
let idCount = 1;
let rowCount = 1;
let children = [];
/**
 * All the possible modes that the user can select
 * to change the grid.
 */
const modes = {
  color: "color",
  rainbow: "rainbow",
  eraser: "eraser",
  fill: "fill",
};
/** The `mode` variable controls the possible modes
 * that the user can select to change the grid.
 */
let mode = modes.color;
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

function createAdjacencies(rootSquare) {
  const rootNodeId = getSquareId(rootSquare);
  const rootNode = new Node(rootNodeId, rootSquare.style.backgroundColor);

  // upper adjacency
  const upperAdjacencyId = rootNodeId - GRID_SIZE;
  if (upperAdjacencyId > 0) {
    const upperAdjacentSquare = getSquareById(upperAdjacencyId);
    const upperNode = new Node(
      upperAdjacencyId,
      upperAdjacentSquare.style.backgroundColor
    );
    graph.createAdjacency(rootNode, upperNode);
  }

  // rightmost adjacency
  const rightmostAdjacencyId = rootNodeId + 1;
  const rightmostAdjacentSquare = getSquareById(rightmostAdjacencyId);
  if (
    rightmostAdjacencyId <= GRID_SIZE * GRID_SIZE &&
    +rightmostAdjacentSquare.getAttribute("row") ===
      +rootSquare.getAttribute("row")
  ) {
    const rightNode = new Node(
      rightmostAdjacencyId,
      rightmostAdjacentSquare.style.backgroundColor
    );
    graph.createAdjacency(rootNode, rightNode);
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

  square.style.backgroundColor = COLOR_WHITE;

  square.classList.add("square");
  square.classList.add("undraggable");

  square.addEventListener("mouseover", updateGrid);
  square.addEventListener("click", updateGrid);

  const squareId = getSquareId(square);
  const node = new Node(squareId, COLOR_WHITE);
  graph.addNode(node);

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
  if (event.type === "mouseover" && mouseIsBeingHeld) {
    return true;
  }
}

/**
 * Updates the grid.
 * @param event The event that triggers the function.
 * @param mode The mode of painting.
 */
function updateGrid(event) {
  const squareId = getSquareId(event.target);
  if (event.type === "click" && mode === modes.fill) {
    const rootNode = graph.nodes[squareId];
    const squareColor = rootNode.color;
    graph.breadthFirstSearch(rootNode, squareColor, getRGB(getRandomNumber(), getRandomNumber(), getRandomNumber()));
    return;
  }
  if (event.type === "click") {
    paintSquare(event.target, COLOR_BLACK);
    graph.updateNodeColor(squareId, COLOR_BLACK);
    return;
  }
  if (!mouseIsMovingAndHeldDown(event)) return;
  if (mode === modes.color) {
    paintSquare(event.target, COLOR_BLACK);
  }
  if (mode === modes.rainbow) {
    const randomRed = getRandomNumber();
    const randomGreen = getRandomNumber();
    const randomBlue = getRandomNumber();

    paintSquare(event.target, getRGB(randomRed, randomGreen, randomBlue));
  }
  if (mode === modes.eraser) {
    paintSquare(event.target, COLOR_WHITE);
  }
  graph.updateNodeColor(squareId, event.target.style.backgroundColor);
}
/**
 * Changes the background color of a square.
 * @param square The square of interest.
 * @param color The new background color.
 */
function paintSquare(square, color) {
  square.style.backgroundColor = color;
}

createGrid(GRID_SIZE);

const rainbowButton = document.getElementById("rainbow");
const showGridButton = document.getElementById("show-grid");
const fillButton = document.getElementById("fill");
const colorButton = document.getElementById("color-picker");
const eraserButton = document.getElementById("eraser");
const eraseAllButton = document.getElementById("erase-all");
/*
rainbowButton.addEventListener("click", () => {
  mode = modes.rainbow;
});*/

colorButton.addEventListener("click", () => {
  mode = modes.color;
});

fillButton.addEventListener("click", () => {
  mode = modes.fill;
});

eraserButton.addEventListener("click", () => {
  mode = modes.eraser;
});

eraseAllButton.addEventListener("click", () => {
  const squares = document.getElementsByClassName("square");
  [...squares].forEach((square) => {
    paintSquare(square, COLOR_WHITE);
  });
});

showGridButton.addEventListener("click", () => {
  const squares = document.getElementsByClassName("square");
  [...squares].forEach((square) => {
    square.classList.toggle("show-tracks");
  });
});
