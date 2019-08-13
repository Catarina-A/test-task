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
    };
  }

  init() {
    this.mainSlider = new Swiper('#mattresses-content-slider', this.mainSettings);

  }

  destroy() {
    this.mainSlider.destroy();
    this.mainSlider = null;
    this.mainSettings = null;
  }
}
