export default (props) => {
  // props = {elems, callback, triggerSel(optional), scrollWrapper(optional), triggerPoint(optional)}
  // props.triggerPoint(types): number, string(%)
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
