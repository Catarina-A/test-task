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
      this.activeItem.classList.add(this.classes.active);
      this.setActiveItemHeight();
    }
  }

  findActiveItem() {
    for (const item of this.items) {
      if (item.classList.contains(this.classes.active)) {
        this.activeItem = item;
        break;
      }
    }
  }

  handleResize() {
    if (this.isClosing || this.isOpening) return;
    this.setActiveItemHeight(true);
  }

  init() {
    if (!this.container) return;
    const htmlItems = this.container.children;
    if (htmlItems.length) {
      this.items = Array.from(htmlItems);
    } else return;
    this.containerHeight = this.container.offsetHeight;
    this.findActiveItem();
    this.setActiveItemHeight();
    this.container.addEventListener('click', this.handleClick.bind(this));
    this.resizeHandler = this.handleResize.bind(this);
    window.addEventListener('resize', debounce(this.resizeHandler, 100));
  }

  destroy() {
    window.removeEventListener('resize', debounce(this.resizeHandler, 100));
    this.container = null;
    this.items = null;
  }
}
