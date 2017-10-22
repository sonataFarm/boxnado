import Pattern, { factors } from './pattern';

const ANIMATION_RATE = 10; // frame rate in milliseconds

class BackgroundPattern extends Pattern {
  constructor(hueRanges) {
    const [width, height] = [window.innerWidth, window.innerHeight];

    const rows = _.sample(factors(width).slice(0, 20));
    const cellWidth = width / rows;
    const cols = factors(height).map(
      factor => ({ cols: factor, difference: Math.abs((height / factor) - cellWidth) })
    ).sort(
      (a, b) => a.difference - b.difference
    )[0].cols; // obtain cols which divides height evenly
               // and results in "squarest" possible cells, given cell width
    super(width, height, rows, cols, hueRanges);
    $(this.canvas).attr('id', 'background-pattern');

    this.animate();
  }

  animate() {
    this.animationHandler = setInterval(this.tick.bind(this), ANIMATION_RATE)
  }

  clear() {
    $(this.canvas).remove();
    clearInterval(this.animationHandler);
  }
}

export default BackgroundPattern;
