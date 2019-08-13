import IntroSlider from '../components/Section-beds-intro-slider';
import MattressesSlider from '../components/Section-mattresses';
import Elevation from '../components/Section-elevation';
import Accordion from '../components/Accordion';
import IntoBedsSlider from '../components/Section-into-beds-slider';

export default class {
  constructor() {
    this.mattressesSlider = null;
    this.introSlider = null;
    this.elevation = null;
    this.accordion = null;
    this.intoBedsSlider = null;
    this.accordionSettings = {
      container: document.getElementById('beds-accordion'),
    };
  }

  init() {
    this.introSlider = new IntroSlider();
    this.mattressesSlider = new MattressesSlider();
    this.elevation = new Elevation();
    this.accordion = new Accordion(this.accordionSettings);
    this.intoBedsSlider = new IntoBedsSlider();

    this.introSlider.init();
    this.mattressesSlider.init();
    this.elevation.init();
    this.intoBedsSlider.init();
    this.accordion.init();
  }

  destroy() {
    this.introSlider.destroy();
    this.mattressesSlider.destroy();
    this.elevation.destroy();
    this.accordion.destroy();
    this.intoBedsSlider.destroy();

    this.introSlider = null;
    this.mattressesSlider = null;
    this.elevation = null;
    this.accordion = null;
    this.intoBedsSlider = null;
  }
}
