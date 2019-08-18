import template from './template';

export default {
  el: '#app-configurator',
  template: template,
  data: {
    selectedElement: {},
    activeStep: 0,
    activeSide: '',
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
    this.stepOpenTime = 1;
    this.steps = window.configuratorData;
    this.sidesArray = null;
    this.setupConfigurator();
    this.activeSide = this.sidesArray[0];
  },

  mounted() {
  },

  methods: {

    confirmSelection() {
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
  },

  watch: {
    activeStep(current, prev) {
      this.openStep(current);
      this.closeStep(prev);
    },

  },
};
