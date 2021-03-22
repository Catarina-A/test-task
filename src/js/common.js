import gsap from 'gsap';

export default () => {
    // ********** ANCHORS  **********
    let links = document.querySelectorAll('.nav__link');
    let header = document.querySelector('.nav-wrapper');
    const scollSpeed = 2600;
    const maxScrollTime = 1.3;
    if (links.length && header) {
        links.forEach(function(link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                let selector = link.getAttribute('href');
                let block = document.querySelector(selector);
                if (block) {
                    let offset = {};
                    let elOffsetY = block.getBoundingClientRect().top;
                    let headerHeight = header.offsetHeight;
                    // offset.val = window.scrollY;
                    // offset.val = document.documentElement.scrollTop;
                    // offset.val = window.pageYOffset;
                    offset.val = (document.documentElement && document.documentElement.scrollTop) ||
                        document.body.scrollTop || window.scrollY || window.pageYOffset;
                    console.log(offset.val)
                    let distance = elOffsetY - headerHeight + offset.val;
                    let time = Math.min(Math.abs(distance / scollSpeed), maxScrollTime);
                    // gsap.to(offset, {
                    //     val: (elOffsetY - headerHeight + window.scrollY),
                    //     duration: time,
                    //     onUpdate: () => {
                    //         window.scrollTo(0, offset.val)
                    //     }
                    // });
                    window.scrollTo({
                        behavior: 'smooth',
                        top: (elOffsetY - headerHeight + offset.val),
                    });
                }
            });
        });
    }




    // ********** REPLACING BLOCKS ON RESIZE  **********
    if (matchMedia) {
        const mqM = window.matchMedia("(max-width: 767px)");
        mqM.addListener(WidthChangeM);
        WidthChangeM(mqM);
    }

    function WidthChangeM(mqM) {
        const btnContactMenu = document.querySelector('.header-inner__button');
        const header = document.querySelector('.header-inner');
        const menu = document.querySelector('.nav');

        if (mqM.matches) {
            btnContactMenu.parentElement.removeChild(btnContactMenu);
            menu.appendChild(btnContactMenu);
        } else {
            header.appendChild(btnContactMenu);
        }
    }




    // ********** MENU MOBILE  **********
    const menuBtn = document.querySelector('.btn-menu');
    const menu = document.querySelector('.nav');
    const menuLinks = document.querySelectorAll('.nav__link')
    let menuOpen = false;
    menuBtn.addEventListener('click', ()=> {
        if(!menuOpen) {
            menuBtn.classList.add('isOpen');
            menu.classList.add('isOpen');
            menuOpen=true;
        } else {
            menuBtn.classList.remove('isOpen');
            menu.classList.remove('isOpen');
            menuOpen=false;
        }
    });


    menuLinks.forEach((menuLink) => {
        menuLink.addEventListener('click', function (e) {
            e.preventDefault();
            if(menuOpen) {
                menuBtn.classList.remove('isOpen');
                menu.classList.remove('isOpen');
                menuOpen=false;
            } else {
                menuBtn.classList.add('isOpen');
                menu.classList.add('isOpen');
                menuOpen=true;
            }
        });
    });
}
