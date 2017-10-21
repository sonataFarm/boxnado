const WIDTH = 20;
const HEIGHT = 20;
const DEPTH = 20;

class Box extends THREE.Mesh {
  constructor(canvas) {
    const geometry = new THREE.BoxGeometry(WIDTH, HEIGHT, DEPTH);
    const texture  = new THREE.Texture(canvas);
    const material = new THREE.MeshLambertMaterial({ map: texture });
    super(geometry, material);
    this.canvas = canvas;
  }

  tick() {

  }
}

export default Box;
