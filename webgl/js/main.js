import { createRenderer } from './renderer.js';
import { createCamera } from './camera.js';
import { createScene } from './scene.js';
import { createLighting } from './lighting.js';
import { createVoxelGrid } from './voxelGrid.js';
import { loadModel } from './loaders.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = createRenderer(canvas);
    const camera = createCamera();
    const controls = new OrbitControls(camera, renderer.domElement);
    const scene = createScene();

    camera.position.set(0, 20, 100);
    controls.update();
    
    createLighting(scene);
    createVoxelGrid(scene);

    loadModel(scene, 'models/T-Rex.obj');

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time) {
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();
