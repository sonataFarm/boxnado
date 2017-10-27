import BackgroundFadePattern from './background-fade-pattern';
import Box from './box';

const CAMERA_RADIUS = 100; // radius of camera from center scene
const FOV = 70;
const CAMERA_NEAR = 1;
const CAMERA_FAR = 10000;

const BACKGROUND_CLR = 0xff0000;
const LIGHT_CLR = 0xffffff;
const LIGHT_INTENSITY = 1;

const NUM_BOXES = 750;
const BOX_FIELD_RADIUS = 400;
const BOX_SCALE_VARIANCE = 0.5;
const HIGHLIGHT_CLR = 0x222222;

const TWO_PI = 2 * Math.PI;
const THETA_ADVANCE = 0.1;
const BACKGROUND_ANIMATION_DURATION = 2000;
const FADE_DURATION = 750;
const DOVETAIL = 1500;


const mouse = new THREE.Vector2();

let camera, raycaster, renderer, scene, background, selected, prevSelected;
const boxes = [];
let animating = false;
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

  // !!! testing and debugging
  window.s = scene;
  // !!! end

  // add light source
  const light = new THREE.DirectionalLight(LIGHT_CLR, LIGHT_INTENSITY);
  light.position.set(0, 1, 0).normalize();
  scene.add(light);

  const geometry = new THREE.BoxGeometry(20, 20, 20);

  // generate boxes
  for (var i = 0; i < NUM_BOXES; i++) {
    let box = new Box();

    box.position.x = _.random(-BOX_FIELD_RADIUS, BOX_FIELD_RADIUS);
    box.position.y = _.random(-BOX_FIELD_RADIUS, BOX_FIELD_RADIUS);
    box.position.z = _.random(-BOX_FIELD_RADIUS, BOX_FIELD_RADIUS);

    box.rotation.x = _.random(TWO_PI);
    box.rotation.y = _.random(TWO_PI);
    box.rotation.z = _.random(TWO_PI);

    scene.add(box);
    boxes.push(box);
  }

  raycaster = new THREE.Raycaster();

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setClearColor(BACKGROUND_CLR, 0);

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize);
  window.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseDown(event) {
  event.preventDefault();
  if (!intersected) return;

  intersected.unhighlight();
  commenceSelectSequence();
}

function commenceSelectSequence() {
  if (background) background.clear();

  animating = true;
  selected = intersected;
  intersected = null;

  fadeBoxesOut();
  selected.animate();
  const { hueRanges } = selected.pattern;
  background = new BackgroundFadePattern({ hueRanges });

  setTimeout(endSelectSequence, BACKGROUND_ANIMATION_DURATION);
}

function endSelectSequence() {
  background.clear();
  fadeBoxesIn();

  prevSelected = selected;
  selected = null;

  setTimeout(() => {
    prevSelected.stopAnimation();
  }, DOVETAIL);

  animating = false;
}

function fadeBoxesOut() {
  boxes.filter(
    box => box !== selected
  ).forEach(
    box => box.fadeToOpacity(0, FADE_DURATION)
  );
}

function fadeBoxesIn() {
  boxes.forEach(
    box => box.fadeToOpacity(1, FADE_DURATION)
  );
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {

  if (!animating) {
    theta = theta + THETA_ADVANCE % 360;
    // update camera position
    camera.position.x = CAMERA_RADIUS * Math.sin(THREE.Math.degToRad(theta));
    camera.position.y = (CAMERA_RADIUS * Math.sin(THREE.Math.degToRad(theta)) + CAMERA_RADIUS) * 0.5;
    camera.position.z = CAMERA_RADIUS * Math.cos(THREE.Math.degToRad(theta));
    camera.lookAt(scene.position);
    camera.updateMatrixWorld();

    // handle mouse intersections
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0 &&
        intersects[0].object !== intersected &&
        intersects[0].object !== prevSelected
    ) {
      if (intersected) {
        intersected.unhighlight();
        intersected.stopAnimation();
      }

      intersected = intersects[0].object;
      intersected.highlight(HIGHLIGHT_CLR);
      intersected.animate();

    } else if (intersects.length === 0 && intersected) {
      intersected.unhighlight();
      intersected.stopAnimation();
      intersected = null;
    }
  }

  renderer.render(scene, camera);
}

function onMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
