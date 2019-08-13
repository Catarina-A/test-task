import FixedAside from './Fixed-aside';

export default class {
  constructor() {
    this.fixedAside = null;
    this.asideSettings = {
      container: document.getElementById('elevation-container'),
      aside: document.getElementById('elevation-aside'),
    };
    this.langOpenHandler = null;
    this.langCloseHandler = null;
  }

  handleLangOpened() {
    // console.log('nag opened');
  }

  handleLangClosed() {
    // console.log('nag closed');
  }

  addListenersForLang() {
    this.langOpenHandler = this.handleLangOpened.bind(this);
    this.langCloseHandler = this.handleLangClosed.bind(this);
    window.addEventListener('langOpened', this.langOpenHandler);
    window.addEventListener('langClosed', this.langCloseHandler);
  }

  removeListenersForLangMenu() {
    window.removeEventListener('langOpened', this.langOpenHandler);
    window.removeEventListener('langClosed', this.langCloseHandler);
    this.langOpenHandler = null;
    this.langCloseHandler = null;
  }

  init() {
    this.addListenersForLang();
    this.fixedAside = new FixedAside(this.asideSettings);
    this.fixedAside.init();
  }

  destroy() {
    this.fixedAside.destroy();
    this.fixedAside = null;
    this.asideSettings = null;
    this.removeListenersForLangMenu();
  }
}
