import { gsap } from 'gsap';
import customScrollTrigger from './customScrollTrigger';

/**
* Short getting element by query selector
* @param { string } selector
* @param { HTMLElement } [scope=document] - Element in which the selector will be searched
* @return { HTMLElement } Element with selector
*/
export function get(selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelector(selector);
}

/**
* Short getting list of elements by query selector
* @param { string } selector
* @param { HTMLElement } [scope=document] - Element in which the selector will be searched
* @return { HTMLElement[] } List of elements with selector
*/
export function getAll(selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelectorAll(selector);
};

/**
* @class Made list of HTML-elements and basic functions for them
* @param { (string|HTMLElement|HTMLElement[]) } elems - Selector, element or list of elements for creating class
* @param { HTMLElement } [scope=document] - Element in which elements will be searched
* @see https://wiki.bsgdigital.com/ru/developer/query-js
*/
class Query {
  constructor(elems, scope) {
    this.elems = this.getElems(elems, scope);
    this.elem = this.elems[0];
    this.length = this.elems.length;
  }

  //--> Basic methods

    getElems(elems, scope) {
      if (typeof elems == 'string') {
        return getAll(elems, scope);
      } else if (elems.length && !elems.tagName) {
        return Array.from(elems);
      } else if (typeof elems == 'object' && "tagName" in elems) {
        return [elems];
      }
    }

    each(func) {
      if (this.elems.length) {
        this.elems.forEach((elem, i) => {
          func(elem, i)
        });
      }
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

  //--> End basic methods

  //--> HTML content

    html() {
      return this.elem.innerHTML;
    }

    setHTML(html) {
      this.each((elem, i) => {
        elem.innerHTML = html;
      })
    }

    text() {
      return this.elem.textContent;
    }

    setText(text) {
      this.each((elem, i) => {
        elem.textContent = text;
      })
    }

  //--> End HTML content

  //--> DOM navigation

    find(selector) {
      return $(selector, this.elem);
    }

    is(selector) {
      return this.elem.matches(selector);
    }

    closest(selector) {
      return this.elem.closest(selector);
    }

    children() {
      return Array.from(this.elem.children);
    }

    firstChild() {
      return this.elem.firstElementChild;
    }

    lastChild() {
      return this.elem.lastElementChild;
    }

    prevSibling() {
      return this.elem.previousElementSibling;
    }

    nextSibling() {
      return this.elem.nextElementSibling;
    }

    parent() {
      return this.elem.parentElement;
    }

  //--> End DOM navigation

  //--> Change DOM structure

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

  //--> End change DOM structure

  //--> Attributes and Styles

    hasAttr(attr) {
      return this.elem.hasAttribute(attr);
    }

    getAttr(attr) {
      return this.elem.getAttribute(attr);
    }

    setAttr(attr, value) {
      this.each((elem, i) => {
        const val = value || '';
        elem.setAttribute(attr, val)
      })
    }

    removeAttr(attr) {
      this.each((elem, i) => {
        elem.removeAttribute(attr)
      })
    }

    css(styles) {
      let originStyles = {};
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
        originStyles[originProperty] = originStyle;
      }
      gsap.set(this.elems, originStyles);
    }

    getCss(property, pseudo) {
      let value = getComputedStyle(this.elem, pseudo)[this.toCamelCase(property)];
      if (value.indexOf('px') == value.length - 2) {
        value = parseFloat(value);
      }
      return value;
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

    hasClass(className) {
      return this.elem.classList.contains(className)
    }

  //--> End Attributes and Styles

  //--> Sizes and Coordinates

    width() {
      return this.elem.offsetWidth;
    }

    height() {
      return this.elem.offsetHeight;
    }

    scrollLeft() {
      return this.elem.scrollLeft;
    }

    scrollTop() {
      return this.elem.scrollTop;
    }

    coords() {
      return this.elem.getBoundingClientRect();
    }

  //--> End Sizes and Coordinates

  //--> Events

    on(eventName, func) {
      this.each((elem, i) => {
        elem.addEventListener(eventName, (event) => {
          func(event, elem)
        })
      })
    }

  //--> End Events

  //--> Custom functions

    scrollTrigger(props) {
      customScrollTrigger({
        elems: this.elems,
        triggerSel: props.triggerSel,
        scrollWrapper: props.scrollWrapper,
        triggerPoint: props.triggerPoint,
        callback: props.callback
      });
    }

    scrollTriggerToggleClass(props) {
      customScrollTrigger({
        elems: this.elems,
        triggerSel: props.triggerSel,
        scrollWrapper: props.scrollWrapper,
        triggerPoint: props.triggerPoint,
        callback: elem => {
          elem.classList.toggle(props.className);
        }
      });
    }

    scrollTriggerGsapTo(props) {
      customScrollTrigger({
        elems: this.elems,
        triggerSel: props.triggerSel,
        scrollWrapper: props.scrollWrapper,
        triggerPoint: props.triggerPoint,
        callback: elem => {
          gsap.to(elem, props.animTo);
        }
      });
    }

  //--> End custom functions
}

/**
* Short creation of Query-object
* @param { (string|HTMLElement|HTMLElement[]) } elems - Selector, element or list of elements for creating class
* @param { HTMLElement } [scope=document] - Element in which elements will be searched
* @return { Query } Object with list of elements and functions
*/
export function $(elems, scope) {
  return new Query(elems, scope);
}
