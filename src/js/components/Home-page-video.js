export default class {
  constructor() {
    this.ATTR = 'data-video-src';
    this.data = {
      video: null,
      observer: null,
      progressBar: null,
      progressLine: null,
      playing: false,
      duration: 0,
    };
  }

  setAttr() {
    this.data.video = document.getElementById('home-page-video');
    const url = this.data.video.getAttribute(this.ATTR);
    this.data.video.setAttribute('src', url);
  }

  loadVideo() {
    return new Promise(resolve => {
      this.data.video.addEventListener('canplay', resolve);
    });
  }

  createProgressBar() {
    this.data.progressBar = document.createElement('div');
    this.data.progressLine = document.createElement('div');
    this.data.progressBar.appendChild(this.data.progressLine);
    this.data.video.parentNode.appendChild(this.data.progressBar);
  }

  updateProgressBar() {
    const video = this.data.video;
    const value = video.currentTime / this.data.duration;
    this.data.progressLine.style.transform = `scale3d(${value}, 1, 1)`;
  }

  startProgressWatcher() {
    const updateProgress = () => {
      if (this.data.playing) {
        this.updateProgressBar();
        requestAnimationFrame(updateProgress);
      }
    };
    requestAnimationFrame(updateProgress);
  }

  startVideo() {
    this.data.video.play();
    this.data.playing = true;
    this.startProgressWatcher();

  }

  stopVideo() {
    this.data.video.pause();
    this.data.playing = false;
  }

  initPlayer() {
    const video = this.data.video;
    video.muted = true;
    this.data.duration = video.duration;
    video.addEventListener('play', this.startVideo.bind(this));
    video.addEventListener('stop', this.stopVideo.bind(this));
  }

  handleObserverEvents(e) {
    const entry = e[0];
    if (entry.isIntersecting) {
      this.startVideo();
    } else {
      this.stopVideo();
    }
  }

  initObserver() {
    const options = {
      threshold: 0,
    };
    this.data.observer = new IntersectionObserver(this.handleObserverEvents.bind(this), options);
    this.data.observer.observe(this.data.video);
  }

  handleBarClick(e) {
    const x = e.layerX;
    const width = this.data.progressBar.clientWidth;
    const pos = x / width; // there clicked
    this.data.video.currentTime = this.data.duration * pos;
  }

  handleVideoClick() {
    if (this.data.playing) {
      this.data.video.pause();
      this.data.playing = false;
    } else {
      this.data.video.play();
      this.data.playing = true;
    }
  }

  initEvensListeners() {
    const bar = this.data.progressBar;
    const video = this.data.video;
    bar.addEventListener('click', this.handleBarClick.bind(this));
    video.addEventListener('click', this.handleVideoClick.bind(this));
  }

  init() {
    try {
      this.setAttr();
      this.loadVideo().then(() => {
        this.createProgressBar();
        this.initPlayer();
        this.initEvensListeners();
        this.initObserver();
      });
    } catch (e) {
      console.log(e);
    }
  }

  destroy() {

  }
}
