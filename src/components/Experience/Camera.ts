import Experience from "./Experience";
import { FirstPersonControls } from "./Utils/FirstPersonControl";
import Sizes from "./Utils/Sizes";
import * as THREE from "three";

export default class Camera {
  experience: Experience;
  perspectiveCamera!: THREE.PerspectiveCamera;
  orthographicCamera!: THREE.OrthographicCamera;
  scene: THREE.Scene;
  sizes: Sizes;
  canvas: HTMLCanvasElement | undefined;
  controls!: FirstPersonControls;
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setFirstPersonControl();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      15,
      this.sizes.aspect,
      0.1,
      1000
    );
    this.scene.add(this.perspectiveCamera);
  }
  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );
    this.scene.add(this.orthographicCamera);
  }
  setFirstPersonControl() {
    this.controls = new FirstPersonControls(
      this.perspectiveCamera,
      this.canvas
    );
  }
  resize() {
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();
  }
  update() {
    this.controls.update(0.5);
  }
}
