import Cursor from './Cursor';
import getScrollbarWidth from '../helpers/get-scrollbar-width';

export default class {
  constructor() {
    this.domBlurFilter = document.getElementById('page-blur-filter');
    this.domCursorFollower = document.getElementById('mouse-back-follower');
    this.domLogo = document.getElementById('svg-logo');
    this.domVispring = document.getElementById('svg-vispring');
    this.cursor = null;
    this.filterMedium = '10px';
    this.blurTime = 2;
    this.logoDelay = 0.5;
    this.logoShowTime = 1;
    this.firstDelay = 2500;
  }

  removeFollower() {
    this.cursor.destroy();
    this.cursor = null;
    const tl = new TimelineLite();
    tl.to(this.domCursorFollower, this.blurTime, {
      opacity: 0,
      scale: 3,
    });
    tl.to(this.domBlurFilter, this.blurTime, {
          delay: -this.blurTime,
          webkitFilter: `blur(${this.filterMedium}) brightness(100%)`,
          filter: `blur(${this.filterMedium}) brightness(100%)`,
        },
    );
    tl.add(() => {
      this.domCursorFollower.remove();
      this.domCursorFollower = null;
    });
  }

  fireNextStage() {
    return new Promise(resolve => {
          const logoTl = new TimelineLite();
          const vispTl = new TimelineLite();
          logoTl.to(this.domLogo, this.logoShowTime, {
            delay: this.logoDelay,
            opacity: 1,
          }).to(this.domLogo, this.logoShowTime, {
            y: 0,
            scale: 1,
          }).to(this.domBlurFilter, this.logoShowTime, {
                delay: -this.logoShowTime,
                webkitFilter: `blur(0) brightness(100%)`,
                filter: `blur(0) brightness(100%)`,
              },
          ).add(() => {
            document.body.removeAttribute('style');
            this.domBlurFilter.removeAttribute('style');
            this.domBlurFilter.removeAttribute('id');
            this.domBlurFilter = null;
            document.body.style.marginRight = `-${getScrollbarWidth()}px`;
            document.body.classList.add('content-visible');
            this.domVispring.remove();
            this.domVispring = null;
            resolve();
          });

          vispTl.to(this.domVispring, this.logoShowTime, {
            delay: this.logoDelay,
            opacity: 1,
          }).to(this.domVispring, this.logoShowTime, {
            y: window.innerHeight * 0.8,
            opacity: 0,
          });

        },
    );
  }

  hide() {
    return new Promise(resolve => {
      let timer = null;
      this.cursor = new Cursor({
        el: this.domCursorFollower,
        time: 1.2,
        delay: 0.1,
      });

      this.cursor.init();
      TweenLite.to(this.domCursorFollower, 1.4, {opacity: 1});

      const fireNextStage = () => {
        this.domBlurFilter.removeEventListener('click', fireNextStage);
        clearTimeout(timer);
        this.removeFollower();
        this.fireNextStage().then(resolve)
      };
      this.domBlurFilter.addEventListener('click', fireNextStage);
      timer = setTimeout(() => {
        fireNextStage();
      }, this.firstDelay);
    });
  }
}
