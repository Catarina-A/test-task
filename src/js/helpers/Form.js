import axios from 'axios';
import serialize from './form-serialaize';
import qs from 'qs';
//import jsonpAdapter from 'axios-jsonp';

/**
* Sending form
* @class
* @param { Object } props - List of parameters
* @param { HTMLElement } props.form - Form that will be sending
* @param { string } [props.actionAttr='data-action'] - Attribute that contains form url
* @param { string } [props.processingClass='processing'] - Class form applying during form sending
* @param { string } [props.successClass='success'] - Class for applying after success sending
* @param { string } [props.errorClass='error'] - Class for applying after error sending
* @see https://wiki.bsgdigital.com/ru/onboarding/developer/front-end/template/form-js-form-serialaize-js
*/
export default class {
	constructor(props) {
		this.ATTR = props.actionAttr || 'data-action';
		this.PROCESSING = props.processingClass || 'processing';
		this.SUCCESS = props.successClass || 'success';
		this.ERROR = props.errorClass || 'error';
		this.$form = props.$form;
		this.url = null;
		this.submitHandler = null;
		this.formData = null;
	}

	disableForm() {
		this.$form.classList.add(this.PROCESSING);
	}

	enableForm() {
		this.$form.classList.remove(this.PROCESSING);
	}

	handleSuccess() {
		this.$form.classList.remove(this.ERROR);
		this.$form.classList.add(this.SUCCESS);
		this.enableForm();
	}

	handleError() {
		this.$form.classList.add(this.ERROR);
		this.enableForm();
	}

	handleReset() {
		this.$form.classList.remove(this.ERROR);
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
				//adapter: jsonpAdapter,
				data: qs.stringify(this.formData),
			});
		}
		catch (e) {
			console.log(e);
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
			this.$form.removeAttribute(this.ATTR);
			this.submitHandler = this.handleSubmit.bind(this);
			this.$form.addEventListener('submit', this.submitHandler);
		}
		catch (e) {
			console.log(e);
		}
	}

	destroy() {
		try {
			this.$form.removeEventListener('submit', this.submitHandler);
		}
		catch (e) {
			console.log(e);
		}
	}

}
