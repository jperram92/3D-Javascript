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
renderer.shadowMap.enabled = true; // Enable shadows
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
rectangle.castShadow = true; // Enable shadows
scene.add(rectangle);

// -------------------------------
// 🟦 Create a Cube (BoxGeometry)
// -------------------------------

// Create cube geometry
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);

// Use MeshBasicMaterial with wireframe
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0x000000, // Pure black color
  wireframe: true,
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Position the cube to the right
cube.position.x = 2;
cube.castShadow = true; // Enable shadows
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
ball.castShadow = true; // Enable shadows
scene.add(ball);

// Add a point light specifically for the ball
const ballLight = new THREE.PointLight(0xffffff, 1, 100);
ballLight.position.set(0, 5, 5);
scene.add(ballLight);

// -------------------------------
// 🌍 Enhanced Flat Plane (Ground)
// -------------------------------

// Load a texture for the plane
const textureLoader = new THREE.TextureLoader();
const groundTexture = textureLoader.load('textures/ground_texture.jpg'); // Replace with your texture path
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(4, 4); // Adjust how many times the texture repeats

// Create Plane Geometry
const planeGeometry = new THREE.PlaneGeometry(15, 15, 32, 32); // Larger plane with more segments

// Apply the texture to the plane material
const planeMaterial = new THREE.MeshStandardMaterial({
  map: groundTexture,
  side: THREE.DoubleSide,
  roughness: 0.3,
  metalness: 0.5,
  envMapIntensity: 0.5, // Adds some reflection
});

// Create the Plane Mesh
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

// Rotate the Plane to Lay Flat
plane.rotation.x = -Math.PI / 2;

// Position the Plane Slightly Below the Objects
plane.position.y = -1.5;

// Enable Shadows
plane.receiveShadow = true;

// Add Plane to the Scene
scene.add(plane);

// -------------------------------
// 🟠 Add a Grid Helper (Optional)
// -------------------------------

// Grid to visualize alignment
//const gridHelper = new THREE.GridHelper(15, 15, 0x444444, 0x888888);
//scene.add(gridHelper);

// -------------------------------
// 💡 Add Lights
// -------------------------------

// Ambient Light for Soft Illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft ambient light
scene.add(ambientLight);

// Directional Light for Shadows
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// -------------------------------
// 🎥 Camera Position
// -------------------------------

// Adjust camera position for a better view
camera.position.set(0, 5, 10); // Elevated camera view
camera.lookAt(0, 0, 0); // Point camera towards the center

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
