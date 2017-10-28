import Pattern from './pattern';
import BackgroundPattern from './background-pattern';
import Color from './color';
import Cell from './cell';

const MIN_COLS = 50;
const MAX_COLS = 100;
const ANIMATION_RATE = 25;
const FADE_RATE_MIN = 1;
const FADE_RATE_MAX = 50;
const FADE_RATE_VARIANCE = 1;

class BackgroundFlowPattern extends Pattern {
  constructor(color) {
    const {
      width,
      height,
      rows,
      cols
    } = BackgroundPattern.generateProperties(MIN_COLS, MAX_COLS);
    if (!color) color = Color.random();

    super({ width, height, rows, cols});
    this.initializeCells(Cell, color);
    BackgroundPattern.configureCanvas.bind(this)(width, height);
    window.p = this;

    this.fadeRates = {
      red: _.random(FADE_RATE_MIN, FADE_RATE_MAX, true),
      green: _.random(FADE_RATE_MIN, FADE_RATE_MAX, true),
      blue: _.random(FADE_RATE_MIN, FADE_RATE_MAX, true),
    }

    this.animate();
  }

  generateNextCells() {
    const nextCell = new Cell(this.generateNextColor());
    const cells = _.flatten(this.cells);

    this.cells = [
      nextCell,
      ...cells.slice(0, -1)
    ].reduce((rows, cell, idx) => {
      const rowIdx = Math.floor(idx / this.colCount);
      if (!rows[rowIdx]) rows.push([]);
      rows[rowIdx].push(cell);
      return rows;
    }, []);
  }

  generateNextColor() {
    // generates next color of this.cells[0][0]
    const firstColor = this.cells[0][0].color;
    const hues = {
      red: firstColor.red + this.fadeRates.red,
      green: firstColor.green + this.fadeRates.green,
      blue: firstColor.blue + this.fadeRates.blue
    }

    for (let hue in this.fadeRates) {
      if (this.fadeRates.hasOwnProperty(hue)) {
        // reverse fadeRate if resulting hue exceeds value range
        if (hues[hue] > 255 || hues[hue] < 0) {
          this.fadeRates[hue] *= -1;
          hues[hue] += this.fadeRates[hue] * 2;
        }
      }
    }

    return new Color(hues.red, hues.green, hues.blue);
  }

  animate() {
    this.animationHandler = setInterval(
      this.tick.bind(this),
      ANIMATION_RATE
    );
  }

  stopAnimation() {
    clearInterval(this.animationHandler);
    this.animationHandler = null;
  }

  tick() {
    this.generateNextCells();
    this.render();
  }
}

export default BackgroundFlowPattern
