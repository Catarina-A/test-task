export default () => {
    const menu = document.querySelector('[data-mobile-menu]');
    const hamburger = document.querySelector('[data-action="toggle-menu"]');
    const headerLogo = document.querySelector('.header__logo');
    const heroContent = document.querySelector('.hero__content');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');

        if (hamburger.classList.contains('is-active')) {
            showMenu();
            headerLogo.style.opacity = 0;
            heroContent.style.opacity = 0;

        } else {
            hideMenu();
            headerLogo.setAttribute('style', 'transition: opacity .8s ease-out;');
            heroContent.setAttribute('style', 'transition: opacity .5s ease-out; opacity: 1');
        }
    });

    function showMenu() {
        menu.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function hideMenu() {
        menu.classList.remove('show');
        document.body.style.overflow = 'initial';
    }
};