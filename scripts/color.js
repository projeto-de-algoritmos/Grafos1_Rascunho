
export class Color {
  constructor(red, green, blue){
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  getRGB() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }
}