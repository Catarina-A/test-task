import template from './template';
import scriptLoader from '../helpers/scriptLoader';
import loadPdfFont from '../helpers/load-pdf-font';

export default {
  el: '#app-configurator',
  template: template,
  data: {
    selectedElement: {},
    activeStep: 0,
    activeSide: '',
    headerIsSmall: false,
    headerIsWhite: true,
    outConfirmationIsOpened: false,
    isTimeToConfirm: false,
    pdfScriptIsLoaded: false,
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

    stepImages() {
      return Object.values(this.selectedElement).reduce((acc, elementIndex, stepIndex) => {
        const element = this.steps[stepIndex].elements[elementIndex];
        const imagesBySide = element.images;
        if (imagesBySide) {
          acc.push(imagesBySide[this.activeSide]);
        }
        return acc;
      }, []);
    },
  },

  created() {
    this.jsPdfOptions = {
      url: process.env.PDF_SCRIPT_URL,
      libraryName: 'pdf-library',
      integrity: process.env.PDF_INTEGRITY,
      crossorigin: 'anonymous',
    };
    this.stepOpenTime = 1;
    this.blurTime = 0.5;
    this.BLUR_VALUE = '20px';
    this.BRIGHTNESS_VALUE = '70%';
    this.BODY_COLOR = '#737373';
    this.steps = window.configuratorData;
    this.sidesArray = null;
    this.setupConfigurator();
    this.activeSide = this.sidesArray[0];
    this.pdfAPI = null;
    this.pdfFont = null;

    window.addEventListener('headerBig', this.makeHeaderBig);
    window.addEventListener('headerSmall', this.makeHeaderSmall);
  },

  mounted() {
    this.$nextTick(() => {
      this.initHeader();
    });
    Promise.all([
      this.getPdfFont(),
      scriptLoader(this.jsPdfOptions),
    ]).then(() => {
      this.pdfScriptIsLoaded = true;
      this.initPDF_API();
    });

  },

  methods: {

    async getPdfFont() {
      this.pdfFont = await loadPdfFont(process.env.PDF_PATH_TO_FONT);
    },

    initPDF_API() {
      this.pdfAPI = new jsPDF();
      this.pdfAPI.addFileToVFS('gtamerica.ttf', this.pdfFont);
      this.pdfAPI.addFont('gtamerica.ttf', 'gtamerica', 'Bold');
      this.pdfFont = null;
    },

    downloadPDF() {
      const imageSide = 150;
      const xOffset = 20;
      let textHeight = 0;
      const link = 'http://jmarshall.co.uk/';
      const logo = document.getElementById('logo-for-svg');

      this.pdfAPI.deletePage(1);
      this.pdfAPI.addPage('a4', 'portrait');
      this.pdfAPI.setFont('gtamerica', 'Bold');
      this.pdfAPI.setFontSize(22);
      this.pdfAPI.addImage(logo, 'PNG', 75, 12, 54, 7.5);

      this.pdfAPI.setFontSize(18);
      this.steps.forEach((step, index) => {
        let selectedValue = step.elements[this.selectedElement[`step_${index}`]].name;
        if (step.modifier === 'size') {
          selectedValue += ' cm';
        }
        const y = (20 * (index + 2));
        textHeight = y;
        this.pdfAPI.text(step.resultsTitle, xOffset, y);
        this.pdfAPI.text(selectedValue, 190, (20 * (index + 2)), {
          align: 'right',
        });
      });
      const images = this.$refs.images.getElementsByTagName('img');
      textHeight -= 10;
      if (images.length) {
        Array.from(images).forEach(image => {
          this.pdfAPI.addImage(image, 'PNG', xOffset + 5, textHeight, imageSide, imageSide);
        });
      }
      this.pdfAPI.setFontSize(16);
      this.pdfAPI.textWithLink(link, xOffset, textHeight + imageSide, {
        url: link,
      });

      //console.log(doc);
      this.pdfAPI.save('jmarshal-configurator.pdf');
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
      this.$pageHeader.blurHeader();
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
      this.$pageHeader.unBlurHeader();
      const tl = TweenLite.to([this.$refs.content, this.$refs.header], this.blurTime, {
        webkitFilter: `blur(0) brightness(100%)`,
        filter: `blur(0) brightness(100%)`,
      });

      tl.eventCallback('onComplete', () => {
        this.$refs.content.removeAttribute('style');
      });
    },
  },

  watch: {
    activeStep(current, prev) {
      this.openStep(current);
      this.closeStep(prev);
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

    // just no magic
    this.activeStep = 0;
    this.activeSide = '';
    this.headerIsSmall = false;
    this.headerIsWhite = true;
    this.outConfirmationIsOpened = false;
    this.isTimeToConfirm = false;
    this.pdfFont = null;
  },
};
