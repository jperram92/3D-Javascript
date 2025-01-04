// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a Rectangle (BoxGeometry)
const rectangleGeometry = new THREE.BoxGeometry(2, 1, 1);
const rectangleMaterial = new THREE.MeshNormalMaterial();
const rectangle = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
rectangle.position.x = -2;
scene.add(rectangle);

// Create a Cube (BoxGeometry)
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0x44aa88,
  wireframe: true,
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = 2;
scene.add(cube);

// Camera Position
camera.position.z = 5;

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the Rectangle
  rectangle.rotation.x += 0.01;
  rectangle.rotation.y += 0.01;

  // Rotate the Cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
