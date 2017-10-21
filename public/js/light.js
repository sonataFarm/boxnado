import Color from './color'

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

export default Light;
