class CanvasRender {
  constructor(boards) {
    this.boards = boards;
  }

  tick() {
    this.boards.forEach(board => this.renderBoard(board));
  }

  renderBoard(board) {
    // this.resizeCanvasToWindow(board);
    board.cells.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
          board.ctx.fillStyle = cell.color.toCssString();
          board.ctx.fillRect(
            colIdx * board.cellWidth,
            rowIdx * board.cellHeight,
            board.cellWidth,
            board.cellHeight
          );
      });
    });
  }
}

module.exports = CanvasRender;
