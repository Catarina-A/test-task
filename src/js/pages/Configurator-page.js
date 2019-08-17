import configuratorObject from '../condigurator/logic';
import scriptLoader from '../helpers/scriptLoader';
import axios from 'axios';

export default class {
  constructor() {
    this.vueURL = null;
    this.vueScriptName = 'vue-configurator-script';
    this.configuratorDataUrl = process.env.CONFIGURATOR_DATA;
    this.vue = null;
  }

  initVue() {
    if (Vue) {
      this.vue = new Vue(configuratorObject);
    }
  }

  async loadDataConfigurator() {
    const response = await axios.get(this.configuratorDataUrl);
    window.configuratorData = response.data;
  }

  async init() {
    if (!this.vueURL && process.env.NODE_ENV === 'development') {
      this.vueURL = process.env.VUE_DEV_PATH;
    } else {
      this.vueURL = process.env.VUE_PROD_PATH;
    }

    try {
      await Promise.all([
        scriptLoader(this.vueURL, this.vueScriptName),
        this.loadDataConfigurator()]);
      this.initVue();
    } catch (e) {
      console.log(e);
    }

  }

  destroy() {
    if (this.vue) {
      this.vue.$destroy();
      this.vue = null;
    }
  }
}