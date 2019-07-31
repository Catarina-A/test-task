import Swiper from '../imports/import-swiper';

export default () => {

  const container = document.getElementById('social-slider');
  const linksWrapper = document.getElementById('social-icons-wrapper');
  if (!container || !linksWrapper) return;
  const slidesArr = [];
  const defaultText = 'Link to social network';
  const linksItems = linksWrapper.querySelectorAll('li');
  if (linksItems.length === 0) return;
  let textSlider = null;
  let autoplayTimer;

  const clearAutoplayTimer = () => {
    clearTimeout(autoplayTimer);
    autoplayTimer = null;
  };

  const startAutoplay = (immediately = false) => {
    if (!textSlider) return;
    clearAutoplayTimer();
    autoplayTimer = setTimeout(() => {
      clearAutoplayTimer();
      textSlider.autoplay.start();
    }, immediately ? 0 : 5000);
  };

  linksItems.forEach((li, index) => {
    const a = li.children[0];
    const text = a.getAttribute('aria-label') || defaultText;
    // create slides
    const slide = `<div class="swiper-slide">${text}</div>`;
    slidesArr.push(slide);
    // add listeners
    a.addEventListener('mouseover', () => {
      if (!textSlider) return;
      textSlider.slideTo(index);
    });
    a.addEventListener('mouseleave', startAutoplay);
  });

  const pushSlides = slider => {
    slider.appendSlide(slidesArr);
  };
  const highlightIcon = slider => {
    linksItems.forEach(li => li.classList.remove('active'));
    const index = slider.activeIndex;
    const li = linksItems[index];
    li.classList.add('active');
  };

  textSlider = new Swiper('#social-slider', {
    autoplay: {delay: 4000},
    speed: 1200,
    effect: 'fade',
    allowTouchMove: false,
    on: {
      init() {
        pushSlides(this);
        highlightIcon(this);
        setTimeout(() => {
          this.autoplay.stop();
        }, 0);
      },
      slideChange() {
        highlightIcon(this);
      },
    },
  });

  // start slider autoplay then in viewport
  const checkVisibility = (entries, observer) => {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      startAutoplay(true);
    }
  };

  const observerOptions = {threshold: 1};
  const observer = new IntersectionObserver(checkVisibility, observerOptions);
  observer.observe(linksWrapper);
}
