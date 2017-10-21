const mouse = new THREE.Vector2();

const CAMERA_RADIUS = 100; // radius of camera from center scene
const FOV = 70;
const CAMERA_NEAR = 1;
const CAMERA_FAR = 10000;

const BACKGROUND_CLR = 0xf0f0f0;
const LIGHT_CLR = 0xffffff;
const LIGHT_INTENSITY = 1;

const NUM_BOXES = 500;
const BOX_FIELD_RADIUS = 400;
const BOX_SCALE_VARIANCE = 0.5;

const TWO_PI = 2 * Math.PI;
const THETA_ADVANCE = 0.1;

let camera, raycaster, renderer, scene;

let theta = 0;
init();
animate();

function init() {
  const container = document.createElement('div');
  document.body.appendChild(container);

  let aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(
    FOV, aspect, CAMERA_NEAR, CAMERA_FAR
  );

  scene = new THREE.Scene();
  scene.background = new THREE.Color(BACKGROUND_CLR);

  // add light source
  const light = new THREE.DirectionalLight(LIGHT_CLR, LIGHT_INTENSITY);
  light.position.set(1, 1, 1).normalize();
  scene.add(light);

  const geometry = new THREE.BoxBufferGeometry(20, 20, 20);

  for (var i = 0; i < NUM_BOXES; i++) {
    let object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }) );

    // assign random position
    object.position.x = _.random(-BOX_FIELD_RADIUS, BOX_FIELD_RADIUS);
    object.position.y = _.random(-BOX_FIELD_RADIUS, BOX_FIELD_RADIUS);
    object.position.z = _.random(-BOX_FIELD_RADIUS, BOX_FIELD_RADIUS);

    // assign random rotation
    object.rotation.x = _.random(TWO_PI);
    object.rotation.y = _.random(TWO_PI);
    object.rotation.z = _.random(TWO_PI);

    object.scale.x = Math.random() + BOX_SCALE_VARIANCE;
    object.scale.y = Math.random() + BOX_SCALE_VARIANCE;
    object.scale.z = Math.random() + BOX_SCALE_VARIANCE;

    scene.add(object);
    window.s = scene;

  }

  raycaster = new THREE.Raycaster();

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize)
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  theta += THETA_ADVANCE;
  theta %= 360;
  radians =

  // update camera position
  camera.position.x = CAMERA_RADIUS * Math.sin(THREE.Math.degToRad(theta));
  camera.position.y = CAMERA_RADIUS * Math.cos(THREE.Math.degToRad(theta));
  camera.position.z = CAMERA_RADIUS * Math.cos(THREE.Math.degToRad(theta));
  console.log(camera.position);
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}
