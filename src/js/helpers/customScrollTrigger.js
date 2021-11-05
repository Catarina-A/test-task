/**
 * Fire function with elem when scolling over trigger
 * @see https://wiki.bsgdigital.com/ru/developer/customScrollTrigger-js
 * @param { Object } props - Full list of parameters
 * @param { string|Dom7Array|HTMLElement[] } props.elements
 * @param { string|HTMLElement } [props.trigger=props.elements] - Element or Selector of it ancestor that will be trigger for run callback
 * @param { string|HTMLElement } [props.scrollWrapper=document] = Container to track scrolling
 * @param { (number|string) } [props.triggerPoint=document.documentElement.clientHeight] - Number of pixels or Number + '%' for percent of window height is point on window, upon reaching which callback is run
 * @callback callback
 */
 /**
 * @param { callback } props.callback - Function that is executed when scrolling past the trigger
 */
export default (props) => {
  let elems;
  if (typeof props.elements == 'string') {
    elems = document.querySelectorAll(props.elements);
  } else {
    elems = props.elements;
  }
  if (elems.length) {
    let scrollWrapper;
    if (typeof props.scrollWrapper == 'string') {
      scrollWrapper = document.querySelectorAll(props.scrollWrapper);
    } else {
      scrollWrapper = props.scrollWrapper;
    }
    const wrapper = props.scrollWrapper ? props.scrollWrapper : document;
    elems.forEach((elem, i) => {
      showElem(elem, props.trigger, props.triggerPoint, props.callback)
      wrapper.addEventListener('scroll', () => {
        showElem(elem, props.trigger, props.triggerPoint, props.callback)
      })
    });
  }
}

function showElem(elem, trigger, triggerPoint, func) {
  let container;
  if (trigger && typeof trigger == 'string') {
    container = elem.closest(trigger);
  } else if (trigger) {
    container = trigger;
  } else {
    container = elem;
  }
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
