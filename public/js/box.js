import TexturePattern from './texture-pattern';

const WIDTH = 20;
const HEIGHT = 20;
const DEPTH = 20;

const ANIMATION_INTERVAL = 10;

class Box extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.BoxGeometry(WIDTH, HEIGHT, DEPTH);
    const pattern = new TexturePattern(WIDTH * 15, HEIGHT * 15);
    const texture  = new THREE.Texture(pattern.canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    const material = new THREE.MeshLambertMaterial({ map: texture });

    super(geometry, material);

    this.pattern = pattern;
    this.texture = texture;
  }
}

export default Box;
