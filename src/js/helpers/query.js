export function get(selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelector(selector);
}

export function getAll(selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelectorAll(selector);
};

class Query {
  constructor(elems, scope) {
    this.elems;
    if (typeof elems == 'string') {
      this.elems = getAll(elems, scope);
    } else if (elems.length) {
      this.elems = Array.from(elems);
    } else if (typeof elems == 'object' && "id" in elems) {
      this.elems = [elems];
    }
    this.elem = this.elems[0];
    this.length = this.elems.length;
    this.children = Array.from(this.elem.children);
    this.firstChild = this.elem.firstElementChild;
    this.lastChild = this.elem.lastElementChild;
    this.prevSibling = this.elem.previousElementSibling;
    this.nextSibling = this.elem.nextElementSibling;
    this.parent = this.elem.parentElement;
    this.width = this.elem.offsetWidth;
    this.height = this.elem.offsetHeight;
    this.scrollLeft = this.elem.scrollLeft;
    this.scrollTop = this.elem.scrollTop;
    this.coords = this.elem.getBoundingClientRect();
  }

  find(selector) {
    return $(selector, this.elem);
  }

  is(selector) {
    return this.elem.matches(selector);
  }

  closest(selector) {
    return this.elem.closest(selector);
  }

  each(func) {
    if (this.elems.length) {
      this.elems.forEach((elem, i) => {
        func(elem, i)
      });
    }
  }

  html(html) {
    this.each((elem, i) => {
      elem.innerHTML = html;
    })
  }

  text(text) {
    this.each((elem, i) => {
      elem.textContent = text;
    })
  }

  hasAttr(attr) {
    return this.elem.hasAttribute(attr);
  }

  getAttr(attr) {
    return this.elem.getAttribute(attr);
  }

  setAttr(attr, value) {
    this.each((elem, i) => {
      elem.setAttribute(attr, value)
    })
  }

  removeAttr(attr) {
    this.each((elem, i) => {
      elem.removeAttribute(attr)
    })
  }

  append(...nodes) {
    this.each((elem, i) => {
      nodes.forEach((node, i) => {
        if (typeof node == 'string') {
          elem.insertAdjacentHTML("beforeend", node)
        } else {
          elem.insertAdjacentElement("beforeend", node)
        }
      });
    })
  }

  prepend(...nodes) {
    this.each((elem, i) => {
      nodes.forEach((node, i) => {
        if (typeof node == 'string') {
          elem.insertAdjacentHTML("afterbegin", node)
        } else {
          elem.insertAdjacentElement("afterbegin", node)
        }
      });
    })
  }

  before(...nodes) {
    this.each((elem, i) => {
      nodes.forEach((node, i) => {
        if (typeof node == 'string') {
          elem.insertAdjacentHTML("beforebegin", node)
        } else {
          elem.insertAdjacentElement("beforebegin", node)
        }
      });
    })
  }

  after(...nodes) {
    this.each((elem, i) => {
      nodes.forEach((node, i) => {
        if (typeof node == 'string') {
          elem.insertAdjacentHTML("afterend", node)
        } else {
          elem.insertAdjacentElement("afterend", node)
        }
      });
    })
  }

  replace(...nodes) {
    this.each((elem, i) => {
      elem.replaceWith(...nodes)
    })
  }

  appendText(text) {
    this.each((elem, i) => {
      elem.insertAdjacentText("beforeend", text)
    })
  }

  prependText(text) {
    this.each((elem, i) => {
      elem.insertAdjacentText("afterbegin", text)
    })
  }

  beforeText(text) {
    this.each((elem, i) => {
      elem.insertAdjacentText("beforebegin", text)
    })
  }

  afterText(text) {
    this.each((elem, i) => {
      elem.insertAdjacentText("afterend", text)
    })
  }

  remove() {
    this.each((elem, i) => {
      elem.remove()
    })
  }

  toCamelCase(string) {
    const letters = string.split('');
    letters.forEach((letter, i) => {
      if (letter == '-') {
        letters.splice(i, 1)
        letters[i] = letters[i].toUpperCase();
      }
    });
    return letters.join('')
  }

  css(styles) {
    this.each((elem, i) => {
      for (let property in styles) {
        const originProperty = this.toCamelCase(property);
        let style = styles[property];
        let originStyle;
        if (typeof style == 'function') {
          style = style();
        }
        if (typeof style == 'string') {
          originStyle = style;
        } else if (typeof style == 'number') {
          originStyle = style + 'px';
        } else if (style === null || style === undefined || style === false) {
          originStyle = '';
        } else {
          originStyle = String(style);
        }
        elem.style[originProperty] = originStyle;
      }
    })
  }

  getCss(property, pseudo) {
    if (property) {
      return getComputedStyle(this.elem, pseudo)[property];
    } else {
      return getComputedStyle(this.elem, pseudo);
    }
  }

  addClass(className) {
    this.each((elem, i) => {
      elem.classList.add(className)
    })
  }

  removeClass(className) {
    this.each((elem, i) => {
      elem.classList.remove(className)
    })
  }

  toggleClass(className) {
    this.each((elem, i) => {
      elem.classList.toggle(className)
    })
  }

  on(eventName, func) {
    this.each((elem, i) => {
      elem.addEventListener(eventName, (event) => {
        func(event, elem)
      })
    })
  }

  scrollTrigger(props) {
    // props = {callback, triggerSel(optional), scrollWrapper(optional), triggerPoint(optional)}
    // props.triggerPoint(types): number, string(%)
    const wrapper = props.scrollWrapper ? props.scrollWrapper : document;
    this.each((elem, i) => {
      this.showElem(elem, props.triggerSel, props.triggerPoint, props.callback)
      wrapper.addEventListener('scroll', () => {
        this.showElem(elem, props.triggerSel, props.triggerPoint, props.callback)
      })
    });
  }

  showElem(elem, triggerSel, triggerPoint, func) {
    const container = triggerSel ? elem.closest(triggerSel) : elem;
    const trigger = container.getBoundingClientRect().top;
    let triggerPointNum;
    if (typeof triggerPoint == 'string' && triggerPoint.indexOf('%') != -1) {
      const fraction = parseFloat(triggerPoint) / 100;
      triggerPointNum = document.documentElement.clientHeight * fraction;
    } else if (typeof parseFloat(triggerPoint) == 'number') {
      triggerPointNum = triggerPoint;
    } else {
      triggerPointNum = document.documentElement.clientHeight;
    }

    if (trigger <= triggerPointNum) func(elem);
  }
}

export function $(elems, scope) {
  return new Query(elems, scope);
}
