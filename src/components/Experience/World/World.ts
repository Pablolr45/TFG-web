import * as THREE from "three";
import Experience from "../Experience";
import Sizes from "../Utils/Sizes";
import Camera from "../Camera";
import Room from "./Room";
import Resources from "../Utils/Resources";
import Enviroment from "./Enviroment";

export default class World {
  experience: Experience;
  scene: THREE.Scene;
  sizes: Sizes;
  canvas: HTMLCanvasElement | undefined;
  camera: Camera;
  resources: Resources;
  room!: Room;
  enviroment!: Enviroment;
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.camera.perspectiveCamera.position.x = 11;
    this.camera.perspectiveCamera.position.y = 8;
    this.camera.perspectiveCamera.position.z = 15;
    this.resources = this.experience.resources;
    this.resources.on("ready", () => {
      console.log("Cargado");
      this.enviroment = new Enviroment();
      console.log(this.scene.children);
      this.room = new Room();
    });
  }
}
