Color = require('./color.js');

class Light {
  constructor(colorProfile) {
    this.color = this.setColor(colorProfile);
  }

  setColor(colorProfile) {
    if (colorProfile) {
      // deal with colorprofile (rgba)
    }
    return Color.random();
  }
}

module.exports = Light;
