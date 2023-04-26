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
};
/** The `mode` variable controls the possible modes
 * that the user can select to change the grid.
 */
let mode = MODES.color;
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
 * @param mode The mode of painting.
 */
function updateGrid(event) {
  const squareId = getSquareId(event.target);

  if (event.type === "click") {
    if (mode === MODES.fill) {
      const randomColor = new Color(
        getRandomNumber(),
        getRandomNumber(),
        getRandomNumber()
      );

      graph.breadthFirstSearch(
        squareId,
        graph.nodes[squareId].color,
        randomColor
      );
      return;
    }
    updateNodeColorAndPaintSquare(squareId, event.target, COLOR_BLACK);
    return;
  }

  if (!mouseIsMovingAndHeldDown(event)) return;

  if (mode === MODES.color) {
    updateNodeColorAndPaintSquare(squareId, event.target, COLOR_BLACK);
    return;
  }
  if (mode === MODES.rainbow) {
    const randomRed = getRandomNumber();
    const randomGreen = getRandomNumber();
    const randomBlue = getRandomNumber();
    const randomColor = new Color(randomRed, randomGreen, randomBlue);

    updateNodeColorAndPaintSquare(squareId, event.target, randomColor);
    return;
  }
  if (mode === MODES.eraser) {
    updateNodeColorAndPaintSquare(squareId, event.target, COLOR_WHITE);
    return;
  }
}
/**
 * Updates the graph's node color and it's square color.
 * @param {number} squareId Identifier of the node/square.
 * @param {*} square The square itself.
 * @param {*} color The node/square new color.
 */
function updateNodeColorAndPaintSquare(squareId, square, color) {
  graph.updateNodeColor(squareId, color);
}

createGrid(GRID_SIZE);

const rainbowButton = document.getElementById("rainbow");
const showGridButton = document.getElementById("show-grid");
const fillButton = document.getElementById("fill");
const colorButton = document.getElementById("color-picker");
const eraserButton = document.getElementById("eraser");
const eraseAllButton = document.getElementById("erase-all");
const pencilButton = document.getElementById("pencil");

rainbowButton.addEventListener("click", () => {
  mode = MODES.rainbow;
});

colorButton.addEventListener("click", () => {
  mode = MODES.color;
});

pencilButton.addEventListener("click", () => {
  mode = modes.color;
});

fillButton.addEventListener("click", () => {
  mode = MODES.fill;
});

eraserButton.addEventListener("click", () => {
  mode = MODES.eraser;
});

eraseAllButton.addEventListener("click", () => {
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
