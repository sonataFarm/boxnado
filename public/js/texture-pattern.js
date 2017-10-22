import Pattern, { factors } from './pattern';
import Color from './color';

class TexturePattern extends Pattern {
  constructor(width, height) {
    let rows, cols;
    rows = cols = _.sample(factors(width).slice(0, 3)); // assumes width = height

    const hueRanges = Color.generateRandomRanges();
    super(width, height, rows, cols, hueRanges);
    this.render();
  }
}

export default TexturePattern;
