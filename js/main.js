let stage = 0;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 3000);
camera.position.z = 25;
camera.position.y = 85;
camera.position.x = -25;
camera.lookAt(25,camera.position.y + 5,25);

let lx = 100;
let lz = 100;
let ly = 400;
let obj = new Array();

let render = new THREE.WebGLRenderer({ alpha: true, antialias: true });
render.setSize(window.innerWidth, window.innerHeight);
render.setClearColor(0x132644, 0);
document.getElementById("renderWindow").appendChild(render.domElement);
let c = document.querySelector("canvas");
c.setAttribute("width", window.innerWidth);
c.setAttribute("height", window.innerHeight);


let group = new THREE.Group();

let s0 = new THREE.CylinderGeometry(12, 12,window.innerHeight, 16);
s0.rotateY(Math.PI/16);

let material = new THREE.MeshPhongMaterial(
		{
			color: 0xff9900,
			transparent: true,
			opacity: 1,
			reflectivity: 0.5,
			shininess: 150,
			emissive: 0x443300,
			wireframe: false,
			wireframeLinewidth: 5,
			wireframeLinejoin: 'round',
			wireframeLinecap: 'round',
			flatShading: true
		}
	)

let basic = new THREE.MeshPhongMaterial(
		{
			color: 0xffffff,
			transparent: true,
			opacity: 1,
			reflectivity: 0,
			shininess: 30,
			emissive: 0x444444,
			wireframe: false,
			wireframeLinewidth: 5,
			wireframeLinejoin: 'round',
			wireframeLinecap: 'round'
		}
	)


for (let i = 0; i < 48; i++)
{
	let step = new THREE.BoxGeometry( 15, 2, 5 );
	step.rotateY((i)*Math.PI/8);
	step.translate( 19.5*Math.cos( (-i)*Math.PI/8 ), -60 + i*5 , 19.5*Math.sin( (-i)*Math.PI/8 ));
	group.add( new THREE.Mesh(step, basic) );
}


group.add(new THREE.Mesh(s0, material));
scene.add(group);

const light0 = new THREE.PointLight( 0xffffff, 1, 0, 2 );
light0.position.set( lx, ly, lz);
light0.castShadow = true;
scene.add(light0);

render.render(scene, camera);

window.addEventListener("wheel", event => animation( event.deltaY, 0, 0 ));

let astatus = 0;
let d;
let animation = function(v,t,x) 
{

	if(v > 0 && x == 0)
	{
		stage += 1;
		d = -1;
	}
	if(v < 0 && x == 0)
	{
		stage -=1;
		d = 1;
	}

	if( (astatus == 0 || x == 1) && (stage >= 0 && stage < 8))
	{

		astatus = 1;
		group.rotation.y -= (v/125)*(Math.PI/30);

		if(d == -1)
		{
			camera.position.y = 85 + (t/60)*80;
			camera.lookAt(25, camera.position.y + 5, 25);
		}
		else
		{
			camera.position.y = 85 - (t/60)*80;
			camera.lookAt(-25, camera.position.y - 5, 20);
		}

		render.render(scene, camera);

		if(t < 59)
		{
			setTimeout(animation, 16, v, t+1, 1);
		}
		else
		{
			camera.position.y = 85;
			render.render(scene, camera);
			astatus = 0;
		}
	}
	else
	{
		if(v > 0 && x == 0)
		{
			stage -= 1;
		}
		if(v < 0 && x == 0)
		{
			stage +=1;
		}
	}
	

}
