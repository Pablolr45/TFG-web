import { PerspectiveCamera, Raycaster, Vector2, Vector3 } from "three";

class FirstPersonControls {
  object: PerspectiveCamera;
  domElement: any;
  enabled: boolean;
  movementSpeed: number;
  lookSpeed: number;
  currentLookAt: Vector3;
  lookVertical: boolean;
  autoForward: boolean;
  activeLook: boolean;
  heightSpeed: boolean;
  heightCoef: number;
  heightMin: number;
  heightMax: number;
  constrainVertical: boolean;
  verticalMin: number;
  verticalMax: number;
  mouseDragOn: boolean;
  autoSpeedFactor: number;
  pointerX: number;
  pointerY: number;
  moveForward: boolean;
  moveBackward: boolean;
  moveLeft: boolean;
  moveRight: boolean;
  viewHalfX: number;
  viewHalfY: number;
  handleResize: () => void;
  onPointerDown: (event: any) => void;
  onPointerUp: (event: any) => void;
  onPointerMove: (event: any) => void;
  onKeyDown: (event: any) => void;
  moveUp!: boolean;
  moveDown!: boolean;
  onKeyUp: (event: any) => void;
  //lookAt: (x: any, y: any, z: any) => this;
  update: (delta: any) => void;
  dispose: () => void;
  rayCaster: Raycaster;
  constructor(object: PerspectiveCamera, domElement: HTMLCanvasElement) {
    this.object = object;
    this.domElement = domElement;
    this.enabled = true;
    this.movementSpeed = 1.0;
    this.lookSpeed = 0.005;

    this.lookVertical = true;
    this.autoForward = false;

    this.activeLook = true;

    this.heightSpeed = false;
    this.heightCoef = 1;
    this.heightMin = 0.0;
    this.heightMax = 1.0;

    this.constrainVertical = false;
    this.verticalMin = 0;
    this.verticalMax = Math.PI;

    this.mouseDragOn = false;

    // internals

    this.autoSpeedFactor = 0.0;

    this.pointerX = 0;
    this.pointerY = 0;

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;

    this.viewHalfX = 0;
    this.viewHalfY = 0;

    this.currentLookAt = new Vector3(5, 1, 5);
    this.rayCaster = new Raycaster(this.object.position);

    this.handleResize = function () {
      if (this.domElement === document) {
        this.viewHalfX = window.innerWidth / 2;
        this.viewHalfY = window.innerHeight / 2;
      } else {
        this.viewHalfX = this.domElement.offsetWidth / 2;
        this.viewHalfY = this.domElement.offsetHeight / 2;
      }
    };

    this.onPointerDown = function (_event: any) {
      if (this.domElement !== document) {
        this.domElement.focus();
      }
      this.mouseDragOn = true;
    };

    this.onPointerUp = function (event) {
      if (this.activeLook) {
        switch (event.button) {
          case 0:
            this.moveForward = false;
            break;
          case 2:
            this.moveBackward = false;
            break;
        }
      }

      this.mouseDragOn = false;
    };

    this.onPointerMove = function (event) {
      if (this.domElement === document) {
        this.pointerX = event.pageX - this.viewHalfX;
        this.pointerY = event.pageY - this.viewHalfY;
      } else {
        this.pointerX =
          event.pageX - this.domElement.offsetLeft - this.viewHalfX;
        this.pointerY =
          event.pageY - this.domElement.offsetTop - this.viewHalfY;
      }
      this.rayCaster.setFromCamera(
        new Vector2(
          (this.pointerX * 2) / domElement.width,
          (-this.pointerY * 2) / domElement.height
        ),
        this.object
      );
    };

    this.onKeyDown = function (event) {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          this.moveForward = true;
          break;
        case "ArrowLeft":
        case "KeyA":
          this.moveLeft = true;
          break;
        case "ArrowDown":
        case "KeyS":
          this.moveBackward = true;
          break;
        case "ArrowRight":
        case "KeyD":
          this.moveRight = true;
          break;
        case "KeyR":
          this.moveUp = true;
          break;
        case "KeyF":
          this.moveDown = true;
          break;
      }
    };

    this.onKeyUp = function (event) {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          this.moveForward = false;
          break;
        case "ArrowLeft":
        case "KeyA":
          this.moveLeft = false;
          break;
        case "ArrowDown":
        case "KeyS":
          this.moveBackward = false;
          break;
        case "ArrowRight":
        case "KeyD":
          this.moveRight = false;
          break;
        case "KeyR":
          this.moveUp = false;
          break;
        case "KeyF":
          this.moveDown = false;
          break;
      }
    };
    this.update = (() => {
      return (delta) => {
        if (this.enabled === false) return;
        const actualMoveSpeed = delta * this.movementSpeed;
        if (this.moveLeft) {
          this.object.position.x += -actualMoveSpeed;
          this.currentLookAt.setX(this.currentLookAt.x - actualMoveSpeed);
        }
        if (this.moveRight) {
          this.object.position.x += actualMoveSpeed;
          this.currentLookAt.setX(this.currentLookAt.x + actualMoveSpeed);
        }
        if (this.moveForward) {
          this.object.position.z += -actualMoveSpeed;
          this.currentLookAt.setZ(this.currentLookAt.z - actualMoveSpeed);
        }
        if (this.moveBackward) {
          this.object.position.z += actualMoveSpeed;
          this.currentLookAt.setZ(this.currentLookAt.z + actualMoveSpeed);
        }
        this.object.lookAt(
          new Vector3(this.currentLookAt.x, 1, this.currentLookAt.z)
        );
      };
    })();
    this.dispose = function () {
      this.domElement.removeEventListener("contextmenu", contextmenu);
      this.domElement.removeEventListener("pointerdown", _onPointerDown);
      this.domElement.removeEventListener("pointermove", _onPointerMove);
      this.domElement.removeEventListener("pointerup", _onPointerUp);
      window.removeEventListener("keydown", _onKeyDown);
      window.removeEventListener("keyup", _onKeyUp);
    };
    const _onPointerMove = this.onPointerMove.bind(this);
    const _onPointerDown = this.onPointerDown.bind(this);
    const _onPointerUp = this.onPointerUp.bind(this);
    const _onKeyDown = this.onKeyDown.bind(this);
    const _onKeyUp = this.onKeyUp.bind(this);
    this.domElement.addEventListener("contextmenu", contextmenu);
    this.domElement.addEventListener("pointerdown", _onPointerDown);
    this.domElement.addEventListener("pointermove", _onPointerMove);
    this.domElement.addEventListener("pointerup", _onPointerUp);
    window.addEventListener("keydown", _onKeyDown);
    window.addEventListener("keyup", _onKeyUp);
    this.handleResize();
  }
}

function contextmenu(event: any) {
  event.preventDefault();
}

export { FirstPersonControls };