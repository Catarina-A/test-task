export default class {
  constructor(props) {
    this.container = props.container;
    this.aside = props.aside;
    this.navSticky = 'sticky';
    this.navBottom = 'bottom';
    this.asideCssTop = 0;
    this.scrollHandler = null;
  }

  getAsideCssTop() {
    const value = getComputedStyle(this.aside).top;
    const res = parseInt(value);
    this.asideCssTop = isNaN(res) ? 0 : res;
  };

  makeSticky() {
    this.aside.classList.add(this.navSticky);
    this.aside.classList.remove(this.navBottom);
  };

  makeBottom() {
    this.aside.classList.add(this.navBottom);
    this.aside.classList.remove(this.navSticky);
  };

  makeFree() {
    this.aside.classList.remove(this.navSticky);
    this.aside.classList.remove(this.navBottom);
  };

  checkAsidePosition() {
    const containerRectTop = this.container.getBoundingClientRect().top;
    const asideHeight = this.aside.clientHeight;
    const containerHeight = this.container.clientHeight;

    if (asideHeight >= containerHeight) {
      this.makeFree();
    } else {
      if (containerRectTop <= this.asideCssTop) {

        if (containerRectTop + containerHeight <= asideHeight) {
          this.makeBottom();
        } else {
          this.makeSticky();
        }
      } else {
        this.makeFree();
      }
    }
  }

  init() {
    if (!this.container || !this.aside) return;
    this.getAsideCssTop();
    this.checkAsidePosition();
    this.scrollHandler = this.checkAsidePosition.bind(this);
    window.addEventListener('scroll', this.scrollHandler);

  }

  destroy() {
    window.removeEventListener('scroll', this.scrollHandler);
    this.container = null;
    this.aside = null;
    this.scrollHandler = null;
  }
}
