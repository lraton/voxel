import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

export function loadModel(scene, modelPath) {
    const loader = new OBJLoader();
    loader.load(
        modelPath,
        function (object) {
            scene.add(object);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.log('An error happened');
        }
    );
}
