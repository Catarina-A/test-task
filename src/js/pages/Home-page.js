import LooksSlider from '../components/Section-slider';
import Video from '../components/Section-video';
import Instagram from '../components/Section-instagram';

export default class {
  constructor() {
    this.looksSlider = new LooksSlider();
    this.video = new Video();
    this.instagram = new Instagram();
  }

  init() {
    this.looksSlider.init();
    this.video.init();
    this.instagram.init();
  }

  destroy() {
    this.looksSlider.destroy();
    this.video.destroy();
    this.instagram.destroy();
  }
}
