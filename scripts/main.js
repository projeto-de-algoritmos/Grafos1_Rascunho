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

createGrid(20);