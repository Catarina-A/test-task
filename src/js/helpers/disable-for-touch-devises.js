/**
* Remove hover effects on touch devices for elements with 'data-no-hover-on-touch' attribute. Add for this elements class 'no-hover'.
*/
export default function() {

  setTimeout(() => {

    const elements = document.querySelectorAll('[data-no-hover-on-touch]');
    if (elements.length === 0) return;

    const handleTouch = () => {
      window.removeEventListener('touchstart', handleTouch);
      elements.forEach(item => {
        item.classList.add('no-hover');
      });
    };

    window.addEventListener('touchstart', handleTouch);

  }, 800);

}
