import TexturePattern from './texture-pattern';

const WIDTH = 20;
const HEIGHT = 20;
const DEPTH = 20;
const FADE_RATE = 50;

class Box extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.BoxGeometry(WIDTH, HEIGHT, DEPTH);
    const pattern = new TexturePattern(WIDTH * 15, HEIGHT * 15);
    const texture  = new THREE.Texture(pattern.canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    const material = new THREE.MeshLambertMaterial({ map: texture, transparent: true, opacity: 1 });

    super(geometry, material);

    this.pattern = pattern;
    this.texture = texture;
    this.material = material;
    this.emissive = this.material.emissive;
  }

  animate(duration = null, interval = 1) {
    if (this.animationHandler) {
      this.stopAnimation();
    }

    this.animationHandler = setInterval(
      () => {
        this.pattern.tick();
        this.texture.needsUpdate = true;
      }, interval
    );
    console.log('set handler no.', this.animationHandler )

    if (duration) {
      setTimeout(this.stopAnimation, duration);
    }
  }

  stopAnimation() {
    clearInterval(this.animationHandler);
    console.log('cleared handler no.', this.animationHandler);
    this.animationHandler = null;
  }

  setOpacity(opacity) {
    this.material.opacity = opacity;
  }

  highlight(color) {
    this.material.emissive.setHex(color);
  }

  unhighlight() {
    this.material.emissive.setHex(this.emissive);
  }

  fadeToOpacity(targetOpacity, duration) {

    clearInterval(this.fadeHandler);
    const frames = duration / FADE_RATE;
    const delta = targetOpacity - this.material.opacity;
    const frameDelta = delta / frames;

    this.fadeHandler = setInterval(
      () => {
        if (Math.abs(targetOpacity - this.material.opacity) > Math.abs(frameDelta)) {
          this.setOpacity(this.material.opacity + frameDelta)
        } else {
          clearInterval(this.fadeHandler);
        }
      },
      FADE_RATE
    );

    // this.setTimeout(
    //   () => clearInterval(this.fadeHandler),
    //   duration
    // );
  }
}

export default Box;
