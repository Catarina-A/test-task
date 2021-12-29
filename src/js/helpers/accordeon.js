import { gsap } from 'gsap';

/**
* Function for Accordeon - block whose content can be expanded and hidden. For full docs see link.
* @see https://wiki.bsgdigital.com/ru/onboarding/developer/front-end/template/accordeon-js
* @param { Object } [props] - Full list of properties
* @param { boolean } [props.needCloseOther=true] - Set to true if you want close other accorders when current open
* @param { number } [props.duration=0.5] - Accordeon animation duration in seconds
* @param { string } [props.ease="power1.out"] - Name of gsap ease function for accordeon animation
* @param { number } [props.delay=0] - Accordeon animation delay in seconds
* @param { callback } [props.onComplete] - onComplete gsap callback
*/

export default (props) => {

	const accordeonArray = document.querySelectorAll('[data-accordeon-element]');
	if (accordeonArray.length === 0) return;

	if (!props) props = {};

	const needCloseOther = props.needCloseOther || true;
	const duration = props.duration || 0.5;
	const ease = props.ease || 'power1.out';
	const delay = props.delay || 0;
	const onComplete = props.onComplete;

	accordeonArray.forEach(element => {
		const button = element.querySelector('[data-accordeon-button]');
		const content = element.querySelector('[data-accordeon-content]');

		if (!element.classList.contains('is-open')) {
			gsap.set(content, {
				height: 0
			});
		}

		button.addEventListener('click', () => {
			element.classList.contains('is-open') ? close(element, content) : open(element, content);
		});
	});

	function open(element, content) {
		gsap.to(content, {
			height: 'auto',
			duration: duration,
			ease: ease,
			delay: delay,
			onStart: () => {
				element.classList.add('is-open');
				if (needCloseOther) closeOther(element);
			},
			onComplete: onComplete
		});
	}

	function close(element, content) {
		gsap.to(content, {
			height: 0,
			duration: duration,
			ease: ease,
			delay: delay,
			onStart: () => {
				element.classList.remove('is-open');
			},
			onComplete: onComplete
		});
	}

	function closeOther(current) {
		const group = current.closest('[data-accordeon-wrapper]');
		group.querySelectorAll('[data-accordeon-element]').forEach(element => {
			const content = element.querySelector('[data-accordeon-content]');
			element !== current ? close(element, content) : false;
		});
	}
};
