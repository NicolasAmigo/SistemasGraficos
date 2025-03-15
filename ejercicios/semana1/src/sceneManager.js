import * as THREE from 'three';

let torus, cube, cone;

export class SceneManager {
	constructor(scene) {
		const light = new THREE.DirectionalLight(0xffffff, 1);

		light.position.set(1, 1, 1);
		scene.add(light);

		const ambientLight = new THREE.AmbientLight(0x666666);
		scene.add(ambientLight);

		const grid = new THREE.GridHelper(10, 10);
		scene.add(grid);

		const axes = new THREE.AxesHelper(3);
		scene.add(axes);

		let grass = this._create_grass();
		grass.position.set(0,0,0);
		scene.add(grass);

		let castle = this._create_castle();
		castle.position.set(-10, 1, 0);
		scene.add(castle);

		let tree = this._create_tree();
		tree.position.set(-5, 1, -5);
		scene.add(tree);

		let pond = this._create_pond();
		pond.position.set(6, 0.2, 6);
		scene.add(pond);
	}

	_create_tower() {
		let base = new THREE.Mesh(
			new THREE.CylinderGeometry(0.75, 0.75, 3),
			new THREE.MeshPhongMaterial({ color: 0xeae8ca })
		);
		let top = new THREE.Mesh(
			new THREE.ConeGeometry(1,2),
			new THREE.MeshPhongMaterial({ color: 0x5680f0 })
		);
		top.position.set(0,2,0)
		base.add(top)
		return base;
	}

	_create_castle() {
		let base = new THREE.Mesh(
			new THREE.BoxGeometry(4, 2, 4),
			new THREE.MeshPhongMaterial({ color: 0xeae8ca })
		);
		let tower1 = this._create_tower();
		tower1.position.set(2, 0.5, 2)
		base.add(tower1)

		let tower2 = this._create_tower();
		tower2.position.set(-2, 0.5, 2)
		base.add(tower2)

		let tower3 = this._create_tower();
		tower3.position.set(2, 0.5, -2)
		base.add(tower3)

		let tower4 = this._create_tower();
		tower4.position.set(-2, 0.5, -2)
		base.add(tower4)

		let door = new THREE.Mesh(
			new THREE.BoxGeometry(0.1, 1.75, 1),
			new THREE.MeshPhongMaterial({ color: 0x631201 })
		);
		door.position.set(2, 0, 0);
		base.add(door);
		return base
	}

	_create_grass() {
		let grass = new THREE.Mesh(
			new THREE.BoxGeometry(50, 0.25, 50),
			new THREE.MeshPhongMaterial({ color: 0x3ede5b })
		);
		return grass
	}

	_create_tree() {
		let trunk = new THREE.Mesh(
			new THREE.CylinderGeometry(0.1, 0.1, 2),
			new THREE.MeshPhongMaterial({ color: 0x795604 })
		);

		let folliage1 = new THREE.Mesh(
			new THREE.SphereGeometry(1),
			new THREE.MeshPhongMaterial({ color: 0x0b6908 })
		);

		let folliage2 = new THREE.Mesh(
			new THREE.SphereGeometry(1),
			new THREE.MeshPhongMaterial({ color: 0x0b6908 })
		);

		let folliage3 = new THREE.Mesh(
			new THREE.SphereGeometry(1),
			new THREE.MeshPhongMaterial({ color: 0x0b6908 })
		);

		folliage1.position.set(0.1, 1.75, 0);
		trunk.add(folliage1);

		folliage2.position.set(0.0, 2, 0.5);
		trunk.add(folliage2);

		folliage3.position.set(-0.2, 2.25, 0.5);
		trunk.add(folliage3);

		return trunk;
	}

	_create_pond() {
		let pond = new THREE.Mesh(
			new THREE.CircleGeometry(5),
			new THREE.MeshPhongMaterial({ color: 0x3beaf2 })
		);
		pond.rotateX(-3.141/2)
		return pond;
	}
}
