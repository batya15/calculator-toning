import * as React from 'react';
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';

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
		let camera = new THREE.PerspectiveCamera(45, 1024 / 768, 0.1, 1000);
		camera.position.x = -5.4241;
		camera.position.y = 10.3278;
		camera.position.z = -3.0568;
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
				canvas: this.refs.canvas
			}
		);
		renderer.setPixelRatio(window.devicePixelRatio);

		renderer.setSize(1024, 768);
		this.renderer = renderer;

		//this.$el.append(this.renderer.domElement);

		this.loader = new THREE.JSONLoader();

		//var controls = new THREE.OrbitControls(camera, renderer.domElement);
		var controls = new OrbitControls(camera, renderer.domElement);
		controls.minDistance = 3;
		controls.maxDistance = 6;
		controls.minPolarAngle = Math.PI / 2.6;
		controls.maxPolarAngle = Math.PI/2.3;


		this.controls = controls;
		this.initSkybox();
		this.setCar();
		this.controls.addEventListener('change', () => {
			this.renderer.render(this.scene, this.camera);
		});

	}


	private setCar() {
		if (this.mesh) {
			this.scene.remove(this.mesh);
			this.mesh = null;
			this.render();
		}

		this.load('assets/models/bmw/bmw.json').then((mesh : THREE.Mesh) => {
			if (this.mesh) {
				this.scene.remove(this.mesh);
			}
			this.mesh = mesh;
		//	this.mesh.scale = new THREE.Vector3(0.1, .1, .1);
			this.scene.add(this.mesh);
			//this.applyMaterials();

		});
	}

	private load(url) {

		let promise = new Promise( (resolve) => {
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

	}

	shouldComponentUpdate() {
		return false;
	}
	render() {
		console.log("render");
		return (
			<div>
				<canvas ref="canvas" width={300} height={300}/>
			</div>
		)
	}
}