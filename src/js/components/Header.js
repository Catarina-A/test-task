export default class {
  constructor(options) {
    this.header = options.header;
    this.sections = null;
    this.CLASS_WHITE = 'white';
    this.scrolHandler = null;
    this.isBig = true;
    this.CLASS_SMALL = 'small';
  }

  makeHeaderColorWhite() {
    this.header.classList.add(this.CLASS_WHITE);
  }

  makeHeaderColorDefault() {
    this.header.classList.remove(this.CLASS_WHITE);
  }

  handleScroll() {
    const isHeaderOverBlack = this.sections.find(section => {
      const sectionRect = section.getBoundingClientRect();
      const halfHeaderHeight = this.header.clientHeight / 2 + this.header.getBoundingClientRect().top;
      return (sectionRect.top < halfHeaderHeight) &&
          (sectionRect.top + section.clientHeight > halfHeaderHeight);
    });
    if (isHeaderOverBlack) {
      this.makeHeaderColorWhite();
    } else {
      this.makeHeaderColorDefault();
    }
  }

  initStyleTrigger() {
    const nodeSections = document.querySelectorAll('.header-style-black');
    if (nodeSections.length) {
      this.sections = Array.from(nodeSections);
      this.scrolHandler = this.handleScroll.bind(this);
      window.addEventListener('scroll', this.scrolHandler);
    }
  }

  destroyStyleTrigger() {
    window.removeEventListener('scroll', this.scrolHandler);
    this.sections = null;
  }

  // size control
  makeBig() {
    this.header.classList.remove(this.CLASS_SMALL);
  };

  makeSmall() {
    this.header.classList.add(this.CLASS_SMALL);
  };

  toggleHeaderSize(e) {
    if (e[0].isIntersecting) {
      this.makeBig();
      this.isBig = true;
    } else {
      this.makeSmall();
      this.isBig = false;
    }
  }

  initSizeControl() {
    // create DOMElement to listen for top position
    const domHiddenElement = document.createElement('div');
    domHiddenElement.style.cssText = `
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5rem;
  z-index: -999999;
  pointer-events: none;
  `;
    domHiddenElement.classList.add('page-top-position-detector');
    document.body.appendChild(domHiddenElement);
    const observer = new IntersectionObserver(this.toggleHeaderSize.bind(this));
    observer.observe(domHiddenElement);
  }
}
