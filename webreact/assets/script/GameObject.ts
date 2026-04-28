const GAME_OBJECT: GameObject[] = [];

export class GameObject {
  timedelta: number;
  has_called_start: boolean;

  constructor() {
    GAME_OBJECT.push(this);
    this.timedelta = 0;
    this.has_called_start = false;
  }

  start(): void {}

  update(): void {}

  on_destroy(): void {}

  destroy(): void {
    this.on_destroy();

    for (let i = 0; i < GAME_OBJECT.length; i++) {
      const obj = GAME_OBJECT[i];
      if (obj === this) {
        GAME_OBJECT.splice(i, 1);
        break;
      }
    }
  }
}

let last_timestamp: number;
const step = (timestamp: number): void => {
  for (let obj of GAME_OBJECT) {
    if (!obj.has_called_start) {
      obj.has_called_start = true;
      obj.start();
    } else {
      obj.timedelta = timestamp - last_timestamp;
      obj.update();
    }
  }
  last_timestamp = timestamp;
  requestAnimationFrame(step);
};

requestAnimationFrame(step);
