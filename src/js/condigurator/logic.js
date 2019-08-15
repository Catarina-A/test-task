import template from './template';

export default {
  el: '#app-configurator',
  template: template,
  data: {
    baseURL: process.env.NODE_ENV === 'development' ? '/' : process.env.BUILD_PATH,
  },

  mounted() {
    console.log(this.baseURL);
  },
};
