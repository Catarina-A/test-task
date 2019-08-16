import configuratorObject from '../condigurator/logic';
import scriptLoader from '../helpers/scriptLoader';

export default class {
  constructor() {
    this.vueURL = null;
    this.vueScriptName = 'vue-configurator-script';
    this.Vue = null;
  }

  initVue() {
    if (Vue) {
      this.Vue = new Vue(configuratorObject);
    }
  }

  async init() {
    if (!this.vueURL && process.env.NODE_ENV === 'development') {
      this.vueURL = process.env.VUE_DEV_PATH;
    } else {
      this.vueURL = process.env.VUE_PROD_PATH;
    }

    scriptLoader(this.vueURL, this.vueScriptName).then(() => {
      this.initVue();
    }).catch(console.log);
  }

  destroy() {
    if (this.Vue) {
      this.Vue.$destroy();
      this.Vue = null;
    }
  }
}
