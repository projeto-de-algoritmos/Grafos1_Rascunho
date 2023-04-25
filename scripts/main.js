const grid = document.querySelector('.grid');
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
 * Creates a column of a grid.
 * @param row The row in which the column is inserted.
 */
function createColumn (row) {
  const square = document.createElement('div');
  square.classList.add('square');
  square.classList.add('undraggable');
  square.addEventListener('mouseover', changeSquareColor);
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
})
document.addEventListener('mouseup', ()=> {
  mouseIsBeingHeld = false;
})
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
 * Changes the square color.
 * @param event The event that triggers the function.
 */
function changeSquareColor (event){
  if( !mouseIsMovingAndHeldDown(event) ) return;
  event.target.style.backgroundColor = 'black';
}
createGrid(100);
