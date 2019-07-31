import Swiper from '../imports/import-swiper'

export default () => {
  const slider = new Swiper('#videos-slider', {
    speed: 1200,
    spaceBetween: 40,
    slidesPerView: 2,
    breakpoints: {
      767: {
        slidesPerView: 1,
      },
    },
    pagination: {
      el: '#videos-slider-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '#videos-slider-next',
      prevEl: '#videos-slider-prev',
    },
  });

}
