import Pattern from './pattern';
import BackgroundPattern from './background-pattern';

const MIN_COLS = 50;
const MAX_COLS = 100;

class BackgroundFlowPattern extends Pattern {
  constructor(color) {
    const {
      width,
      height,
      rows,
      cols
    } = BackgroundPattern.generateProperties(MIN_COLS, MAX_COLS);

    super({ width, height, rows, cols});

    this.initializeCells(Cell, color);
  }
}
