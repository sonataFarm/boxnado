const Cell = require('./cell.js');
const Fade = require('./fade.js');
const Color = require('./color.js');
const RGBAColor = require('./rgba_color.js');
const _ = require('./lodash.js');

// cell width, in pixels
const CELL_WIDTH = {
  min: 20,
  max: 100
};

class Board {
  constructor(canvas) {
    this.setCanvas(canvas);
    this.cells  = [];

    this.cells.flatten = () => {
      return this.cells.reduce((array, row) => {
        return array.concat(row);
      });
    }

    this.cellWidth = _.random(CELL_WIDTH.min, CELL_WIDTH.max);
    this.cellHeight = this.cellWidth;

    this.hueRanges = Color.generateRandomRanges();

    for (let row = 0; row * this.cellHeight < this.canvas.height; row++) {
      this.cells[row] = [];

      for (let col = 0; col * this.cellWidth < this.canvas.width; col++) {
        this.cells[row][col] = new Cell(new Fade(this.hueRanges));
      }
    }
  }

  get colors() {
    // return array of all colors in board
    return this.cells.flatten().map((cell) => cell.color );
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
  }
}

module.exports = Board;

Math.random();
