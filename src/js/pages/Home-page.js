import LooksSlider from '../components/Section-slider';
import Video from '../components/Section-video';
import Instagram from '../components/Section-instagram';

export default class {
  constructor() {
    this.looksSlider = null;
    this.video = null;
    this.instagram = null;
  }

  init() {
    this.looksSlider = new LooksSlider();
    this.video = new Video();
    this.instagram = new Instagram();
    this.looksSlider.init();
    this.video.init();
    this.instagram.init();
  }

  destroy() {
    this.looksSlider.destroy();
    this.video.destroy();
    this.instagram.destroy();
    this.looksSlider = null;
    this.video = null;
    this.instagram = null;
  }
}
