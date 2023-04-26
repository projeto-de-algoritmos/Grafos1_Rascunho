import { GraphAdjList } from './graphAdjList.js';
import { Node } from './node.js';
import { COLOR_BLACK, COLOR_WHITE, GRID_SIZE, getRandomNumber }from './utils.js';

const grid = document.querySelector('.grid');
const graph = new GraphAdjList();
let idCount = 1;
/**
 * All the possible modes that the user can select
 * to change the grid.
 */
const modes = {
  color: 'color',
  rainbow: 'rainbow',
  eraser: 'eraser',
  fill: 'fill',
};
/** The `mode` variable controls the possible modes
 * that the user can select to change the grid.
 */
let mode = modes.color;
/**
 * Creates a row of a grid.
 * @returns The new row.
 */
function createRow () {
  const row = document.createElement('div');
  row.classList.add('grid-row');
  row.classList.add('flex');
  return row;
}
/**
 * Get a square's identifier.
 * @param square The square of interest.
 */
function getSquareId(square){
  return +square.id.split('_')[1];
}
/**
 * Creates a column of a grid.
 * @param row The row in which the column is inserted.
 */
function createColumn (row) {
  const square = document.createElement('div');
  square.setAttribute('id', `sq_${idCount++}`);
  const squareId = getSquareId(square);
  graph.addNode(new Node(squareId, COLOR_WHITE));
  square.classList.add('square');
  square.classList.add('undraggable');
  square.addEventListener('mouseover', updateGrid);
  square.addEventListener('click', updateGrid);

  row.appendChild(square);
}
/**
 * Create a NxN grid.
 * @param size The grid's number of rows and cols.
 */
function createGrid (size) {
  for(let i = 0; i < size; i++){
    const row = createRow();
    for(let j = 0; j < size; j++){
      createColumn(row);
    }
    grid.appendChild(row);
  }
}
/**
 * The following events must be listened to 
 * in order to control if the grid is only being
 * drawn into if the user is moving the mouse while
 * holding it down.
 */
let mouseIsBeingHeld = false;
document.addEventListener('mousedown', () => {
  mouseIsBeingHeld = true;
});
document.addEventListener('mouseup', ()=> {
  mouseIsBeingHeld = false;
});
/**
 * Checks if mouse is being moved and held down.
 * @param event The event that triggers the function.
 */
function mouseIsMovingAndHeldDown (event) {
  if(event.type === 'mouseover' && mouseIsBeingHeld) {
    return true;
  }
}

/**
 * Updates the grid.
 * @param event The event that triggers the function.
 * @param mode The mode of painting.
 */
function updateGrid (event) {
  const squareId = getSquareId(event.target);
  if(event.type === 'click' && mode !== modes.fill) {
    paintSquare(event.target, COLOR_BLACK);
    graph.updateNodeColor(squareId, COLOR_BLACK);
    return;
  }
  if( !mouseIsMovingAndHeldDown(event) || mode === modes.fill) return;
  if(mode === modes.color){
    paintSquare(event.target, COLOR_BLACK);
  }
  if(mode === modes.rainbow){
    const rgb = `rgb(${getRandomNumber()},${getRandomNumber()},${getRandomNumber()})`;
    paintSquare(event.target, rgb);
  }
  if(mode === modes.eraser){
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

const rainbowButton = document.getElementById('rainbow');
const showGridButton = document.getElementById('show-grid');
const fillButton = document.getElementById('fill');
const colorButton = document.getElementById('color');
const eraserButton = document.getElementById('eraser');

rainbowButton.addEventListener('click', () => {
  mode = modes.rainbow;
});

colorButton.addEventListener('click', () => {
  mode = modes.color;
});

fillButton.addEventListener('click', () => {
  mode = modes.fill;
});

eraserButton.addEventListener('click', () => {
  mode = modes.eraser;
});

showGridButton.addEventListener('click', () => {
  const squares = document.getElementsByClassName('square');
  [...squares].forEach(square=>{
    square.classList.toggle('show-tracks');
  });
});
