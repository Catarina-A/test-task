/**
* Set VH variable for mobile safari 100VH. Use scss mixin fullheight().
* @see https://wiki.bsgdigital.com/ru/onboarding/developer/front-end/template/setFullHeight-js
*/
export default () => {

	const getWindowHeight = () => {
		if (document) {
			const windowHeight = document.documentElement.clientHeight;
			const vh = windowHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}
	};

	getWindowHeight();

	window.addEventListener('resize', () => getWindowHeight());

};
