
const CAMERA_RADIUS = 100; // radius of camera from center scene
const FOV = 70;
const CAMERA_NEAR = 1;
const CAMERA_FAR = 10000;

const BACKGROUND_CLR = 0x000000;
const LIGHT_CLR = 0xffffff;
const LIGHT_INTENSITY = 1;

const NUM_BOXES = 500;
const BOX_FIELD_RADIUS = 400;
const BOX_SCALE_VARIANCE = 0.5;

const TWO_PI = 2 * Math.PI;
const THETA_ADVANCE = 0.1;

const mouse = new THREE.Vector2();

let camera, raycaster, renderer, scene;
let intersected = null;

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

  camera.position.y = CAMERA_RADIUS;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(BACKGROUND_CLR);

  // add light source
  const light = new THREE.DirectionalLight(LIGHT_CLR, LIGHT_INTENSITY);
  light.position.set(0, 1, 0).normalize();
  scene.add(light);

  const geometry = new THREE.BoxGeometry(20, 20, 20);

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

  window.addEventListener('resize', onWindowResize);
  document.addEventListener('mousemove', onDocumentMouseMove);
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

  // update camera position
  camera.position.x = CAMERA_RADIUS * Math.sin(THREE.Math.degToRad(theta));
  // camera.position.y = CAMERA_RADIUS * Math.cos(THREE.Math.degToRad(theta));
  camera.position.z = CAMERA_RADIUS * Math.cos(THREE.Math.degToRad(theta));
  camera.lookAt(scene.position);
  camera.updateMatrixWorld();
  console.log(camera.position);

  // find and handle mouse intersections
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  console.log(mouse);

  if (intersects.length > 0) {
    if (intersected !== intersects[0].object) {
      if (intersected) intersected.material.emissive.setHex(intersected.currentHex);

      intersected = intersects[0].object;
      intersected.currentHex = intersected.material.emissive.getHex();

      scene.background = intersected.material.color;
      intersected.material.emissive.setHex(0x999999);
    }
  } else if (intersected) {
    intersected.material.emissive.setHex(intersected.currentHex);
    scene.background = new THREE.Color(BACKGROUND_CLR);
    intersected = null;
  }

  renderer.render(scene, camera);
}

function onDocumentMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
