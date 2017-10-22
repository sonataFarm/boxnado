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
  }

  animateTexture(duration = null, interval = 1) {
    const handler = setInterval(
      () => {
        this.pattern.tick();
        this.texture.needsUpdate = true;
      }, interval
    );

    if (duration) {
      setTimeout(() => clearInterval(handler), duration);
    }
  }

  setOpacity(opacity) {
    this.material.opacity = opacity;
  }

  highlight() {
    this.currentHex = this.material.emissive.getHex();
    this.material.emissive.setHex(0x999999);
  }

  unhighlight() {
    this.material.emissive.setHex(this.currentHex);
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
