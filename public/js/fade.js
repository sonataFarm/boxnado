import Cell from './cell';
import Color from './color';

const FADE_RATE_MULTIPLIER = 0.80;

class Fade extends Cell {
  constructor(options) {
    // hueRanges is:
    // { red: { lo, hi}, green: { lo, hi }, blue: { lo, hi } }
    const { hueRanges } = options;
    super(Color.random(hueRanges));
    this.hueRanges = hueRanges;
    this.fadeParams = this.initializeFadeParams();
  }

  // public
  tick() {
    this.fade();
  }

  // private
  fade() {
    for (let hue in this.fadeParams) {
      this.fadeHue(hue);
      const hueLevel = this.color[hue];
      const hueRange = this.hueRanges[hue];
      if (hueLevel > hueRange.hi) {
        this.color[hue] = hueRange.hi;
        this.fadeParams[hue].direction = 'down';
      } else if (hueLevel < hueRange.lo) {
        this.color[hue] = hueRange.lo;
        this.fadeParams[hue].direction = 'up';
      }
    }
  }

  hueInRange(hue) {
    const hueLevel = this.color[hue];
    const hueRange = this.hueRanges[hue];

    return hueLevel >= hueRange.lo && hueLevel <= hueRange.hi
  }

  fadeHue(hue) {
    const hueParams = this.fadeParams[hue];
    const rate = hueParams.direction === 'up' ? hueParams.rate : -hueParams.rate;
    this.color[hue] += rate * FADE_RATE_MULTIPLIER;
  }

  reverseDirection(hue) {
    let newDirection;

    if (this.fadeParams[hue].direction === 'up') {
      this.color[hue] = this.hueRanges[hue].hi;
      this.fadeParams[hue].direction = 'down';
    } else {
      this.color[hue] = this.hueRanges[hue].lo;
      this.fadeParams[hue].direction = 'up';
    }
  }

  initializeColor() {
    return new Color(0, 0, 0);
  }

  initializeFadeParams() {
    // return object:
    const fadeParams =
      {
        red: {
          direction: Fade.randomDirection(),
          rate: Math.random()
        },

        green: {
          direction: Fade.randomDirection(),
          rate: Math.random()
        },

        blue: {
          direction: Fade.randomDirection(),
          rate: Math.random()
        }
      };

    return fadeParams;
  }

  static randomDirection() {
    return _.sample(['up', 'down']);
  }
}

export default Fade;
