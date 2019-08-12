import Swiper from '../imports/import-swiper';

export default class {
  constructor() {
    this.domSlider = null;
    this.slider = null;
    this.settings = {
      speed: 0,
      allowTouchMove: false,
      loop: true,
      autoplay: {
        delay: 300,
      },
    };
    this.mouseOverHandler = null;
    this.mouseOutHandler = null;
  }

  play() {
    this.slider.autoplay.stop();
  }

  pause() {
    this.slider.autoplay.start();
  }

  init() {
    this.domSlider = document.getElementById('instagram-slider');
    if (!this.domSlider) return;
    this.mouseOverHandler = this.play.bind(this);
    this.mouseOutHandler = this.pause.bind(this);
    this.slider = new Swiper(this.domSlider, this.settings);
    this.domSlider.addEventListener('mouseenter', this.mouseOverHandler);
    this.domSlider.addEventListener('mouseleave', this.mouseOutHandler);
  }

  destroy() {
    this.slider.destroy();
    this.slider = null;
    this.domSlider = null;
    this.settings = null;
  }

}
