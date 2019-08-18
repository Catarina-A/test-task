export default class {
  constructor() {
    this.header = document.getElementById('header');
    this.burger = document.getElementById('mobile-burger-btn');
    this.mobileMenu = document.getElementById('nav-list-mobile');
    this.configuratorBtn = document.getElementById('configurator-main-btn');
    this.langMobile = document.getElementById('lang-mobile');
    this.langMobileBtn = document.getElementById('language-mobile-btn');
    this.langMobileOverlay = document.getElementById('lang-mobile-overlay');
    this.CLASS_WHITE = 'white';
    this.CLASS_ACTIVE = 'active';
    this.CLASS_SMALL = 'small';
    this.CLASS_CONDIGURATOR = 'configurator';
    this.BLUR_VALUE = '20px';
    this.BRIGHTNESS_VALUE = '70%';
    this.BODY_COLOR = '#737373';
    this.sections = null;
    this.scrolHandler = null;
    this.ATTR_HEADER_COLOR = 'data-cursor-color';
    this.isBig = true;
    this.content = null;
    this.mobileMenuIsOpened = false;
    this.mobileLangIsOpened = false;
    this.mobileMenuTime = 1;
    this.prevWindowWidth = window.innerWidth;
  }

  // style control
  makeHeaderColorWhite() {
    this.header.classList.add(this.CLASS_WHITE);
    this.header.setAttribute(this.ATTR_HEADER_COLOR, 'white');
  }

  makeHeaderColorDefault() {
    this.header.classList.remove(this.CLASS_WHITE);
    this.header.removeAttribute(this.ATTR_HEADER_COLOR);
  }

  setStyle() {
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
    const nodeSections = document.querySelectorAll('.header-style-white');
    if (nodeSections.length) {
      this.sections = Array.from(nodeSections);
      this.setStyle();
      this.scrolHandler = this.setStyle.bind(this);
      window.addEventListener('scroll', this.scrolHandler);
    } else {
      this.makeHeaderColorDefault();
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

  // mobile menu control

  openMobileMenu() {
    this.mobileMenuIsOpened = true;
    this.burger.classList.add(this.CLASS_ACTIVE);
    this.mobileMenu.classList.add(this.CLASS_ACTIVE);
    this.langMobile.classList.add(this.CLASS_ACTIVE);
    this.configuratorBtn.classList.add(this.CLASS_SMALL);
    TweenLite.set(document.body, {
      backgroundColor: this.BODY_COLOR,
    });
    TweenLite.fromTo(this.content, this.mobileMenuTime, {
      webkitFilter: `blur(0) brightness(100%)`,
      filter: `blur(0) brightness(100%)`,
    }, {
      webkitFilter: `blur(${this.BLUR_VALUE}) brightness(${this.BRIGHTNESS_VALUE})`,
      filter: `blur(${this.BLUR_VALUE}) brightness(${this.BRIGHTNESS_VALUE})`,
    });
  }

  closeMobileMenu() {
    this.closeMobileLang();
    this.mobileMenuIsOpened = false;
    this.burger.classList.remove(this.CLASS_ACTIVE);
    this.mobileMenu.classList.remove(this.CLASS_ACTIVE);
    this.langMobile.classList.remove(this.CLASS_ACTIVE);
    this.configuratorBtn.classList.remove(this.CLASS_SMALL);
    TweenLite.to(document.body, this.TIME, {
      backgroundColor: '#fff',
    });
    const tl = TweenLite.to(this.content, this.mobileMenuTime, {
      webkitFilter: `blur(0) brightness(100%)`,
      filter: `blur(0) brightness(100%)`,
    });
    tl.eventCallback('onComplete', () => {
      this.content.removeAttribute('style');
    });
  }

  openMobileLang() {
    this.mobileLangIsOpened = true;
    TweenLite.fromTo(this.mobileMenu, this.mobileMenuTime, {
      webkitFilter: `blur(0) brightness(100%)`,
      filter: `blur(0) brightness(100%)`,
    }, {
      webkitFilter: `blur(${this.BLUR_VALUE}) brightness(${this.BRIGHTNESS_VALUE})`,
      filter: `blur(${this.BLUR_VALUE}) brightness(${this.BRIGHTNESS_VALUE})`,
      pointerEvents: 'none',
    });
    this.langMobileBtn.classList.add(this.CLASS_ACTIVE);
    this.langMobileOverlay.classList.add(this.CLASS_ACTIVE);
  }

  closeMobileLang() {
    this.mobileLangIsOpened = false;
    const tl = TweenLite.to(this.mobileMenu, this.mobileMenuTime, {
      webkitFilter: `blur(0) brightness(100%)`,
      filter: `blur(0) brightness(100%)`,
      pointerEvents: 'auto',
    });
    tl.eventCallback('onComplete', () => {
      this.mobileMenu.removeAttribute('style');
    });
    this.langMobileBtn.classList.remove(this.CLASS_ACTIVE);
    this.langMobileOverlay.classList.remove(this.CLASS_ACTIVE);
  }

  handleBurgerClick() {
    if (this.mobileMenuIsOpened) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  handleMobileLangClick() {
    if (this.mobileLangIsOpened) {
      this.closeMobileLang();
    } else {
      this.openMobileLang();
    }
  }

  initMobileLang() {
    this.langMobileBtn.addEventListener('click', this.handleMobileLangClick.bind(this));
    this.langMobileOverlay.addEventListener('click', this.closeMobileLang.bind(this));
  }

  initMobileMenuControl() {
    this.content = document.querySelector('[data-barba="container"]');
    this.burger.addEventListener('click', this.handleBurgerClick.bind(this));
    window.addEventListener('resize', () => {
      if (this.prevWindowWidth !== window.innerWidth) {
        this.prevWindowWidth = window.innerWidth;
        this.closeMobileMenu();
        this.closeMobileLang();
      }
    });
    this.initMobileLang();
  }

  resetMobileMenuControl() {
    this.content = document.querySelector('[data-barba="container"]');
  }

  enableConfiguratorMode() {
    this.header.classList.add(this.CLASS_CONDIGURATOR);
  }

  disableConfiguratorMode() {
    this.header.classList.remove(this.CLASS_CONDIGURATOR);
  }
}
