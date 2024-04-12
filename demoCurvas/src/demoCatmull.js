import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, container;

function setupThreeJs() {
	container = document.getElementById('container3D');

	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0xcccccc);
	scene = new THREE.Scene();

	container.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(10, 10, 10);
	camera.lookAt(0, 0, 0);

	const controls = new OrbitControls(camera, renderer.domElement);

	const light = new THREE.DirectionalLight(0xffffff, 1);

	light.position.set(1, 1, 1);
	scene.add(light);

	const ambientLight = new THREE.AmbientLight(0x666666);
	scene.add(ambientLight);

	const grid = new THREE.GridHelper(20, 10);
	scene.add(grid);

	window.addEventListener('resize', onResize);
	onResize();
}

function onResize() {
	camera.aspect = container.offsetWidth / container.offsetHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(container.offsetWidth, container.offsetHeight);
}

function buildCurve() {
	//Create a closed wavey loop
	const curve = new THREE.CatmullRomCurve3([
		new THREE.Vector3(-10, 0, 10),
		new THREE.Vector3(-5, 5, 5),
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(5, -5, 5),
		new THREE.Vector3(10, 0, 10),
	]);

	const points = curve.getPoints(50);
	const geometry = new THREE.BufferGeometry().setFromPoints(points);

	const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

	// Create the final object to add to the scene
	const curveObject = new THREE.Line(geometry, material);
	scene.add(curveObject);
}
function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

setupThreeJs();
buildCurve();
animate();
