import Swiper from '../imports/import-swiper';

export default () => {
  const domContainer = document.getElementById('roadmap');
  const domSlider = document.getElementById('roadmap-slider');
  const domCloseBtn = document.querySelectorAll('.roadmap__close-popup');
  const domScrollContainer = document.getElementById('roadmap-popup-scroll-container');
  const CLASS_OPENED = 'popup-opened';
  const CLASS_ACTIVE = 'active';
  const ATTR_NAME = 'data-open-popup';
  let previousPopup = null;

  if (!domContainer || !domSlider || !domCloseBtn.length || !domScrollContainer) return;

  const slider = new Swiper(domSlider, {
    speed: 1200,
    slidesPerView: 2,
    freeMode: true,
    breakpoints: {
      1023: {
        slidesPerView: 1,
      },
    },
    on: {
      init() {
        let slideToGo = 0;
        Array.from(this.slides).forEach((slide, index) => {
          const isCurrentTime = slide.classList.contains('current-time');
          if (isCurrentTime) slideToGo = index;
        });
        this.slideTo(slideToGo);
      },
    },
  });

  const closePopup = () => domContainer.classList.remove(CLASS_OPENED);
  domCloseBtn.forEach(btn => {
    btn.addEventListener('click', closePopup);
  });

  const links = domSlider.querySelectorAll(`[${ATTR_NAME}]`);
  if (links.length === 0) return;

  links.forEach(link => {
    const handleLinkClick = () => {
      domScrollContainer.scrollTo(0, 0);
      domContainer.classList.add(CLASS_OPENED);
      if (previousPopup) {
        previousPopup.classList.remove(CLASS_ACTIVE);
        previousPopup = null;
      }
      const popupId = link.getAttribute(ATTR_NAME);
      if (!popupId) return;
      const popup = document.getElementById(popupId);
      if (popup) {
        popup.classList.add(CLASS_ACTIVE);
        previousPopup = popup;
      }
    };
    link.addEventListener('click', handleLinkClick);
  });

}
