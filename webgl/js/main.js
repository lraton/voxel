// Import necessary modules and functions
import { createRenderer } from './renderer.js';
import { createCamera } from './camera.js';
import { createScene } from './scene.js';
import { createLighting } from './lighting.js';
import { createVoxelGrid } from './voxelGrid.js';
import { loadModel } from './loaders.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Main function to initialize and run the application
function main() {
    // Get the canvas element from the DOM
    const canvas = document.querySelector('#c');

    // Initialize the renderer with the canvas
    const renderer = createRenderer(canvas);

    // Create a camera
    const camera = createCamera();

    // Create controls to allow camera manipulation with mouse
    const controls = new OrbitControls(camera, renderer.domElement);

    // Create the scene
    const scene = createScene();

    // Set initial camera position
    camera.position.set(0, 20, 10);

    // Update controls to apply the initial camera position
    controls.update();

    // Set up lighting in the scene
    createLighting(scene);

    // Create a voxel grid in the scene
    createVoxelGrid(scene);

    // Load and add a 3D model to the scene
    loadModel(scene, 'models/T-Rex.obj');

    // Initialize variables for FPS calculation
    let lastTime = 0;  // Timestamp of the last frame
    let fps = 0;       // Frames per second value

    // Create a div element to display FPS
    const fpsDisplay = document.createElement('div');
    fpsDisplay.style.position = 'absolute';         // Position the FPS display
    fpsDisplay.style.top = '0';                     // Align to the top of the page
    fpsDisplay.style.left = '0';                    // Align to the left of the page
    fpsDisplay.style.backgroundColor = 'rgba(0,0,0,0)'; // Semi-transparent background
    fpsDisplay.style.color = 'white';               // Text color
    fpsDisplay.style.padding = '5px';               // Add some padding
    document.body.appendChild(fpsDisplay);          // Add the FPS display to the body
    const title='IDK pre alpha 0.0.1';

    // Function to resize the renderer to fit the canvas
    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);  // Update renderer size
        }
        return needResize;
    }

    // Render function to update and draw the scene
    function render(time) {
        // Check if the renderer needs resizing and update camera aspect ratio
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        // Calculate FPS
        if (lastTime === 0) lastTime = time;  // Initialize lastTime
        const delta = time - lastTime;        // Time difference between frames
        fps = Math.round(1000 / delta);       // Calculate FPS
        lastTime = time;                      // Update lastTime

        // Render the scene using the camera
        renderer.render(scene, camera);

        // Update FPS display on the screen
        fpsDisplay.textContent = title + ` FPS: ${fps}`;

        // Request the next frame
        requestAnimationFrame(render);
    }

    // Start the rendering loop
    requestAnimationFrame(render);
}

// Run the main function to start the application
main();
