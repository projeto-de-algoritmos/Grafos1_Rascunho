/**
 * A color handling class.
 */
export class Color {
  /**
   * Returns an object with the specified
   * red, green and blue values.
   * All values must be in the range [0, 255].
   * @param {number} red The red value.
   * @param {number} green The green value.
   * @param {number} blue The blue value.
   */
  constructor(red = 255, green = 255, blue = 255) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }
  /**
   * Get a string in the format `rgb(red, green, blue)`.
   */
  getRGB() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }
}
