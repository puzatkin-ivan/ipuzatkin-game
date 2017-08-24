export class KeyMap {
  public key;

  constructor() {
    this.key = {
      keyA: {
        code: 65,
        isPressed: false,
      },
      keyW: {
        code: 87,
        isPressed: false,
      },
      keyD: {
        code: 68,
        isPressed: false,
      },
      keyS: {
        code: 83,
        isPressed: false,
      },
      keySpace: {
        code: 32,
        isPressed: false,
      },
      arrowLeft: {
        code: 37,
        isPressed: false,
      },
      arrowUp: {
        code: 38,
        isPressed: false,
      },
      arrowRight: {
        code: 39,
        isPressed: false,
      },
      arrowDown: {
        code: 40,
        isPressed: false,
      },
      keyTab: {
        code: 9,
        isPressed: false,
      },
    };
  }
}