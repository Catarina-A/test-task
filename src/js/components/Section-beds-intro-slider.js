import Swiper from '../imports/import-swiper';

export default class {
  constructor() {
    this.slider = null;
    this.settings = {
      freeMode: true,
      touchStartPreventDefault: false,
      touchMoveStopPropagation: false,
    };
  }

  init() {
    this.slider = new Swiper('#beds-intro-slider', this.settings);
  }

  destroy() {
    this.slider.destroy();
    this.slider = null;
    this.settings = null;
  }
}
