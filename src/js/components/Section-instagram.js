import Swiper from '../imports/import-swiper';

export default class {
  constructor() {
    this.slider = null;
    this.settings = {
      speed: 0,
      allowTouchMove: false,
      loop: true,
      autoplay: {
        delay: 500,
      },
    };
  }

  init() {
    this.slider = new Swiper('#instagram-slider', this.settings);
  }

  destroy() {
    if (this.slider) {
      this.slider.destroy();
      this.slider = null;
    }
  }

}
