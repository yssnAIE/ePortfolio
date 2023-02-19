import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

camera.position.set(0, 2, 5);
orbit.update();



const gridHelper = new THREE.GridHelper(20);
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(4);
const sphereMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);


function animate() {    
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);