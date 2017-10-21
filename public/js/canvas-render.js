class CanvasRender {
  constructor(patterns) {
    this.patterns = patterns;
  }

  tick() {
    this.patterns.forEach(pattern => this.renderPattern(pattern));
  }

  renderPattern(pattern) {
    // this.resizeCanvasToWindow(pattern);
    pattern.cells.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
          pattern.ctx.fillStyle = cell.color.toCssString();
          pattern.ctx.fillRect(
            colIdx * pattern.cellWidth,
            rowIdx * pattern.cellHeight,
            pattern.cellWidth,
            pattern.cellHeight
          );
      });
    });
  }
}

module.exports = CanvasRender;
