const wdt = 1000;
const hgt = 625;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(35, wdt/hgt, 0.1, 3000);
let camDist = 150;
camera.position.z = camDist*Math.cos(Math.PI/6);
camera.position.y = camDist*Math.sin(Math.PI/6);
camera.lookAt(0,0,0);

let spd = 0.005;
let d = 20;
let o = 10;
let t = 0;
let lx = 0;
let ly = 0;
let lz = 0;

let render = new THREE.WebGLRenderer({alpha: true, antialias: true });
render.setSize(wdt, hgt);
render.setClearColor(0x132644, 0);
render.shadowMap.enabled = true;
render.shadowMap.type = THREE.PCFSoftShadowMap;

document.getElementById("render").appendChild(render.domElement);
let c = document.querySelector("canvas");
c.setAttribute("width", "900px");
c.setAttribute("height", "625px");

const light0 = new THREE.PointLight( 0xffffff, 1, 300 );
light0.position.set(lx, ly, lz);
light0.castShadow = true;

//Set up shadow properties for the light
light0.shadow.mapSize.width = 512;
light0.shadow.mapSize.height = 512;
light0.shadow.camera.near = 0.5;
light0.shadow.camera.far = 2000;

scene.add(light0);

let group = new THREE.Group();
let sg0 = new THREE.Group();
let sg1 = new THREE.Group();
let sg2 = new THREE.Group();
let sg3 = new THREE.Group();

let s0 = new THREE.SphereGeometry(8,16,16);
let orbit = [];
let s1 = new THREE.SphereGeometry(2,16,16);
let s2 = new THREE.SphereGeometry(2.5,16,16);
let s3 = new THREE.SphereGeometry(2.5,16,16);
let s4 = new THREE.SphereGeometry(1,8,8);
let s5 = new THREE.SphereGeometry(2, 16, 16);

let base = new THREE.MeshPhongMaterial(
		{
			color: 0xffffff,
			transparent: true,
			opacity: 1,
			reflectivity: 0,
			shininess: 100,
			emissive: 0xffffff,
			wireframe: false,
			wireframeLinewidth: 5,
			wireframeLinejoin: 'round',
			wireframeLinecap: 'round'
		}
	)

let moonOribt = new THREE.TorusGeometry( 4, 0.1, 4, 64 );
moonOribt.rotateX(Math.PI/2);
sg2.add(new THREE.Mesh(moonOribt, base));

for (let c = 0; c < 4; c++)
{
	orbit.push( new THREE.TorusGeometry( d + c*o, 0.1, 4, 64 ) );
	orbit[c].rotateX(Math.PI/2);
	group.add(new THREE.Mesh(orbit[c], base));
}

s4.castShadow = true;
s4.receiveShadow = true;

s3.castShadow = true;
s3.receiveShadow = true;

s1.translate(d, 0, 0);
s2.translate(d+o, 0, 0);
s4.translate(0, 0 , 4);
s5.translate(d+3*o, 0 , 0);

let sun = new THREE.MeshPhongMaterial(
		{
			color: 0xff9900,
			transparent: true,
			opacity: 1,
			reflectivity: 0,
			shininess: 100,
			emissive: 0xff9900,
			wireframe: true,
			wireframeLinewidth: 5,
			wireframeLinejoin: 'round',
			wireframeLinecap: 'round'
		}
	)

let mercury = new THREE.MeshPhongMaterial(
		{
			color: 0xaaaaaa,
			transparent: true,
			opacity: 1,
			reflectivity: 0,
			shininess: 100,
			emissive: 0x222222,
			wireframe: false,
			wireframeLinewidth: 5,
			wireframeLinejoin: 'round',
			wireframeLinecap: 'round'
		}
	)

let venus = new THREE.MeshPhongMaterial(
		{
			color: 0xffe6cc,
			transparent: true,
			opacity: 1,
			reflectivity: 0,
			shininess: 100,
			emissive: 0x554433,
			wireframe: false,
			wireframeLinewidth: 5,
			wireframeLinejoin: 'round',
			wireframeLinecap: 'round'
		}
	)

let earth = new THREE.MeshPhongMaterial(
		{
			color: 0x6666cc,
			transparent: true,
			opacity: 1,
			reflectivity: 0,
			shininess: 100,
			emissive: 0x222255,
			wireframe: false,
			wireframeLinewidth: 5,
			wireframeLinejoin: 'round',
			wireframeLinecap: 'round'
		}
	)

let moon = new THREE.MeshPhongMaterial(
		{
			color: 0xffffff,
			transparent: true,
			opacity: 1,
			reflectivity: 0,
			shininess: 100,
			emissive: 0x333333,
			wireframe: false,
			wireframeLinewidth: 5,
			wireframeLinejoin: 'round',
			wireframeLinecap: 'round'
		}
	)

let mars = new THREE.MeshPhongMaterial(
		{
			color: 0xff3333,
			transparent: true,
			opacity: 1,
			reflectivity: 0,
			shininess: 100,
			emissive: 0x330000,
			wireframe: false,
			wireframeLinewidth: 5,
			wireframeLinejoin: 'round',
			wireframeLinecap: 'round'
		}
	)


group.add(new THREE.Mesh(s0, sun));
sg0.add(new THREE.Mesh(s1, mercury));
sg1.add(new THREE.Mesh(s2, venus));
sg2.add(new THREE.Mesh(s3, earth));
sg2.add(new THREE.Mesh(s4, moon));
sg3.add(new THREE.Mesh(s5, mars));

sg2.position.x = d+2*o;

scene.add(group);
scene.add(sg0);
scene.add(sg1);
scene.add(sg3);
scene.add(sg2);

render.render(scene, camera);

let animation = function() 
{
	requestAnimationFrame(animation);
	t += spd;
	s0.rotateY(spd/2);
	sg0.rotation.y -= spd*365/88;
	sg1.rotation.y -= spd*365/225;
	sg3.rotation.y -= spd*365/687;

	sg2.rotation.y -= spd*365/28;
	sg2.position.x = (d+2*o)*Math.cos(t);
	sg2.position.z = (d+2*o)*Math.sin(t);

	render.render(scene, camera);
}

animation();