import * as THREE from "three";
import Experience from "./Experience";
import Sizes from "./Utils/Sizes";
import Camera from "./Camera";

export default class Renderer {
  experience: Experience;
  renderer!: THREE.WebGLRenderer;
  canvas: HTMLCanvasElement | undefined;
  scene: THREE.Scene;
  camera: Camera;
  sizes: Sizes;
  selected: Array<THREE.Object3D>;
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.selected = [];
    this.setRenderer();
  }
  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRadio);
  }
  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRadio);
  }
  update() {
    if (this.scene.children[4]) {
      const intercept = this.camera.controls.rayCaster.intersectObjects(
        this.scene.children
      );
      intercept.forEach((inter) => {
        if (inter.object.name.includes("PadLock")) {
          this.selected.push(inter.object);
          console.log(this.selected);
        }
      });
    }
    this.renderer.render(this.scene, this.camera.perspectiveCamera);
    console.log("render");
    this.selected = [];
  }
}
