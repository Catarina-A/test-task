/**
 * Fire function with elem when scolling over trigger
 * @param { Object } props - Full list of parameters
 * @param { HTMLElem[] } props.elems
 * @param { string } [props.triggerSel=props.elems[i]] - Selector of element ancestor that will be trigger for run callback
 * @param { HTMLElem } [props.scrollWrapper=document] = Container to track scrolling
 * @param { (number|string) } [props.triggerPoint=document.documentElement.clientHeight] - Number of pixels or Number + '%' for percent of window height is point on window, upon reaching which callback is run
 * @callback callback
 */
 /**
 * @param { callback } props.callback - Function that is executed when scrolling past the trigger
 */
export default (props) => {
  if (props.elems.length) {
    const wrapper = props.scrollWrapper ? props.scrollWrapper : document;
    props.elems.forEach((elem, i) => {
      showElem(elem, props.triggerSel, props.triggerPoint, props.callback)
      wrapper.addEventListener('scroll', () => {
        showElem(elem, props.triggerSel, props.triggerPoint, props.callback)
      })
    });
  }
}

function showElem(elem, triggerSel, triggerPoint, func) {
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
