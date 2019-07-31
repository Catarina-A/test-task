import {TimelineLite} from 'gsap/TimelineLite';

export default () => {
  const domOpenLinks = document.querySelectorAll('.js-open-team-popup');
  const domCloseBtn = document.getElementById('close-team-popup');
  const domContainer = document.getElementById('team-popup');
  const domFounders = document.getElementById('founders');
  const DURATION = 0.5;

  if(!domOpenLinks || !domCloseBtn || !domContainer || !domFounders) return

  const getHeight = () => domContainer.children[0].clientHeight;

  const openPopup = () => {
    const TL = new TimelineLite();
    TL.to(domContainer, DURATION, {height: getHeight()});
    TL.set(domContainer, {height: 'auto'});
    TweenLite.to(window, DURATION, {
      scrollTo: domContainer,
      autoKill: false,
    });
  };

  const closePopup = () => {
    TweenLite.to(domContainer, DURATION, {height: 0});
    TweenLite.to(window, DURATION, {
      scrollTo: domFounders,
      autoKill: false,
    });
  };

  // add click listeners
  domOpenLinks.forEach(link => {
    link.addEventListener('click', openPopup);
  });
  domCloseBtn.addEventListener('click', closePopup);
}
