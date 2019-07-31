import Swiper from '../imports/import-swiper'

export default () => {
  const slider = new Swiper('#articles-slider', {
    speed: 1200,
    spaceBetween: 30,
    slidesPerView: 3,
    breakpoints: {
      1199: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 1,
      },
    },
    pagination: {
      el: '#articles-slider-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '#articles-slider-next',
      prevEl: '#articles-slider-prev',
    },
  });

}
