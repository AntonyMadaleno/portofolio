class Point3D
{

	constructor(x,y,z)
	{
		this.x = x; 
		this.y = y; 
		this.z = z;
	}

	translate(dx, dy, dz)
	{
		this.x = this.x + dx;
		this.y = this.y + dy;
		this.z = this.z + dz;
	}

	resize(f)
	{
		this.x = this.x*f;
		this.y = this.y*f;
		this.z = this.z*f;
	}

	rotateX(angle)
	{
		let rx = ((angle%360)/180)*Math.PI;
		this.y = Math.cos(rx)*this.y - Math.sin(rx)*this.z;
		this.z = Math.sin(rx)*this.y + Math.cos(rx)*this.z;
	}

	rotateY(angle)
	{
		let ry = ((angle%360)/180)*Math.PI;
		this.x = Math.cos(ry)*this.x + Math.sin(ry)*this.z;
		this.z = -Math.sin(ry)*this.x + Math.cos(ry)*this.z;
	}

	rotateZ(angle)
	{
		let rz = ((angle%360)/180)*Math.PI;
		this.x = Math.cos(rz)*this.x - Math.sin(rz)*this.y;
		this.y = Math.sin(rz)*this.x + Math.cos(rz)*this.y;
	}

}

class Sphere
{

	constructor(radius, c)
	{
		this.r = radius;
		this.cx = c[0];
		this.cy = c[1];
		this.cz = c[2];
		this.NM = 32;
		this.NP = 32;
	}

	setNM(n)
	{
		this.NM = n;
	}

	setNP(n)
	{
		this.NP = n;
	}

	drawPoints()
	{
		let pts = new Array();

		for (let i = 0; i < this.NP; i++)
	    {
	        for (let j = 0; j < this.NM; j++)
	        {
	            let alpha = j*2*Math.PI/this.NM;
	            let teta = i*Math.PI/(this.NP-1) - Math.PI/2;

	            let x = this.cx + this.r*Math.cos(alpha)*Math.cos(teta);
	            let z = this.cy + this.r*Math.sin(alpha)*Math.cos(teta);
	            let y = this.cz + this.r*Math.sin(teta);
	            
	            let p = new Point3D(x,y,z);
	            pts.push(p);
	        }
	    }

		return pts;
	}

	drawFaces()
	{
		let faces = new Array();

		for (let i = 0; i < this.NP-1; i++)
	    {
	        for (let j = 0; j < this.NM; j++)
	        {

	            let ix = (i+1) % this.NP;
	            let jn = (j+1) % this.NM;

	            let p0 = i*this.NM + j;
	            let p1 = i*this.NM + jn;
	            let p2 = ix*this.NM + jn;
	            let p3 = ix*this.NM + j;
	            faces.push([p0, p1, p2, p3]);
	        }
	    }

		return faces;
	}

	draw()
	{
		let geom = new THREE.Geometry();
		let pts = this.drawPoints();
		let faces = this.drawFaces();

		for(let i = 0; i < faces.length; i++)
		{
			let p0 = pts[faces[i][0]];
			let p1 = pts[faces[i][1]];
			let p2 = pts[faces[i][2]];
			let p3 = pts[faces[i][3]];

			let v0 = new THREE.Vector3(p0.x,p0.y,p0.z);
			let v1 = new THREE.Vector3(p1.x,p1.y,p1.z);
			let v2 = new THREE.Vector3(p2.x,p2.y,p2.z);
			let v3 = new THREE.Vector3(p3.x,p3.y,p3.z);

			geom.vertices.push(v0);
			geom.vertices.push(v1);
			geom.vertices.push(v2);
			geom.vertices.push(v3);

			let n = i*4;

			geom.faces.push( new THREE.Face3( n, n+1, n+3 ) );
			geom.faces.push( new THREE.Face3( n+3, n+1, n+2 ) );
			geom.computeFaceNormals();

		}

		return geom;

	}

}