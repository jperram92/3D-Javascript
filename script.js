// -------------------------------
// 🎬 Scene, Camera, and Renderer
// -------------------------------

// Create a new 3D scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a WebGL renderer with antialiasing enabled
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// -------------------------------
// 🟩 Create a Rectangle (BoxGeometry)
// -------------------------------

// Create rectangle geometry
const rectangleGeometry = new THREE.BoxGeometry(2, 1, 1);

// Use MeshNormalMaterial for colorful face shading
const rectangleMaterial = new THREE.MeshNormalMaterial();
const rectangle = new THREE.Mesh(rectangleGeometry, rectangleMaterial);

// Add directional light for the rectangle
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Position the rectangle to the left
rectangle.position.x = -2;
scene.add(rectangle);

// -------------------------------
// 🟦 Create a Cube (BoxGeometry)
// -------------------------------

// Create cube geometry
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);

// Use MeshBasicMaterial with wireframe
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0x44aa88,
  wireframe: true,
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Position the cube to the right
cube.position.x = 2;
scene.add(cube);

// -------------------------------
// ⚽ Create a Rolling Ball (SphereGeometry)
// -------------------------------

// Create sphere geometry (ball)
const ballGeometry = new THREE.SphereGeometry(1, 32, 32); // Radius: 1, Segments: 32
const ballMaterial = new THREE.MeshStandardMaterial({ color: 0xff5733 });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);

// Position the ball below the rectangle and cube
ball.position.y = -1;
ball.position.x = 0;
scene.add(ball);

// Add a point light specifically for the ball
const ballLight = new THREE.PointLight(0xffffff, 1, 100);
ballLight.position.set(0, 5, 5);
scene.add(ballLight);

// -------------------------------
// 🎥 Camera Position
// -------------------------------

// Adjust camera position for a better view
camera.position.z = 8;

// -------------------------------
// 🔄 Animation Loop
// -------------------------------

// Animation function
function animate() {
  requestAnimationFrame(animate);

  // Rotate the Rectangle
  rectangle.rotation.x += 0.01;
  rectangle.rotation.y += 0.01;

  // Rotate the Cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Animate the Rolling Ball
  ball.position.x += 0.02; // Horizontal movement
  ball.rotation.z += 0.05; // Rolling rotation

  // Reset Ball Position if it goes off-screen
  if (ball.position.x > 5) {
    ball.position.x = -5; // Reset to left
  }

  // Render the updated scene
  renderer.render(scene, camera);
}

// Start the animation loop
animate();

// -------------------------------
// 📐 Handle Window Resize
// -------------------------------

// Adjust scene on window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
