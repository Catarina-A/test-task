import template from './template';
import scriptLoader from '../helpers/scriptLoader';
import loadPdfFont from '../helpers/load-pdf-font';
import DownloadPDF from './DownloadPDF';

export default {
  mixins: [DownloadPDF],
  el: '#app-configurator',
  template: template,
  data: {
    selectedElement: {},
    previousStep: -1,
    activeStep: 0,
    activeSide: '',
    headerIsSmall: false,
    headerIsWhite: true,
    outConfirmationIsOpened: false,
    isTimeToConfirm: false,
    isViewMode: false,
    loadedImagesArr: [],
    selectedImages: [],
  },

  computed: {
    baseURL() {
      return process.env.NODE_ENV === 'development' ?
          process.env.DEV_PATH : process.env.PROD_PATH;
    },

    selectedSize() {
      const sizeStep = this.steps.find(step => {
        return step.modifier === 'size';
      });
      return sizeStep.elements[this.selectedElement.step_0].name;
    },

    computedImages() {
      return this.getImagesBySide(this.activeSide);
    },
  },

  created() {
    this.stepOpenTime = 1;
    this.blurTime = 0.5;
    this.BLUR_VALUE = '20px';
    this.BRIGHTNESS_VALUE = '70%';
    this.BODY_COLOR = '#737373';
    this.steps = window.configuratorData;
    this.sidesArray = null;
    this.setupConfigurator();
    this.activeSide = this.sidesArray[0];

    window.addEventListener('headerBig', this.makeHeaderBig);
    window.addEventListener('headerSmall', this.makeHeaderSmall);
  },

  mounted() {
    this.$nextTick(() => {
      this.initHeader();
      window.addEventListener('resize', this.handleResize);
    });
  },

  methods: {

    getImagesBySide(side) {
      return Object.values(this.selectedElement).reduce((acc, elementIndex, stepIndex) => {
        const element = this.steps[stepIndex].elements[elementIndex];
        const imagesBySide = element.images;
        if (imagesBySide) {
          acc.push(imagesBySide[side]);
        }
        return acc;
      }, []);
    },

    loadImageOnHoverSide(side) {
      const images = this.getImagesBySide(side);
      if (images.length) {
        for (const image of images) {
          if (!this.loadedImagesArr.includes(image)) {
            this.loadedImagesArr.push(image);
          }
        }
      }
    },

    loadImageOnHoverElement(element) {
      const images = element.images;
      if (images) {
        const src = images[this.activeSide];
        if (this.loadedImagesArr.includes(src)) return;
        this.loadedImagesArr.push(src);
      }
    },

    handleResize() {
      this.updateStepHeight();
      if (window.innerWidth > 1023) {
        this.isViewMode = false;
      }
    },

    updateStepHeight() {
      if (this.activeStep === this.previousStep) return;
      this.openStep(this.activeStep);
    }
    ,

    handleStepClick(index) {
      if (index === this.activeStep) { // click on active step
        if (this.previousStep !== index) {
          this.closeStep(index);
          this.previousStep = index;
        } else {
          this.openStep(index);
          this.previousStep = -1;
        }
      } else {
        this.closeStep(this.activeStep);
        this.previousStep = this.activeStep;
        this.openStep(index);
        this.activeStep = index;
      }
    },

    async getPdfFont() {
      this.pdfFont = await loadPdfFont(process.env.PDF_PATH_TO_FONT);
    },

    goBack() {
      this.$pageHeader.unBlurHeader();
      window.history.back();
    },

    makeHeaderBig() {
      this.headerIsSmall = false;
    },

    makeHeaderSmall() {
      this.headerIsSmall = true;
    },

    initHeader() {
      this.$pageHeader.makeHeaderColorWhite();
    },

    setupConfigurator() {
      this.steps.forEach((step, index) => {
        // set object for active element
        this.$set(this.selectedElement, `step_${index}`, 0);

        // create sides array
        let sidesSet = new Set([]);
        step.elements.forEach((element, index) => {
          const images = element.images;
          if (!images) return;
          Object.keys(images).forEach(key => {
            sidesSet.add(key);
          });
        });
        this.sidesArray = Array.from(sidesSet);
        sidesSet = null;
      });
    },

    setActiveOption(step, item) {
      this.selectedElement[`step_${step}`] = item;
    },

    handleElementClick(step, item) {
      this.setActiveOption(step, item);
    },

    openStep(index) {
      const content = this.$refs.stepContent[index];
      const contentInner = this.$refs.stepContentInner[index];
      if (!contentInner) return;
      const height = contentInner.offsetHeight;
      TweenLite.to(content, this.stepOpenTime, {height});
    },

    closeStep(index) {
      if (index >= 0) {
        const content = this.$refs.stepContent[index];
        TweenLite.to(content, this.stepOpenTime, {height: 0});
      }
    },

    blur() {
      if (!this.isTimeToConfirm) {
        this.$pageHeader.blurHeader();
      }
      TweenLite.set(document.body, {
        backgroundColor: '#000',
      });
      TweenLite.fromTo([this.$refs.content, this.$refs.header], this.blurTime, {
        webkitFilter: `blur(0) brightness(100%)`,
        filter: `blur(0) brightness(100%)`,
      }, {
        webkitFilter: `blur(${this.BLUR_VALUE}) brightness(${this.BRIGHTNESS_VALUE})`,
        filter: `blur(${this.BLUR_VALUE}) brightness(${this.BRIGHTNESS_VALUE})`,
      });
    },

    unBlur() {
      if (!this.isTimeToConfirm) {
        this.$pageHeader.unBlurHeader();
      }
      const tl = TweenLite.to([this.$refs.content, this.$refs.header], this.blurTime, {
        webkitFilter: `blur(0) brightness(100%)`,
        filter: `blur(0) brightness(100%)`,
      });

      tl.eventCallback('onComplete', () => {
        this.$refs.content.removeAttribute('style');
      });
    },

    getNewImages(currentImages, prevImages) {
      return currentImages.reduce((acc, image) => {
        if (!prevImages.includes(image)) {
          acc.push(image);
        }
        return acc;
      }, []);
    },

    handleImagesChanging(currentImages, prevImages) {
      this.selectedImages = currentImages;

      //const newImages = this.getNewImages(currentImages, prevImages);
      //console.log(newImages);
    },
  },

  watch: {

    computedImages(current, prev) {
      if (prev.length) {
        this.handleImagesChanging(current, prev);
      } else {
        this.selectedImages = current;
      }
    },

    isViewMode(current) {
      if (current) {
        this.$pageHeader.makeHeaderColorDefault();
      } else {
        this.$pageHeader.makeHeaderColorWhite();
      }
    },

    outConfirmationIsOpened(current, prev) {
      if (current) {
        this.blur();
      } else {
        this.unBlur();
      }
    },

    isTimeToConfirm(current, prev) {
      if (current) {
        this.$pageHeader.hideHeader();
      } else {
        this.$pageHeader.showHeader();
      }
    },

  },

  destroyed() {
    window.removeEventListener('headerBig', this.makeHeaderBig);
    window.removeEventListener('headerSmall', this.makeHeaderSmall);
    window.addEventListener('resize', this.handleResize);

    // just no magic
    this.activeStep = 0;
    this.activeSide = '';
    this.headerIsSmall = false;
    this.headerIsWhite = true;
    this.outConfirmationIsOpened = false;
    this.isTimeToConfirm = false;
    this.isViewMode = false;
  },
};
