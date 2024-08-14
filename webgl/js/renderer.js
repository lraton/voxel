import * as THREE from 'https://threejs.org/build/three.module.js';

export function createRenderer(canvas) {
    return new THREE.WebGLRenderer({ antialias: true, canvas });
}

