import Pattern from './pattern';

const WIDTH = 20;
const HEIGHT = 20;
const DEPTH = 20;

class Box extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.BoxGeometry(WIDTH, HEIGHT, DEPTH);
    const pattern = new Pattern(WIDTH * 15, HEIGHT * 15);
    const texture  = new THREE.Texture(pattern.canvas);
    texture.needsUpdate = true;
    const material = new THREE.MeshLambertMaterial({ map: texture });

    super(geometry, material);

    this.pattern = pattern;
  }

  tick() {
    this.pattern.tick();
  }
}

export default Box;
