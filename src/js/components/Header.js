export default class {
  constructor(options) {
    this.header = options.header
    this.sections = null;
    this.CLASS_WHITE = 'white';
    this.scrolHandler = null;
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
      const halfHeaderHeight = this.header.clientHeight / 2;
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
}
