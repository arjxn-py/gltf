import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene();


const loader = new GLTFLoader();
loader.load('assets/tc_gltf.gltf', function(gltf){
    console.log('gltf model loaded successfully');
    console.log(gltf);
    const model = gltf.scene;
    model.scale.set(0.01,0.01,0.01);

    scene.add(model);
},function(xhr){
    console.log(xhr.loaded/xhr.total * 100 + '% Loaded');
},function(err){
    console.log('An Error Occured');
})



const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(2,2,5);
scene.add(light);


const sizes = {
    width : window.innerWidth,
    height : window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
camera.position.set(0,1,2)
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})


renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.updateShadowMap.enabled = true
renderer.gammaOutput = true

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera)
}
animate()

const controls = new OrbitControls(camera, canvas);