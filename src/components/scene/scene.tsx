import * as React from 'react';
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';


const mats = [{
	"id": "Glass Front",
	"addColor": "#00ff00",
	"addOpacity": 1.0,
	"reflectivity": 0.7,
	"specularColor": "#000000"
},
	{
		"id": "Glass Front Strip",
		"addColor": "#ffffff",
		"addOpacity": 0.9,
		"reflectivity": 0.7,
		"specularColor": "#ffffff"
	},
	{
		"id": "Glass Front Door",
		"addColor": "#ffffff",
		"addOpacity": 0.05,
		"reflectivity": 0.7,
		"specularColor": "#ffffff"
	},
	{
		"id": "Glass Rear Door",
		"addColor": "#ffffff",
		"addOpacity": 0.05,
		"reflectivity": 0.7,
		"specularColor": "#ffffff"
	},
	{
		"id": "Glass Rear",
		"addColor": "#ffffff",
		"addOpacity": 0.05,
		"reflectivity": 0.7,
		"specularColor": "#ffffff"
	},
	{
		"id": "Glass Front Light",
		"addColor": "#ffffff",
		"addOpacity": 0.05,
		"reflectivity": 0.7,
		"specularColor": "#ffffff"
	},
	{
		"id": "Glass Rear Light",
		"addColor": "#ffffff",
		"addOpacity": 0.05,
		"reflectivity": 0.7,
		"specularColor": "#ffffff"
	},
	{
		"id": "Body",
		"color": "#ff0000",
		"reflectivity": 0.3,
		"specularColor": "#ffffff"
	}];
/*
export class Scene extends React.Component<any, any> {

	private camera: THREE.PerspectiveCamera;
	private scene: THREE.Scene;
	private light: THREE.DirectionalLight;
	private ambient: THREE.AmbientLight;
	private renderer: THREE.WebGLRenderer;
	private loader: THREE.JSONLoader;
	private controls: THREE.OrbitControls;
	private textureCube: THREE.CubeTexture;
	private mesh: THREE.Mesh;

	public componentDidMount() {
		console.log("componentDidMount");
		let camera = new THREE.PerspectiveCamera(45, 961 / 493, 0.1, 1000);
		camera.position.x = -5.4241;
		camera.position.y = 10.3278;
		camera.position.z = -30.0568;
		this.camera = camera;
		this.scene = new THREE.Scene();

		this.light = new THREE.DirectionalLight(0x888888);
		this.light.position.set(0, 1, 1);
		this.scene.add(this.light);

		this.ambient = new THREE.AmbientLight('#777777');
		this.scene.add(this.ambient);

		var renderer = new THREE.WebGLRenderer(
			{
				antialias: true,
				canvas: this.refs.canvas as HTMLCanvasElement
			}
		);
		renderer.setPixelRatio(window.devicePixelRatio);

		renderer.setSize(961, 493);
		this.renderer = renderer;

		//this.$el.append(this.renderer.domElement);

		this.loader = new THREE.JSONLoader();

		//var controls = new THREE.OrbitControls(camera, renderer.domElement);
		var controls = new OrbitControls(camera, renderer.domElement);
		controls.minDistance = 4;
		controls.maxDistance = 10;
		controls.minPolarAngle = Math.PI / 8;
		controls.maxPolarAngle = Math.PI / 2.3;

		this.controls = controls;
		this.initSkybox();
		this.setCar();
		this.applyMaterials();
		this.controls.addEventListener('change', () => {
			this.renderer.render(this.scene, this.camera);
		});

	}

	private applyMaterials() {
		if (!this.mesh) {
			return;
		}
		//if (!this.mesh.origMaterial) {
		//	this.mesh.origMaterial = this.mesh.material.clone();
		//}
		//this.mesh.material = this.mesh.origMaterial.clone();
		this.mesh.material.forEach((m : THREE.Material) => {
			if (m.transparent) {
				// m.depthWrite = false;
			}
			if (m.name.indexOf('reflectivity(') >= 0) {
				m.reflectivity = +(m.name.split('reflectivity(')[1].split(')')[0]);
				m.envMap = this.textureCube;
			}
		});
		mats.forEach((m) => {
			var attr = m;
			var material: any = this.mesh.material.filter(function (m) {
				return m.name === attr.id;
			});
			if (!material || !material.length) {
				return console.warn("material not found", attr.id);
			}
			material = material[0];
			if (attr['color']) {
				material.color.copy(new THREE.Color(attr['color']));
			}
			//var color = new THREE.Color(attr.addColor || '#000');
			var color = new THREE.Color('#00ff00');
			var alpha = attr['addOpacity'] || 0;
			color.multiplyScalar(alpha);
			color.add(material.color.clone().multiplyScalar(material.opacity));
			alpha = parseFloat(alpha) + material.opacity;
			//alpha += material.opacity;
			color.multiplyScalar(1 / alpha);
			material.color.copy(color);
			material.opacity = Math.min(alpha, 1);
			material.reflectivity = attr.reflectivity || 0;
			if (attr.specularColor) {
				material.specular = new THREE.Color(attr.specularColor);
			}
			material.envMap = this.textureCube;
		});
		this.render();
	}
	private setCar() {
		if (this.mesh) {
			this.scene.remove(this.mesh);
			this.mesh = null;
			this.render();
		}

		this.load('assets/models/bmw/bmw.json').then((mesh: THREE.Mesh) => {
			if (this.mesh) {
				this.scene.remove(this.mesh);
			}
			this.mesh = mesh;
			//	this.mesh.scale = new THREE.Vector3(0.1, .1, .1);
			this.mesh.position.set(0, -0.5, 0);

			this.scene.add(this.mesh);
			this.applyMaterials();

		});
	}

	private load(url) {

		let promise = new Promise((resolve) => {
			this.loader.load(url, function (geometry, materials) {
				var mesh = new THREE.Mesh(geometry, materials);
				//   mesh.scale.set(0.01,0.01,0.01);
				resolve(mesh);
			});
		});

		return promise;
	}

	private initSkybox() {
		console.log('asdf');
		let r = "assets/models/skybox/";
		let urls = [
			r + "posx.jpg", r + "negx.jpg",
			r + "posy.jpg", r + "negy.jpg",
			r + "posz.jpg", r + "negz.jpg"
		];
		let textureCube = new THREE.CubeTextureLoader().load(urls, () => {
			let shader = THREE.ShaderLib["cube"];
			shader.uniforms["tCube"].value = textureCube;
			let material = new THREE.ShaderMaterial({
				fragmentShader: shader.fragmentShader,
				vertexShader: shader.vertexShader,
				uniforms: shader.uniforms,
				depthWrite: false,
				side: THREE.BackSide
			});
			let skybox = new THREE.Mesh(new THREE.BoxGeometry(500, 500, 500), material);
			this.scene.add(skybox);
		});
		textureCube.format = THREE.RGBFormat;
		this.textureCube = textureCube;

		let l = new THREE.Mesh(new THREE.PlaneGeometry(3, 1.5), new THREE.MeshBasicMaterial( { color: '#0d0d0d' } ));
		l.rotateX(Math.PI/2 * 3);
		l.position.set(0, 0.1, 0);

		this.scene.add(l);

		l = new THREE.Mesh(new THREE.PlaneGeometry(4, 0.39), new THREE.MeshBasicMaterial( { color: '#0d0d0d' } ));
		l.position.set(0, 0, 0.6);

		this.scene.add(l);

		l = new THREE.Mesh(new THREE.PlaneGeometry(4, 0.39), new THREE.MeshBasicMaterial( { color: '#0d0d0d' } ));
		l.position.set(0, 0, -0.6);
		l.rotateX(Math.PI);
		this.scene.add(l);
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		console.log("render");
		return (

 <Paper zDepth={1} rounded={false} className={classnames(style.car)}>
 <div className={classnames(style.select)}>
 <div>Выбор машины</div>
 <div>Выбор цвета</div>
 </div>
 </Paper>
			<div>
				<canvas ref="canvas" width={300} height={300}/>
			</div>
		)
	}
}
*/