export default () => {
  const CLASS_OPEN = 'open';
  const burger = document.getElementById('header-burger');
  const header = document.getElementById('header');
  const menu = document.getElementById('header-menu');
  const CLASS_SMALL = 'header--small';
  let isOpened = false;
  let isBig = true;

  if (!burger || !header || !menu) return;

  const openMenu = () => {
    burger.classList.add(CLASS_OPEN);
    menu.classList.add(CLASS_OPEN);
    isOpened = true;
  };

  const closeMenu = () => {
    burger.classList.remove(CLASS_OPEN);
    menu.classList.remove(CLASS_OPEN);
    isOpened = false;
  };

  const makeBig = () => {
    header.classList.remove(CLASS_SMALL);
  };

  const makeSmall = () => {
    header.classList.add(CLASS_SMALL);
  };

  const toggleMenu = () => {
    if (isOpened) {
      closeMenu();
      if (isBig) {
        makeBig();
      }
    } else {
      openMenu();
      makeSmall();
    }
  };

  const toggleHeaderStyle = e => {
    if (e[0].isIntersecting) {
      if (!isOpened) {
        makeBig();
      }
      isBig = true;
    } else {
      makeSmall();
      isBig = false;
    }
  };

  const handleLinkClick = e => {
    //e.preventDefault();
    if (e.target.tagName === 'A') closeMenu();
  };

  // create DOMElement to listen for top position
  const domHiddenElement = document.createElement('div');
  domHiddenElement.style.cssText = `
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5rem;
  z-index: -999999;
  pointer-events: none;
  `;
  domHiddenElement.classList.add('page-top-position-detector');
  document.body.appendChild(domHiddenElement);

  // add listeners
  burger.addEventListener('click', toggleMenu);
  menu.addEventListener('click', handleLinkClick);

  const observer = new IntersectionObserver(toggleHeaderStyle);
  observer.observe(domHiddenElement);
}
