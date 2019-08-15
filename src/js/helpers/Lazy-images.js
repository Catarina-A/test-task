export default class {
  constructor() {
    this.ATTR = 'data-lazy-src';
    this.images = null;
    this.observerOptions = {
      threshold: 0,
      margin: null,
    };
    this.observer = null;
  }

  handleObserver(e) {
    console.log(e);
  }

  init() {
    this.observerOptions.margin = `${window.innerHeight / 3}px 0 0 0`;
    this.images = document.querySelectorAll(`[${this.ATTR}]`);
    if (!this.images.length) return;
    this.observer = new IntersectionObserver(this.handleObserver, this.observerOptions);
    this.images.forEach(image => {
      this.observer.observe(image);
    });
  }

  destroy() {

  }
}
