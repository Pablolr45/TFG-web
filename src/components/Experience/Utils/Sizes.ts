import { EventEmitter } from "events";

export default class Sizes extends EventEmitter {
  width: number;
  height: number;
  aspect: number;
  pixelRadio: number;
  constructor() {
    super();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width / this.height;
    this.pixelRadio = Math.min(window.devicePixelRatio, 2);
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspect = this.width / this.height;
      this.pixelRadio = Math.min(window.devicePixelRatio, 2);
      this.emit("resize");
    });
  }
}