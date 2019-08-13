import debounce from 'lodash/debounce';

export default class {
  constructor(props) {
    this.container = props.container;
    this.items = null;
    this.classes = {
      active: 'active',
      title: 'accordion__title',
      content: 'accordion__content',
    };
    this.resizeHandler = null;
    this.activeItem = null;
    this.isClosing = false;
    this.isOpening = false;
    this.time = 1;
    this.containerHeight = 0;
    this.changeSlideEvent = null;
    this.activeIndex = {
      index: 0
    };
  }

  setActiveItemHeight(isResize = false) {
    this.isOpening = true;
    const content = this.activeItem.getElementsByClassName(this.classes.content)[0];
    if (isResize) {
      content.style.height = '0';
      this.containerHeight = this.container.offsetHeight;
    }
    const itemsHeight = this.items.reduce((acc, item) => {
      const title = item.getElementsByClassName(this.classes.title)[0];
      return acc += title.offsetHeight;
    }, 0);
    const contentHeight = content.children[0].offsetHeight;
    const resHeight = this.containerHeight - itemsHeight;
    const height = contentHeight > resHeight ? contentHeight : resHeight;
    if (isResize) {
      content.style.height = `${height}px`;
      this.isOpening = false;
    } else {
      const tl = TweenLite.to(content, this.time, {
        height: height,
      });
      tl.eventCallback('onComplete', () => {
        this.isOpening = false;
      });
    }
  }

  closeActiveItem() {
    if (this.activeItem) {
      this.isClosing = true;
      this.activeItem.classList.remove(this.classes.active);
      const content = this.activeItem.getElementsByClassName(this.classes.content)[0];
      const tl = TweenLite.to(content, this.time, {
        height: 0,
      });
      tl.eventCallback('onComplete', () => {
        this.isClosing = false;
      });
    }
  }

  fireSlideChangeEvent() {
    window.dispatchEvent(this.changeSlideEvent);
  }

  handleClick(e) {
    if (this.isClosing || this.isOpening) return;
    const target = e.target;
    const isTitle = target.classList.contains(this.classes.title);
    if (isTitle) {
      const parent = target.parentNode;
      if (parent.classList.contains(this.classes.active)) {
        return;
      }
      this.closeActiveItem();
      this.activeItem = parent;
      Array.from(this.activeItem.parentNode.children).forEach((item, index) => {
        if (item === this.activeItem) this.activeIndex.index = index;
      });
      this.activeItem.classList.add(this.classes.active);
      this.setActiveItemHeight();
      this.fireSlideChangeEvent();
    }
  }

  findActiveItem() {
    this.items.forEach((item, index) => {
      if (item.classList.contains(this.classes.active)) {
        this.activeItem = item;
        this.activeIndex.index = index;
      }
    });
  }

  handleResize() {
    if (this.isClosing || this.isOpening) return;
    this.setActiveItemHeight(true);
  }

  initCustomEvents() {
    this.changeSlideEvent = new CustomEvent('intoBedsChangeSlide', {detail: this.activeIndex});
  }

  init() {
    if (!this.container) return;
    const htmlItems = this.container.children;
    if (htmlItems.length) {
      this.items = Array.from(htmlItems);
    } else return;
    this.initCustomEvents();
    this.containerHeight = this.container.offsetHeight;
    this.findActiveItem();
    this.setActiveItemHeight();
    this.fireSlideChangeEvent();
    this.container.addEventListener('click', this.handleClick.bind(this));
    this.resizeHandler = debounce(this.handleResize.bind(this), 100);
    window.addEventListener('resize', this.resizeHandler);
  }

  destroy() {
    window.removeEventListener('resize', this.resizeHandler);
    this.container = null;
    this.items = null;
    this.changeSlideEvent = null;
  }
}
