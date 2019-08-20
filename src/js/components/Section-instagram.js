import axios from 'axios';
import Swiper from '../imports/import-swiper';

export default class {
  constructor() {
    this.domSlider = null;
    this.slider = null;
    this.postURL = process.env.INSTAGRAM_POSTS;
    this.slides = null;
    this.settings = {
      speed: 0,
      allowTouchMove: false,
      loop: true,
      autoplay: {
        delay: 300,
      },
    };
    this.mouseOverHandler = null;
    this.mouseOutHandler = null;
  }

  play() {
    this.slider.autoplay.stop();
  }

  pause() {
    this.slider.autoplay.start();
  }

  generateSlidesArray() {
    this.slides = this.postsResponse.reduce((acc, post) => {
      const image = post.node.thumbnail_resources[3].src;
      const link = 'https://www.instagram.com/p/' + post.node.shortcode;
      const slide = `
<div class="swiper-slide">
  <a target="_blank" href="${link}">
    <img src="${image}" alt="image">
  </a>
</div>
`;
      acc.push(slide);
      return acc;
    }, []);
  }

  async init() {
    try {
      this.domSlider = document.getElementById('instagram-slider');
      if (!this.domSlider) return;
      const response = await axios.get(this.postURL);
      this.postsResponse = response.data.graphql.user.edge_owner_to_timeline_media.edges;
      this.generateSlidesArray();
      this.postsResponse = null;
      this.slider = new Swiper(this.domSlider, this.settings);
      this.slider.appendSlide(this.slides);
      this.mouseOverHandler = this.play.bind(this);
      this.mouseOutHandler = this.pause.bind(this);
      this.domSlider.addEventListener('mouseenter', this.mouseOverHandler);
      this.domSlider.addEventListener('mouseleave', this.mouseOutHandler);
    } catch (e) {
      console.log(e);
      document.getElementById('instagram').remove();

    }
  }

  destroy() {
    this.slider.destroy();
    this.slider = null;
    this.domSlider = null;
    this.settings = null;
    this.slides = null;
  }

}
