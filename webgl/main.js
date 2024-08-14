import * as THREE from 'https://threejs.org/build/three.module.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

function main() {

	const canvas = document.querySelector('#c');
	const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

	const fov = 90;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 5;
	camera.position.y = 1;
	camera.position.x = 0;


	const scene = new THREE.Scene();

	{

		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight(color, intensity);
		light.position.set(- 1, 2, 4);
		scene.add(light);

	}

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

	function makeInstance(geometry, color, x, y, z) {
		const loader = new THREE.TextureLoader();
		/**
		loader.load('textures/cube.jpg', (texture) => {
			texture.colorSpace = THREE.SRGBColorSpace;
			const material = new THREE.MeshBasicMaterial({
				map: texture,
			});
			const cube = new THREE.Mesh(geometry, material);
			scene.add(cube);

			cube.position.x = x;
			cube.position.y = y;
			cube.position.z = z;

			return cube;
		});
		*/
		const material = new THREE.MeshPhongMaterial({ color });

		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

		cube.position.x = x;
		cube.position.y = y;
		cube.position.z = z;

		return cube;
	}

	// Create cubes 
	const cubes = [];
	const gridRows = 100;
	const gridCols = 100;

	for (let i = 0; i < gridRows; i++) {
		for (let j = 0; j < gridCols; j++) {
			const x = (j - (gridRows / 2));
			const z = (i - (gridCols / 2));
			const color = new THREE.Color(Math.random(), Math.random(), Math.random());
			cubes.push(makeInstance(geometry, color, x, 0, z));
		}
	}

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

	// instantiate a loader
	const loader = new OBJLoader();

	// load a resource
	loader.load(
		// resource URL
		'models/T-Rex.obj',
		// called when resource is loaded
		function (object) {

			scene.add(object);

		},
		// called when loading is in progresses
		function (xhr) {

			console.log((xhr.loaded / xhr.total * 100) + '% loaded');

		},
		// called when loading has errors
		function (error) {

			console.log('An error happened');

		}
	);

	function render(time) {

		time *= 0.001; // convert time to seconds

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
