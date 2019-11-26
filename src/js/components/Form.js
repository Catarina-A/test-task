import axios from 'axios';
import serialize from '../helpers/form-serialaize';
//import jsonpAdapter from 'axios-jsonp';
import qs from 'qs';
//import jsonpAdapter from 'axios-jsonp';

export default class {
  constructor(props) {
    this.ATTR = 'data-action';
    this.ERROR = 'error';
    this.SUCCESS = 'success';
    this.PROCESSING = 'processing';
    this.$form = props.$form;
    this.url = null;
    this.submitHandler = null;
    this.formData = null;
  }

  disableForm() {
    this.$form.classList.add(this.PROCESSING);
  };

  enableForm() {
    this.$form.classList.remove(this.PROCESSING);
  };

  handleSuccess() {
    this.$form.classList.remove(this.ERROR);
    this.$form.classList.add(this.SUCCESS);
    this.enableForm();
  };

  handleError(form) {
    this.$form.classList.add(this.ERROR);
    this.enableForm();
  }

  handleReset() {
    this.$form.classList.remove(this.SUCCESS);
  }

  collectFormData() {
    this.formData = serialize(this.$form);
  }

  async sendData() {
    try {
      await axios({
        method: 'post',
        headers: {
          //'Content-Type': 'application/json',
          'content-type': 'application/x-www-form-urlencoded',
        },
        url: this.url,
        //params: this.formData,
        //adapter: jsonpAdapter,
        data: qs.stringify(this.formData),
      });
    } catch (e) {
      throw e;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.$form.classList.contains(this.PROCESSING)) return;
    this.disableForm();
    this.collectFormData();
    this.sendData().then(() => {
      this.handleSuccess();
    }).catch(e => {
      console.log(e);
      this.handleError();
    });
  }

  init() {
    try {
      this.url = this.$form.getAttribute(this.ATTR);
      this.$form.removeAttribute('data-action');
      this.submitHandler = this.handleSubmit.bind(this);
      this.$form.addEventListener('submit', this.submitHandler);
    } catch (e) {
      console.log(e);
    }
  }

  destroy() {
    try {
      this.$form.removeEventListener('submit', this.submitHandler);
    } catch (e) {
      console.log(e);
    }
  }

}
