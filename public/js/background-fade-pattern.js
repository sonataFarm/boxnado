import FadePattern from './fade-pattern';
import { factors } from './pattern';

const ANIMATION_RATE = 1; // frame rate in milliseconds
const MIN_COLS = 1;
const MAX_COLS = 100;

class BackgroundFadePattern extends FadePattern {
  constructor(options) {
    const { hueRanges } = options;

    const [width, height] = [window.innerWidth, window.innerHeight];

    const cols = _.random(MIN_COLS, MAX_COLS);
    const cellWidth = width / cols;
    const rows = Math.ceil(height / cellWidth);

    super({ width, height, rows, cols, hueRanges });

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

export default BackgroundFadePattern;
