import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Camera from "./Camera";
import Time from "./Utils/Time";
import Renderer from "./Renderer";
import World from "./World/World";
import Resources from "./Utils/Resources";
import assets from "./Utils/assets";

export default class Experience {
  static instance: Experience;
  canvas;
  scene!: THREE.Scene;
  camera!: Camera;
  sizes!: Sizes;
  renderer!: Renderer;
  world!: World;
  resources!: Resources;
  time!: Time;
  constructor(canvas?: HTMLCanvasElement) {
    if (Experience.instance) {
      console.log("Ya hay instancia");
      return Experience.instance;
    }
    console.log("No hay instancia");
    Experience.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.resources = new Resources(assets);
    this.renderer = new Renderer();
    this.world = new World();
    this.time = new Time();
    this.time.on("update", () => {
      this.update();
    });
    this.sizes.on("resize", () => {
      this.resize();
    });
  }
  update() {
    this.camera.update();
    this.renderer.update();
  }
  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
}
