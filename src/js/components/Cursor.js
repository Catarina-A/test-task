export default class {
  constructor(options) {
    this.el = options.el;
    this.time = options.time;
    this.delay = options.delay;
    this.LISTENER = 'mousemove';
    this.clickHandler = null;
  }

  handleMouseMove(e) {
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
