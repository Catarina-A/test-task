
export default () => {
  const attr = 'data-lazy-src';
  const images = document.querySelectorAll(`[${attr}]`);
  if (images.length === 0) return;

  const quantityInitial = images.length;
  const inAdvance = window.innerHeight / 3;
  let quantityLoaded = 0;

  const lazyLoad = () => {
    images.forEach(image => {
      const imgTop = image.getBoundingClientRect().top;
      // const offset = image.getAttribute('data-offset');
      if (imgTop < window.innerHeight + inAdvance) {
        const dataSrc = image.getAttribute(attr);
        if (!dataSrc) return;
        quantityLoaded++;
        image.src = dataSrc;
        image.removeAttribute(attr);

        if (quantityInitial === quantityLoaded) {
          window.removeEventListener('scroll', lazyLoad);
          window.removeEventListener('resize', lazyLoad);
        }
      }
    });
  };

  lazyLoad();
  window.addEventListener('scroll', lazyLoad);
  window.addEventListener('resize', lazyLoad);

}

