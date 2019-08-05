export default class {
  constructor() {
    this.header = document.getElementById('header');
    this.sections = null;
    this.sectionsObserver = null;
    this.sectionObserverOptions = {
      threshold: 1,
    };
  }

  calculateThreshold() {
    this.sectionObserverOptions = {
      threshold: this.header.clientHeight / 2 / window.innerHeight,
    };
  }

  handleObserver(e) {
    console.log(e);
  }

  initStyleTrigger() {
    this.calculateThreshold();
    this.sections = document.querySelectorAll('[data-header-style]');
    if (this.sections.length) {
      this.sectionsObserver = new IntersectionObserver(this.handleObserver, this.sectionObserverOptions);
      this.sections.forEach(section => {
        this.sectionsObserver.observe(section);
      });
    }
  }

  destroyStyleTrigger() {

  }
}
