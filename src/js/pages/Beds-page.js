import IntroSlider from '../components/Section-beds-intro-slider';

export default class {
  constructor() {
    this.introSlider = null;
  }

  init() {
    this.introSlider = new IntroSlider();
    this.introSlider.init();
  }

  destroy() {
    this.introSlider.destroy();

    this.introSlider = null;
  }
}
