import { Color } from "./color.js";

export const GRID_SIZE = 100;
export const COLOR_WHITE = new Color(255, 255, 255);
export const COLOR_BLACK = new Color(0, 0, 0);
/**
 * Get a random integer between
 * 0 and 255.
 */
export function getRandomNumber() {
  return Math.floor(Math.random() * 1000) % 256;
}
/**
 * Get a square's identifier.
 * @param square The square of interest.
 */
export function getSquareId(square) {
  return +square.id.split("_")[1];
}
/**
 * Get a Square(which is also a Node of a Graph)
 * by its id.
 * @param id The identifier of the Square.
 * @returns The Square.
 */
export function getSquareById(id) {
  return document.getElementById(`sq_${id}`);
}

/**
 * Check if two Colors are equal.
 */
export function colorsAreEqual(color1, color2) {
  if (color1.red !== color2.red) return false;
  if (color1.green !== color2.green) return false;
  if (color1.blue !== color2.blue) return false;
  return true;
}
