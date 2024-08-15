import * as THREE from 'https://threejs.org/build/three.module.js';

export function createVoxelGrid(scene) {
    const gridSize = 100;  // Number of cubes along one axis
    const cubeSize = 1;  // Size of each cube
    const heightSize = 10;  // Size of each cube
    const totalCubes = gridSize * gridSize * heightSize;  // Total number of cubes

    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    // Custom Shader Material
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,  // Enable wireframe mode
        side: THREE.FrontSide  // Ensure only front faces are rendered
      });

    const instancedMesh = new THREE.InstancedMesh(geometry, material, totalCubes);

    const colors = new Float32Array(totalCubes * 3); // RGB colors for each instance
    const dummy = new THREE.Object3D();

    let index = 0;
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            for (let z = 0; z < heightSize; z++) {
                // Set the position of each cube
                dummy.position.set(
                    (x - gridSize / 2) * cubeSize,
                    (z - heightSize / 2) * cubeSize,
                    (y - gridSize / 2) * cubeSize
                );
                dummy.updateMatrix();
                instancedMesh.setMatrixAt(index, dummy.matrix);

                // Assign a random color to each cube
                const color = new THREE.Color(Math.random(), Math.random(), Math.random());
                colors.set(color.toArray(), index * 3);

                index++;
            }
        }
    }

    // Add the color attribute to the instanced mesh
    instancedMesh.instanceColor = new THREE.InstancedBufferAttribute(colors, 3);
    // Assign the custom attribute
    instancedMesh.geometry.setAttribute('aInstanceColor', instancedMesh.instanceColor);
    
    scene.add(instancedMesh);
}
