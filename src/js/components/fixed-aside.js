export default (containerId, asideId, mobile = 1024) => {
  const container = document.getElementById(containerId);
  const aside = document.getElementById(asideId);
  const navSticky = 'nav-sticky';
  const navBottom = 'nav-bottom';

  const getAsideCssTop = () => {
    const value = getComputedStyle(aside).top;
    const res = parseInt(value);
    return isNaN(res) ? 0 : res;
  };
  const asideCssTop = getAsideCssTop();

  const makeSticky = () => {
    aside.classList.add(navSticky);
    aside.classList.remove(navBottom);
  };

  const makeBottom = () => {
    aside.classList.add(navBottom);
    aside.classList.remove(navSticky);
  };

  const makeFree = () => {
    aside.classList.remove(navSticky);
    aside.classList.remove(navBottom);
  };

  const watchAsidePosition = () => {
    if (window.innerWidth < mobile) return;
    const containerRectTop = container.getBoundingClientRect().top;
    const asideHeight = aside.clientHeight;
    const containerHeight = container.clientHeight;

    if (asideHeight >= containerHeight) {
      makeFree();
    } else {
      if (containerRectTop <= asideCssTop) {

        if (containerRectTop + containerHeight <= asideHeight) {
          makeBottom();
        } else {
          makeSticky();
        }
      } else {
        makeFree();
      }
    }
  };

  watchAsidePosition();
  window.addEventListener('scroll', watchAsidePosition);
}
