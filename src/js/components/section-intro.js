export default () => new Promise(resolve => {
  try {
    const container = document.getElementById('intro-video-container');
    const ATTR__NAME = 'data-video-src';
    let counter = 0;
    let timer;
    const videos = container.querySelectorAll('video');

    const src = container.getAttribute(ATTR__NAME);
    container.removeAttribute(ATTR__NAME);

    const completed = () => {
      clearTimeout(timer);
      timer = null;
      resolve();
    };

    timer = setTimeout(() => {
      completed();
    }, 2000);

    const checkCounter = () => {
      if (counter === videos.length) {
        completed();
      }
    };

    videos.forEach(video => {
      const playVideo = () => {
        video.removeEventListener('canplay', playVideo);
        video.muted = true;
        video.play();
        counter++;
        checkCounter();
      };
      video.children[0].src = src;
      video.load();
      video.addEventListener('canplay', playVideo);
    });
  } catch (e) {
    console.log(e);
    resolve();
  }
})
