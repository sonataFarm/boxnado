export function generateProperties(minCols, maxCols) {
  // calculates and returns the width, height, row count and column count
  // of a window-sized grid of square cells with minCols <= cols <= maxCols
  const [width, height] = [window.innerWidth, window.innerHeight];
  const cols = _.random(minCols, maxCols);
  const cellWidth = width / cols;
  const rows = Math.ceil(height / cellWidth);

  return { width, height, rows, cols };
}

export function configureCanvas(width, height) {
  $(this.canvas).attr('id', 'background-pattern');
  $(this.canvas).attr('width', `${width}px`);
  $(this.canvas).attr('height', `${height}px`);

  document.body.appendChild(this.canvas);
}

export default {
  generateProperties,
  configureCanvas
};
