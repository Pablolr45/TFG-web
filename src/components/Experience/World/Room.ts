import { EventEmitter } from "events";

export default class Time extends EventEmitter {
  start: number;
  current: number;
  elapse: number;
  delta: number;
  constructor() {
    super();
    this.start = Date.now();
    this.current = this.start;
    this.elapse = 0;
    this.delta = 16;
    this.update();
  }
  update() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapse = this.current - this.start;
    this.emit("update");
    window.requestAnimationFrame(() => {
      this.update();
    });
  }
}