import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import planeteTexture from "../img/planeteTexture.png";
import gsap from "gsap";

let container = document.getElementById("container");
let page = document.getElementById("page");
let closeBtn = document.getElementById("close");


page.style.display = 'none';
closeBtn.addEventListener('click', cacherPage);
container.addEventListener('click', afficherPage);

//création du renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


container.appendChild(renderer.domElement);
//création de la scène
const scene = new THREE.Scene();

//création de la caméra
const camera = new THREE.PerspectiveCamera(
    25,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

camera.position.set(0, 2, 150);
orbit.update();



const gridHelper = new THREE.GridHelper(20);
scene.add(gridHelper);
//création de la planète
let sphereGeometry = new THREE.SphereGeometry(16, 30, 30); //16, 30, 30
let sphereMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(planeteTexture)
}); //e4bf74

let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);


let direction = 'up';

function backAnumation() {
    //https://codepen.io/nskrgv/pen/XpOBPM
}
function animate() { 
    /*sphere.rotateY(0.00001);
    // Demande l'animation de la prochaine frame
    requestAnimationFrame(animate);

    // Fait monter ou descendre la sphère en fonction de la direction
    if (direction === 'up') {
        sphere.position.y += 0.0002;
        if (sphere.position.y > 2) {
            direction = 'down';
        }
    } else {
        sphere.position.y -= 0.0002;
        if (sphere.position.y < 0) {
            direction = 'up';
        }
    }*/

    // Rendu de la scène
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

function cacherPage() {
    page.style.display = 'none';
    gsap.to(camera.position, {x: 0, duration:1});
    setTimeout(() => {
        container.addEventListener('click', afficherPage);
    },"1000");
}

function afficherPage() {
    page.style.animationName ="slidein";
    page.style.display = 'block';
    page.style.animationName = 'none';
    void page.offsetWidth;
    page.style.animationName ="slidein";
    gsap.to(camera.position, {x: -25, duration:1});
    container.removeEventListener('click', afficherPage);
}