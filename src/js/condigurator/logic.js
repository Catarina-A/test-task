import template from './template';

export default {
  el: '#app-configurator',
  template: template,
  data: {
    selectedElement: {},
    activeStep: 0,
    sides: {},
    imagesResultArray: [],
  },

  computed: {
    baseURL() {
      return process.env.NODE_ENV === 'development' ?
          process.env.DEV_PATH : process.env.PROD_PATH;
    },

    stepImages() {
      return this.steps.map(step => {
        return step.elements.every(element => {
          return element.images;
        });
      }).filter(step => {
        console.log(step)
        return true
      });
    },
  },

  created() {
    this.stepOpenTime = 1;

    this.steps = window.configuratorData;

    this.setReactivity();
    this.makeFirstSideActive();
  },

  mounted() {
    setTimeout(() => {
      this.openActiveStep(0);
    }, 2000);
  },

  methods: {

    makeFirstSideActive() {
      const keys = Object.keys(this.sides);
      this.sides[keys[0]] = true;
    },

    setReactivity() {
      this.steps.forEach((step, index) => {
        // object for active element
        this.$set(this.selectedElement, `step_${index}`, 0);

        // object for sides
        step.elements.forEach((element, index) => {
          const images = element.images;
          if (!images) return;
          Object.keys(images).forEach(key => {
            this.$set(this.sides, key, false);
          });
        });

      });
    },

    setActiveOption(step, item) {
      this.selectedElement[`step_${step}`] = item;
    },

    handleElementClick(step, item) {
      this.setActiveOption(step, item);
    },

    openActiveStep(index) {
      const content = this.$refs.stepContent[index];
      const contentInner = this.$refs.stepContentInner[index];
      const height = contentInner.offsetHeight;
      TweenLite.to(content, this.stepOpenTime, {height});
    },
    closeActiveStep(index) {
      if (index >= 0) {
        const content = this.$refs.stepContent[index];
        TweenLite.to(content, this.stepOpenTime, {height: 0});
      }
    },
  },

  watch: {
    activeStep(current, prev) {
      this.openActiveStep(current);
      this.closeActiveStep(prev);
    },

  },
};
