import * as THREE from 'https://threejs.org/build/three.module.js';

export function createLighting(scene) {
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
}
