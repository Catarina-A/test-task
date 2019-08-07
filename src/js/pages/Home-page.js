import LooksSlider from '../components/Section-slider';
import Video from '../components/Section-video';

export default class {
  constructor() {
    this.looksSlider = new LooksSlider();
    this.video = new Video();
  }

  init() {
    this.looksSlider.init();
    this.video.init();
  }

  destroy() {
    this.looksSlider.destroy();
    this.video.destroy();
  }
}
