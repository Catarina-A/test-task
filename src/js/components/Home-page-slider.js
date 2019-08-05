import Swiper from '../imports/import-swiper';

export default class {
  constructor() {
    this.slider = null;
    this.settings = {
      slidesPerView: 'auto',
      touchStartPreventDefault: false,
      touchMoveStopPropagation: false,
    };
  }

  init() {
    this.slider = new Swiper('#home-looks-slider', this.settings);
  }
}
