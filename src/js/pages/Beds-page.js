import IntroSlider from '../components/Section-beds-intro-slider';
import MattressesSlider from '../components/Section-mattresses';
import Elevation from '../components/Section-elevation';
import Accordion from '../components/Accordion';

export default class {
  constructor() {
    this.introSlider = null;
    this.mattressesSlider = null;
    this.introSlider = null;
    this.elevation = null;
    this.accordion = null;
    this.accordionSettings = {
      container: document.getElementById('beds-accordion'),
      fullHeight: true,
    };
  }

  init() {
    this.introSlider = new IntroSlider();
    this.mattressesSlider = new MattressesSlider();
    this.elevation = new Elevation();
    this.accordion = new Accordion(this.accordionSettings);
    this.introSlider.init();
    this.mattressesSlider.init();
    this.elevation.init();
    this.accordion.init();
  }

  destroy() {
    this.introSlider.destroy();
    this.mattressesSlider.destroy();
    this.elevation.destroy();
    this.accordion.destroy();
    this.introSlider = null;
    this.mattressesSlider = null;
    this.elevation = null;
    this.accordion = null;
  }
}
