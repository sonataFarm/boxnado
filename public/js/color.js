const COLOR_MAX = 255;
const MIN_CONTRAST = 4.5;

class Color {
  static random(hueRanges) {
    let red, green, blue;

    if (hueRanges) {
      red = _.random(hueRanges.red.lo, hueRanges.red.hi);
      green = _.random(hueRanges.green.lo, hueRanges.green.hi);
      blue = _.random(hueRanges.blue.lo, hueRanges.blue.hi);
    } else {
      red = Color.randomRGBValue();
      green = Color.randomRGBValue();
      blue = Color.randomRGBValue();
    }

    return new Color(red, green, blue);
  }


  static randomRGBValue() {
    return Math.floor((Math.random() * COLOR_MAX));
  }

  static fromString(colorString) {
    const rgb = colorString.slice(4).slice(0, -1)
    .split(', ')
    .map((num) => parseInt(num));

    return new Color(...rgb);
  }

  static generateRandomRanges() {
    return ['red', 'green', 'blue'].reduce(
      (distributions, hue) => {
        const [lo, hi] = [
          Math.floor(Math.random() * COLOR_MAX),
          Math.floor(Math.random() * COLOR_MAX)
        ].sort((a, b) => a - b);

        distributions[hue] = {lo, hi};

        return distributions;
      }, {});
    }

  static randomHue() {
    const hues = ['red', 'green', 'blue'];
    const randIdx = Math.random() * hues.length;

    return hues[randIdx];
  }

  contrastsWith(otherColor) {
    return Color.contrast(this, otherColor) >= MIN_CONTRAST;
  }

  mask(color2) {
    // return average of self and color2
    let red = (this.red + color2.red) / 2;
    let green = (this.green + color2.green) / 2;
    let blue = (this.blue + color2.blue) / 2;

    return new Color(red, green, blue);
  }


  constructor(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  toCssString() {
    const [red, green, blue] =
    [Math.floor(this.red), Math.floor(this.green), Math.floor(this.blue)];

    return `rgb(${red}, ${green}, ${blue})`
  }

  toString() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  get luminance() {
    let hues = [this.red, this.green, this.blue];

    hues = hues.map(hue => {
      hue /= COLOR_MAX;
      return hue <= 0.03928 ? hue / 12.92 : Math.pow( (hue + 0.055) / 1.055, 2.4 );
    });

    return hues[0] * 0.2126 + hues[1] * 0.7152 + hues[2] * 0.0722;
  }

  static contrast(color1, color2) {
    return (color1.luminance + 0.05) / (color2.luminance + 0.05);
  }

  get lightness() {
    const red = this.red / 255;
    const green = this.green / 255;
    const blue = this.blue / 255;

    const cmin = Math.min(red, green, blue);
    const cmax = Math.max(red, green, blue);

    return (cmax + cmin) / 2;
  }

  getContrastYIQ() {
  	let yiq = ((this.red * 299) + (this.green * 587) + (this.blue * 114)) / 1000;
  	return (yiq >= 128) ? new Color(0, 0, 0) : new Color(255, 255, 255);
  }
}

export default Color;
