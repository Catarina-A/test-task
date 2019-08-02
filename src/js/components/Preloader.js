import Cursor from './Cursor';

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
  }

  removeFollower() {
    this.cursor.destroy();
    this.cursor = null;
    const tl = new TimelineLite();
    tl.set(this.domCursorFollower, {opacity: 0});
    tl.to(this.domBlurFilter, this.blurTime, {
          webkitFilter: `blur(${this.filterMedium})`,
          filter: `blur(${this.filterMedium})`,
        },
    );
    tl.add(() => {
      this.domCursorFollower.remove();
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
                webkitFilter: `blur(0)`,
                filter: `blur(0)`,
              },
          ).add(() => {
            //document.body.classList.add('content-visible')
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
      this.domCursorFollower.style.opacity = '1';

      const fireNextStage = () => {
        this.domBlurFilter.removeEventListener('click', fireNextStage);
        clearTimeout(timer);
        this.removeFollower();
        this.fireNextStage();

      };
      this.domBlurFilter.addEventListener('click', fireNextStage);
      timer = setTimeout(() => {
        fireNextStage();
      }, 3000);
    });
  }
}
