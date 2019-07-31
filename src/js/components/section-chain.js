import Swiper from '../imports/import-swiper';
import Lottie from './LottieController';

export default () => {
  const speed = 1200;
  let observer = null;
  const domLottie = document.getElementById('chain-image-slider');
  const domSection = document.getElementById('chain-of-trust');
  let isAnimationReady = false;
  let animateOnReady = false;
  const lottieSlides = [0, 82, 192];

  if (!domLottie || !domSection) return;

  const lottieSettings = {
    container: domLottie,
    slides: lottieSlides,
  };

  const lottie = new Lottie(lottieSettings);
  const observeOptions = {
    root: null,
    threshold: 0.5,
  };

  const textSlider = new Swiper('#chain-text-slider', {
    speed: speed,
    spaceBetween: 60,
    allowTouchMove: false,
    pagination: {
      el: '#chain-slider-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '#chain-slider-next',
      prevEl: '#chain-slider-prev',
    },
    on: {
      slideChange() {
        lottie.slideTo(this.activeIndex + 1);
      },
    },
  });

  const fireFirstAnimation = () => {
    lottie.slideTo(1);
  };

  const setSectionIsReady = () => {
    domSection.classList.add('ready');
    isAnimationReady = true;

    if (animateOnReady) {
      fireFirstAnimation();
    }
  };

  const showSection = entry => {
    if (entry[0].isIntersecting) {
      observer.disconnect();
      if (isAnimationReady) {
        fireFirstAnimation();
      } else {
        animateOnReady = true;
      }
    }
  };

  lottie.init().then(() => {
    setSectionIsReady();
  });

  observer = new IntersectionObserver(showSection, observeOptions);
  observer.observe(domLottie);
}
