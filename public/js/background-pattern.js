import Pattern, { factors } from './pattern';

const ANIMATION_RATE = 1; // frame rate in milliseconds

class BackgroundPattern extends Pattern {
  constructor(hueRanges) {
    const [width, height] = [window.innerWidth, window.innerHeight];

    const cols = _.random(1, 100);
    const cellWidth = width / cols;
    const rows = Math.ceil(height / cellWidth);
    const cellHeight = height / rows;

    super(width, height, rows, cols, hueRanges);
    $(this.canvas).attr('id', 'background-pattern');
    $(this.canvas).attr('width', `${width}px`);
    $(this.canvas).attr('height', `${height}px`);

    document.body.appendChild(this.canvas);

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
