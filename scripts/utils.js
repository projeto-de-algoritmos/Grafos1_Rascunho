export const GRID_SIZE = 100;
export const COLOR_WHITE = 'rgb(255,255,255)';
export const COLOR_BLACK = 'rgb(0,0,0)';
/**
 * Get a random integer between 
 * 0 and 255.
 */
export function getRandomNumber(){ 
  return Math.floor(Math.random() * 1000) % 256;
}