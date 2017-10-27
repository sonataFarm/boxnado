import Pattern, { factors } from './pattern';
import Fade from './fade';
import Color from './color';

class FadePattern extends Pattern {
  constructor(options) {
    let { width, height, rows, cols, hueRanges } = options;

    if (!rows || !cols) {
      rows = cols = _.sample(factors(width).slice(0, 10)); // assumes width == height
    }

    super({ width, height, rows, cols });
    this.hueRanges = hueRanges || Color.generateRandomHueRanges();
    this.initializeCells(Fade, { hueRanges: this.hueRanges });

    this.render();
  }
}

export default FadePattern;
