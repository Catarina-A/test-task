/**
* @class Made aside element sticky during scrolling its container
* @param { Object } props - Full list of parameters
* @param { HTMLElement } props.container - Element of static wrapper of fixed element
* @param { HTMLElement } props.aside - Element that will be sticky
* @param { HTMLElement } [props.fixedHeader] - Element of sticky header if exist
* @param { string } [props.navSticky='sticky'] - Class that positions aside sticky
* @param { string } [props.navBottom='bottom'] - Class that positions aside bottom
* @param { number } [props.asideCssTop=0] - Vertical point from top of window when aside will be fixed
* @see https://wiki.bsgdigital.com/ru/onboarding/developer/front-end/template/fixed-aside-js
*/
export default class {
	constructor(props) {
		this.container = props.container;
		this.aside = props.aside;
		this.fixedHeader = props.fixedHeader;
		this.navSticky = props.navSticky || 'sticky';
		this.navBottom = props.navBottom || 'bottom';
		this.asideCssTop = props.asideCssTop || 0;
		this.scrollHandler = null;
	}

	getAsideCssTop() {
		const value = getComputedStyle(this.aside).top;
		const res = parseInt(value);
		this.asideCssTop = isNaN(res) ? 0 : res;
	}

	makeSticky() {
		this.aside.classList.add(this.navSticky);
		this.aside.classList.remove(this.navBottom);
	}

	makeBottom() {
		this.aside.classList.add(this.navBottom);
		this.aside.classList.remove(this.navSticky);
	}

	makeFree() {
		this.aside.classList.remove(this.navSticky);
		this.aside.classList.remove(this.navBottom);
	}

	checkAsidePosition() {
		const containerRectTop = this.container.getBoundingClientRect().top;
		const asideHeight = this.aside.clientHeight;
		const containerHeight = this.container.clientHeight;
		let headerHeight = 0;

		this.fixedHeader?headerHeight = this.fixedHeader.offsetHeight:false;

		if (asideHeight >= containerHeight) {
			this.makeFree();
		}
		else {
			if (containerRectTop - headerHeight <= this.asideCssTop) {
				if (containerRectTop + containerHeight <= asideHeight) {
					this.makeBottom();
				}
				else {
					this.makeSticky();
				}
			}
			else {
				this.makeFree();
			}
		}
	}

	init() {
		if (!this.container || !this.aside) return;
		this.getAsideCssTop();
		this.checkAsidePosition();
		this.scrollHandler = this.checkAsidePosition.bind(this);
		window.addEventListener('scroll', this.scrollHandler);
	}

	destroy() {
		window.removeEventListener('scroll', this.scrollHandler);
		this.container = null;
		this.aside = null;
		this.scrollHandler = null;
	}
}
