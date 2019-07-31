import Swiper from '../imports/import-swiper'

export default () => {
  const slider = new Swiper('#quotes-slider', {
    speed: 1200,
    spaceBetween: 60,
    pagination: {
      el: '#quotes-slider-pagination',
      type: 'bullets',
      clickable: true
    },
  });

}
