export default watchActiveLinkOnScroll => {

  const attributeName = 'data-scroll-to';
  const links = document.querySelectorAll(`[${attributeName}]`);
  const offset = 0;
  const active = 'active';

  if (links.length === 0) return;

  const scrollToAnchor = anchor => {
    TweenLite.to(window, 1, {
      scrollTo: {
        y: anchor,
        offsetY: offset,
        autoKill: false,
      },
      easy: Power2.easeInOut,
    });
  };

  links.forEach(item => {
    const anchor = item.getAttribute(attributeName);
    const domAnchor = document.querySelector(anchor);
    if (!domAnchor) return;
    item.addEventListener('click', e => {
      e.preventDefault();
      if (document.activeElement) {
        document.activeElement.blur();
      }
      /*if (domAnchor.hasAttribute('data-dropdown-container')) { // if scroll to dropdown list
        domAnchor.classList.add('opened');
      }*/
      scrollToAnchor(anchor);
    });
  });

  // watch for active link

  const selectActiveLink = items => {
    links.forEach(link => {
      link.classList.remove(active);
    });
    if (items.length < 1) return;

    let lowestItem = null;
    let biggestOffsetTop = undefined;

    items.forEach(item => {
      if (biggestOffsetTop === undefined) {
        biggestOffsetTop = item.offset;
        lowestItem = item;
      } else if (item.offset > biggestOffsetTop) {
        biggestOffsetTop = item.offset;
        lowestItem = item;
      }
    });
    lowestItem.link.classList.add(active);
  };

  if (watchActiveLinkOnScroll) {
    window.addEventListener('scroll', () => {
      let items = [];

      links.forEach(item => {
        const anchor = item.getAttribute(attributeName);
        const domAnchor = document.querySelector(anchor);
        if (!domAnchor) return;
        const rect = domAnchor.getBoundingClientRect();
        const top = rect.top;
        if (top < 20) {
          const itemObj = {
            link: item,
            offset: top,
          };
          items.push(itemObj);
        }
      });

      selectActiveLink(items);
    });
  }

  // scroll on hash

  if (location.hash && document.querySelector(location.hash)) {
    scrollToAnchor(location.hash);
  }

}
