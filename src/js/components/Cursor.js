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
      let typeResult = '';
      let colorResult = '';
      for (const el of path) {
        if (el.attributes) {
          const tag = el.tagName;
          const isLink = tag === 'A' || tag === 'BUTTON';
          const type = el.getAttribute(this.attrType) || (isLink ? 'bigger' : null);
          const color = el.getAttribute(this.attrColor);
          if (!typeResult && type) {
            typeResult = type;
          }
          if (!colorResult && color) {
            colorResult = color;
          }
          if (typeResult && colorResult) break;
        } else {
          break;
        }
      }
      this.setCursorType(typeResult);
      this.setCursorColor(colorResult);
    }
  }

  handleMouseMove(e) {
    if (this.watchTarget) {
      this.checkTarget(e);
    }
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
