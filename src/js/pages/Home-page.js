import LooksSlider from '../components/Home-page-slider';
import Video from '../components/Home-page-video';

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
