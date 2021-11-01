import { gsap } from 'gsap';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

/**
* Animated scrolling to anchor
* @param { Object } props - List of function parameters
* @param { string } [props.selector='a[href^="#"]'] - Selector of anchor links
* @param { number } [props.offset=0] - Offset (in pixels) that will be between the top border of the window and the target after scrolling is complete
* @param { string } [props.idAttr='href'] - Attribute that contains id of target element
* @callback callback
*/
/**
* @param { callback } props.callback - Function that will be executed when page scrolling finished
*/
export function scrollTo(props) {
  gsap.registerPlugin(ScrollToPlugin);

  const selector = (props && props.selector) ? props.selector : 'a[href^="#"]';
  const links = document.querySelectorAll(selector);
  const idAttr = (props && props.idAttr) ? props.idAttr : 'href';
  const offset = (props && props.offset) ? props.offset : 0;

  if (!links.length) return;

  links.forEach((link, i) => {

    const id = link.getAttribute(idAttr);

    link.addEventListener('click', e => {
      e.preventDefault();

      if (id.length > 1) {
        gsap.to(window, {
          duration: 1,
          ease: "power2.out",
          scrollTo: {
            y: id,
            offsetY: offset,
          },
          onComplete: props.callback
        });
      }
    })

  });

}
