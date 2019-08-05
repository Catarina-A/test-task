export default class {
  constructor(options) {
    this.el = options.el;
    this.time = options.time;
    this.delay = options.delay;
    this.watchTarget = options.watchTarget || false;
    this.LISTENER = 'mousemove';
    this.clickHandler = null;
    this.hidden = true;
    this.attrType = 'data-cursor-type';
    this.attrColor = 'data-cursor-color';
  }

  setCursorType(type) {
    this.el.setAttribute(this.attrType, type);
  }

  setCursorColor(color) {
    this.el.setAttribute(this.attrColor, color);
  }

  checkTarget(e) {
    const path = e.path || e.composedPath();
    if (path) {
      let isNoTypeSetted = true;
      let isNoColorSetted = true;
      for (const el of path) {
        if (el.attributes) {
          const type = el.getAttribute(this.attrType);
          const color = el.getAttribute(this.attrColor);
          if (type && isNoTypeSetted) {
            isNoTypeSetted = false;
            this.setCursorType(type);
          } else if (isNoTypeSetted) {
            this.setCursorType('');
          }
          if (color && isNoColorSetted) {
            isNoColorSetted = false;
            this.setCursorColor(color);
          } else if (isNoColorSetted) {
            this.setCursorColor('');
          }
          if (!isNoTypeSetted && !isNoColorSetted) break;

        } else {
          break;
        }
      }
    }
  }

  handleMouseMove(e) {
    console.log(e)
    if (this.hidden) {
      this.hidden = false;
      this.el.classList.add('visible');
    }
    TweenLite.to(this.el, this.time, {
      delay: this.delay,
      x: e.x,
      y: e.y,
    });
  }

  init() {
    this.clickHandler = this.handleMouseMove.bind(this);
    window.addEventListener(this.LISTENER, this.clickHandler);
  }

  destroy() {
    window.removeEventListener(this.LISTENER, this.clickHandler);
  }
}
