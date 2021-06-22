import { gsap } from 'gsap';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

/*
props: {
  selector: (String)
  offset: (Number)
  idAttr: (String)
}
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
          }
        });
      }
    })

  });

}
