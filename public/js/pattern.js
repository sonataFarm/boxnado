import Cell from './cell';
import Fade from './fade';
import Color from './color';

function factors(n) {
  const factors = [];

  for (let i = 1; i <= n; i++) {
    if (n % i === 0) factors.push(i);
  }

  return factors;
}

class Pattern {
  constructor(width, height) {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    this.setCanvas(canvas);
    this.width = width;
    this.height = height;

    this.cellHeight = this.cellWidth = _.shuffle(factors(this.width))[0];

    this.hueRanges = Color.generateRandomRanges();

    this.cells = [];
    for (let row = 0; row * this.cellHeight < this.height; row++) {
      this.cells[row] = [];

      for (let col = 0; col * this.cellWidth < this.width; col++) {
        this.cells[row][col] = new Cell(new Fade(this.hueRanges));
      }
    }

    this.render();
  }

  render() {
    this.cells.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        this.ctx.fillStyle = cell.color.toCssString();
        this.ctx.fillRect(
          colIdx * this.cellWidth,
          rowIdx * this.cellHeight,
          this.cellWidth,
          this.cellHeight
        );
      });
    });
  }

  get colors() {
    // return array of all colors in pattern
    return _.flatten(this.cells).map((cell) => cell.color );
  }

  getLightestColor() {
    return this.colors.reduce((lightest, color) => {
      if (color.luminance > lightest.luminance) {
        return color;
      } else {
        return lightest;
      }
    });
  }

  getDarkestColor() {
    return this.colors.reduce((darkest, color) => {
      if (color.luminance < darkest.luminance) {
        return color;
      } else {
        return darkest;
      }
    });
  }

  setCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.clear();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getAverageColor() {
    const numCells = this.cells.length * this.cells[0].length;
    const averageHues = this.cells.reduce((averages, row) => {
      return row.reduce((averages, cell) => {
        averages.red += cell.color.red / numCells;
        averages.green += cell.color.green / numCells;
        averages.blue += cell.color.blue / numCells;
        return averages;
      }, averages);
    }, {red: 0, green: 0, blue: 0});

    let {red, green, blue} = averageHues;

    return new Color(red, green, blue);
  }

  tick() {
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        cell.tick();
      });
    });
    this.render();
  }
}

export default Pattern;
