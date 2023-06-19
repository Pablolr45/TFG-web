import * as THREE from "three";
import Experience from "../Experience";
import Resources from "../Utils/Resources";

export default class Enviroment {
  experience: Experience;
  scene: THREE.Scene;
  resources: Resources;
  ambientlight!: THREE.AmbientLight;
  sunlight!: THREE.DirectionalLight;
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.setSunlight();
  }
  setSunlight() {
    this.ambientlight = new THREE.AmbientLight("#ffffff", 0.7);
    this.sunlight = new THREE.DirectionalLight("#ffffff", 1.5);
    this.sunlight.castShadow = true;
    this.sunlight.shadow.camera.far = 20;
    this.sunlight.shadow.mapSize.set(1024, 1024);
    this.sunlight.shadow.normalBias = 0.05;
    this.sunlight.position.set(1.5, 7, 3);
    this.scene.add(this.sunlight);
    this.scene.add(this.ambientlight);
  }
}