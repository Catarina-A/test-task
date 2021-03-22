import Swiper from 'swiper';

export default () => {
    // function anchorScroll() {
    //     const anchors = document.querySelectorAll('a[href*="#"]');
    //     anchors.forEach((anchor) => {
    //         anchor.addEventListener('click', function (e) {
    //             e.preventDefault();
    //             const blockID = anchor.getAttribute('href').substr(1);
    //             let elemToScroll = document.getElementById(blockID);
    //             let headerHeight = (window.innerWidth > 1366) ? 68 : (window.innerWidth > 1024) ? 106 : (window.innerWidth > 768) ? 90 : 50;
    //             // let headerHeight = 0;
    //             if (elemToScroll) {
    //                 let scrollToPosition = elemToScroll.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    //                 window.scrollTo({
    //                     behavior: 'smooth',
    //                     top: scrollToPosition,
    //                 });
    //             } else{
    //                 document.location = document.location.origin+'/#'+blockID;
    //             }
    //         });
    //     });
    // }
    //
    // anchorScroll();




    // ********** SLIDER  **********
    function topSlider() {
        let aboutSliderBlock = document.querySelector(".about-slider");
        if (aboutSliderBlock) {
            let slider = new Swiper(aboutSliderBlock, {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 50,
                loop: false,
                speed: 600,
                grabCursor: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    1919: {
                        spaceBetween: 40,
                    },
                    1023: {
                        spaceBetween: 20,
                    },
                    767: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                        spaceBetween: 30,
                    },
                }
            });
        }
    }

    topSlider();




    // ********** REPLACING BLOCKS ON RESIZE  **********
    if (matchMedia) {
        const mq = window.matchMedia("(max-width: 1023px)");
        mq.addListener(WidthChange);
        WidthChange(mq);
    }

    function WidthChange(mq) {
        const storyBlockquote = document.querySelector('.story__blockquote');
        const storyInner = document.querySelector('.story-inner');
        const storyText = document.querySelector('.story-text');

        if (mq.matches) {
            storyBlockquote.parentElement.removeChild(storyBlockquote);
            storyInner.appendChild(storyBlockquote);
        } else {
            storyText.appendChild(storyBlockquote);
        }
    }

}
