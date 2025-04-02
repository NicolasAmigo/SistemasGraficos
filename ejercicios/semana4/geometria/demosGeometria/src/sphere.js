import * as THREE from 'three';

export function createSphere(radius, radialSegments, heightSegments) {
    let geometry = new THREE.BufferGeometry();
    
    const positions = [];
    const indices = [];
    const normals = [];
    const uvs = [];

    const angleStep = (2 * Math.PI) / radialSegments;
	const heightStep = (Math.PI) / heightSegments;

	// vertical segments
	for (let i = 0; i <= heightSegments; i++) {
		//const y = i * heightStep;
        const y = radius * Math.cos(i * heightStep);
		const v = i / heightSegments;
        const stepRadius = radius * Math.sin( i * heightStep);

		// radial segments
		for (let j = 0; j <= radialSegments; j++) {
			const angle = j * angleStep;
			const x = stepRadius * Math.cos(angle);
			const z = stepRadius * Math.sin(angle);
			const u = j / radialSegments;

			positions.push(x, y, z);
			normals.push(x, y, z);
			uvs.push(u, v);

			//We stop before the last row and last column
			if (i < heightSegments && j < radialSegments) {
				// The indices of the vertices
				const a = i * (radialSegments + 1) + j;
				const b = a + radialSegments + 1;
				const c = a + radialSegments + 2;
				const d = a + 1;

				indices.push(a, d, b);
				indices.push(b, d, c);
			}
		}
	}
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);

    return geometry;
}
