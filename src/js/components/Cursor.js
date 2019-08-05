export default class {
  constructor(options) {
    this.el = options.el;
    this.time = options.time;
    this.delay = options.delay;
    this.watchTarget = options.watchTarget || false;
    this.LISTENER = 'mousemove';
    this.clickHandler = null;
    this.hidden = true;
  }

  handleMouseMove(e) {
    //console.log(e)
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
