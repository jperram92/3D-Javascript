// script.js

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a Box Geometry
const geometry = new THREE.BoxGeometry(2, 1, 1); // Width, Height, Depth
const material = new THREE.MeshNormalMaterial(); // Material with normal colors
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// Camera Position
camera.position.z = 5;

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  box.rotation.x += 0.01; // Rotate around X-axis
  box.rotation.y += 0.01; // Rotate around Y-axis
  renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
