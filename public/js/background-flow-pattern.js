import Pattern from './pattern';
import BackgroundPattern from './background-pattern';
import Color from './color';
import Cell from './cell';

const MIN_COLS = 50;
const MAX_COLS = 100;
const ANIMATION_RATE = 1;

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
    return new Color(255, 0, 0);
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
