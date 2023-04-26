export const GRID_SIZE = 100;
export const COLOR_WHITE = 'white';
export const COLOR_BLACK = 'black';
/**
 * Get a random integer between 
 * 0 and 255.
 */
export function getRandomNumber(){ 
  return Math.floor(Math.random() * 1000) % 256;
}