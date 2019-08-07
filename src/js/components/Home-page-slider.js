import Swiper from '../imports/import-swiper';

export default class {
  constructor() {
    this.slider = null;
    this.settings = {
      slidesPerView: 'auto',
      freeMode: true,
      parallax: true,
      //watchSlidesVisibility: true,
      touchStartPreventDefault: false,
      touchMoveStopPropagation: false,
    };
  }

  init() {
    this.slider = new Swiper('#home-looks-slider', this.settings);
  }

  destroy() {
    if (this.slider) {
      this.slider.destroy();
      this.slider = null;
    }
  }
}
