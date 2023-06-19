import * as THREE from "three";
import Experience from "../Experience";
import Resources from "../Utils/Resources";

export default class Room {
  experience: Experience;
  scene: THREE.Scene;
  resources: Resources;
  room: { [key: string]: any };
  actualRoom: THREE.Object3D<Event>;
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0 });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
    this.setModel();
  }
  setModel() {
    this.scene.add(this.actualRoom);
  }
}
