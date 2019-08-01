import Swiper from '../imports/import-swiper';

export default class {
  constructor() {
    this.slider = null;
    this.settings = {
      slidesPerView: 'auto',
    };
  }

  init() {
    console.log('test');
    this.slider = new Swiper('#home-looks-slider', this.settings);
  }
}
