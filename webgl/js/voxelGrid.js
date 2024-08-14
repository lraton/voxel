import * as THREE from 'https://threejs.org/build/three.module.js';

export function createVoxelGrid(scene) {
    const gridSize = 1000;  // Number of cubes along one axis
    const cubeSize = 0.1;  // Size of each cube
    const totalCubes = gridSize * gridSize;

    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    // Custom Shader Material
    const material = new THREE.ShaderMaterial({
        vertexShader: `
            attribute vec3 aInstanceColor;
            varying vec3 vColor;
            void main() {
                vColor = aInstanceColor;
                vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            void main() {
                gl_FragColor = vec4(vColor, 1.0);
            }
        `,
        side: THREE.FrontSide,  // Ensure only the front faces are rendered
        transparent: false,      // Disable transparency to avoid seeing through cubes
        uniforms: {},
    });

    const instancedMesh = new THREE.InstancedMesh(geometry, material, totalCubes);

    const colors = new Float32Array(totalCubes * 3); // RGB colors for each instance
    const dummy = new THREE.Object3D();

    let index = 0;
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            // Set the position of each cube
            dummy.position.set(
                (j - gridSize / 2) * cubeSize,
                0,
                (i - gridSize / 2) * cubeSize
            );
            dummy.updateMatrix();
            instancedMesh.setMatrixAt(index, dummy.matrix);

            // Assign a random color to each cube
            const color = new THREE.Color(Math.random(), Math.random(), Math.random());
            colors.set(color.toArray(), index * 3);

            index++;
        }
    }

    // Add the color attribute to the instanced mesh
    instancedMesh.instanceColor = new THREE.InstancedBufferAttribute(colors, 3);
    // Assign the custom attribute
    instancedMesh.geometry.setAttribute('aInstanceColor', instancedMesh.instanceColor);

    scene.add(instancedMesh);
}
