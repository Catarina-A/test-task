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
    } else if (elems.forEach) {
      this.elems = elems;
    } else if (elems.length) {
      this.elems = toArray(elems);
    } else if (typeof elems == 'object' && "id" in elems) {
      this.elems = [elems];
    }
    this.length = this.elems.length;
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

  attr(attr, value) {
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
        elem.style[originProperty] = styles[property];
      }
    })
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
    this.elems.each((elem, i) => {
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

  toArray(list) {
    let array = [];
    for (let i = 0; i < list.length; i++) {
      array.push(list[i])
    }
    return array;
  }
}

export function $(elems, scope) {
  return new Query(elems, scope);
}
