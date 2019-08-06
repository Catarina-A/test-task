export default () => {
  const mainButton = document.getElementById('language-main-btn');
  const overlay = document.getElementById('header-overlay');
  const content = document.getElementById('page-blur-filter');
  const blurableItems = document.querySelectorAll('.blurable-on-lang-open');
  const CLASS_ACTIVE = 'active';
  const CLASS_TRANSITION = 'transition';
  const BLUR_VALUE = '20px';
  const BRIGHTNESS_VALUE = '70%';
  const BODY_COLOR = '#737373';
  const TIME = 1;
  let opened = false;

  const open = () => {
    overlay.classList.add(CLASS_ACTIVE);
    mainButton.classList.add(CLASS_ACTIVE);
    TweenLite.set(document.body, {
      backgroundColor: BODY_COLOR,
    });
    TweenLite.to(blurableItems, TIME, {
      webkitFilter: `blur(${BLUR_VALUE})`,
      filter: `blur(${BLUR_VALUE})`,
      pointerEvents: 'none',
    });
    TweenLite.to(content, TIME, {
      webkitFilter: `blur(${BLUR_VALUE}) brightness(${BRIGHTNESS_VALUE})`,
      filter: `blur(${BLUR_VALUE}) brightness(${BRIGHTNESS_VALUE})`,
    });
  };

  const close = () => {
    overlay.classList.remove(CLASS_ACTIVE);
    mainButton.classList.remove(CLASS_ACTIVE);
    TweenLite.to(document.body, TIME, {
      backgroundColor: '#fff',
    });
    TweenLite.to(blurableItems, TIME, {
      webkitFilter: `blur(0)`,
      filter: `blur(0)`,
      pointerEvents: 'auto',
    });
    const tl = TweenLite.to(content, TIME, {
      webkitFilter: `blur(0) brightness(100%)`,
      filter: `blur(0) brightness(100%)`,
    });
  };

  const handleMainBtnClick = () => {
    if (opened) {
      opened = false;
      close();
    } else {
      opened = true;
      open();
    }
  };

  // add listeners

  mainButton.addEventListener('click', handleMainBtnClick);
  overlay.addEventListener('click', close);
}
