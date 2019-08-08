import IntroSlider from '../components/Section-beds-intro-slider';
import MattressesSlider from '../components/Section-mattresses';
import Elevation from '../components/Section-elevation';

export default class {
  constructor() {
    this.introSlider = null;
    this.mattressesSlider = null;
    this.introSlider = null;
    this.elevation = null;
  }

  init() {
    this.introSlider = new IntroSlider();
    this.mattressesSlider = new MattressesSlider();
    this.elevation = new Elevation();
    this.introSlider.init();
    this.mattressesSlider.init();
    this.elevation.init();
  }

  destroy() {
    this.introSlider.destroy();
    this.mattressesSlider.destroy();
    this.elevation.destroy();
    this.introSlider = null;
    this.mattressesSlider = null;
    this.elevation = null;
  }
}
