import lottie from 'lottie-web';

export default class {
  constructor(settings) {
    this.SLIDER = null;
    this.pathAttr = 'data-animation-path';
    this.slides = settings.slides;
    this.settings = {
      container: settings.container,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: null,
    };
    this.messages = {
      notLoaded: 'Error, wait Lottie initialisation, then do your actions',
    };
    this.currentFrame = 0;
  }

  slideTo(index) {
    if (this.SLIDER.isLoaded) {
      if (!this.slides[index]) return;
      if (index === this.currentSlide) return;
      this.SLIDER.playSegments([this.currentFrame, this.slides[index]],
          true);
    } else {
      console.log(this.messages.notLoaded);
    }

    this.currentSlide = index;
  }

  setCurrentFrame() {
    this.currentFrame = this.SLIDER.renderer.renderedFrame;
  }

  init() {
    return new Promise(resolve => {
      try {
        const container = this.settings.container;
        this.settings.path = container.getAttribute(this.pathAttr);
        this.SLIDER = lottie.loadAnimation(this.settings);
        const loaded = () => {
          this.SLIDER.removeEventListener('data_ready', loaded);
          this.SLIDER.addEventListener('enterFrame',
              this.setCurrentFrame.bind(this));
          resolve('ok');
        };
        this.SLIDER.addEventListener('data_ready', loaded);
      } catch (e) {
        console.log('error, check settings for lottie controller');
        console.log(e);
        resolve('error');
      }
    });
  }
}
