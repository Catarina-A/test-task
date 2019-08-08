import IntroSlider from '../components/Section-beds-intro-slider';
import MattressesSlider from '../components/Section-mattresses';

export default class {
  constructor() {
    this.introSlider = null;
    this.mattressesSlider = null;
  }

  init() {
    this.introSlider = new IntroSlider();
    this.mattressesSlider = new MattressesSlider();
    this.introSlider.init();
    this.mattressesSlider.init();
  }

  destroy() {
    this.introSlider.destroy();
    this.mattressesSlider.destroy();
    this.introSlider = null;
    this.mattressesSlider = null;
  }
}
