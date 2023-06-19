import { EventEmitter } from "events";
import Experience from "../Experience";
import Renderer from "../Renderer";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export default class Resources extends EventEmitter {
  experience: Experience;
  renderer: Renderer;
  assets: Array<any>;
  loaded: number;
  items: { [key: string]: any };
  queue: number;
  loaders!: { [key: string]: any };
  constructor(assets: Array<any>) {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer;
    this.assets = assets;
    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;
    this.setLoaders();
    this.startLoading();
    console.log(this.items);
  }
  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.dracoLoaders = new DRACOLoader();
    this.loaders.dracoLoaders.setDecoderPath("/draco");
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoaders);
  }
  startLoading() {
    for (const asset of this.assets) {
      if (asset.type === "glbModel") {
        this.loaders.gltfLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
        });
      }
    }
  }
  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;
    if (this.loaded === this.queue) {
      this.emit("ready");
    }
  }
}
