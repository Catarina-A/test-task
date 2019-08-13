import Swiper from '../imports/import-swiper';

export default class {
  constructor() {
    this.mainSlider = null;
    this.imageSliders = {};
    this.domImageSliders = null;
    this.mainSettings = {
      speed: 1000,
      allowTouchMove: false,
      effect: 'fade',
      autoHeight: true,
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: '#mattresses-pagination',
        type: 'bullets',
        clickable: true,
        bulletClass: 'mattresses__pagination-btn',
        bulletActiveClass: 'active',
        renderBullet(index, className) {
          return `<button class="${className}">N&#176; ${index + 1}</button>`;
        },
      },
    };
    this.imageSettings = {
      slidesPerView: 'auto',
      freeMode: true,
      parallax: true,
      //watchSlidesVisibility: true,
      touchStartPreventDefault: false,
      touchMoveStopPropagation: false,
    };
  }

  init() {
    this.mainSlider = new Swiper('#mattresses-content-slider', this.mainSettings);

    this.domImageSliders = document.querySelectorAll('.mattresses__image-slider');
    this.domImageSliders.forEach((domSlider, index) => {
      this.imageSliders[`slider_${index}`] = new Swiper(domSlider, this.imageSettings);
    });

  }

  destroy() {
    this.mainSlider.destroy();
    this.mainSlider = null;
    this.mainSettings = null;
  }
}
