import * as THREE from 'https://threejs.org/build/three.module.js';

export function createCamera() {
    const fov = 90;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // Set initial camera position
    camera.position.set(0, 20, 10);
    return camera;
}
