import { gsap } from 'gsap';

/**
* Function for Tabs - add and removes active buttons and contents classes, content tabs should be absolute. For full docs see link.
* @param { Object } props - Full list of properties
* @param { boolean|Object } [animated=false] - If false tabs will change no-animated
* @param { Object } [animated.open] - Object list with gsap properties for last stage of showing tab
* @param { Object } [animated.close] - Object list with gsap properties for last stage of hidding tabs
* @param { number } [props.duration=0.5] - Tabs animation duration in seconds
* @param { string } [props.ease="power1.out"] - Name of gsap ease function for tabs animation
* @param { number } [props.delay=0] - Tabs animation delay in seconds
* @param { callback } [props.onComplete] - Callback when tabs animation completed
* @see https://wiki.bsgdigital.com/ru/onboarding/developer/front-end/template/tabs
*/
export default function(props) {
	const tabWrappers = document.querySelectorAll('[data-tab-wrapper]');

	if (tabWrappers.length === 0) return;

	if (!props) props = {};

	const ANIM_PROP = props.animated || false;
	const ANIM_DUR = props.duration || 0.5;
	const ANIM_EASE = props.ease || 'power1.out';
	const ANIM_DELAY = props.delay || 0;
	const onAnimComplete = props.onComplete;

	tabWrappers.forEach((tabWrapper) => {

		const tabButtons = tabWrapper.querySelectorAll('[data-tab-button]');
		const tabContainer = tabWrapper.querySelector('[data-tab-container]');
		const tabContents = tabWrapper.querySelectorAll('[data-tab-content]');
		tabButtons.length > 0 && tabContents.length > 0 ? tabHandle(tabButtons, tabContainer, tabContents) : false;
	});

	function tabHandle(tabButtons, tabContainer, tabContents) {

		let containerHeight = 0;

		tabContainer ? setWrapperHeight() : false;

		setActiveAnchor(tabButtons[0].dataset.tabButton);

		tabButtons.forEach(button => {
			button.addEventListener('click', () => {
				const activeTab = button.dataset.tabButton;
				setActiveAnchor(activeTab);
			});
		});

		function setWrapperHeight() {
			tabContents.forEach(content => {
				content.scrollHeight> containerHeight ? containerHeight = content.scrollHeight : false;
				tabContents[0].classList.add('is-active');
			});
			tabContainer.style.height = containerHeight + 'px';
		}

		function setActiveAnchor(anchor) {
			tabButtons.forEach(but => {
				but.classList.remove('is-active');
			});
			tabContents.forEach((tab, ind) => {
				const tabContent = tab.dataset.tabContent;
				if (!ANIM_PROP) {
					if (tabContent === anchor) {
						tab.classList.add('is-active');
						tabButtons[ind].classList.add('is-active');
					}
					else {
						tab.classList.remove('is-active');
					}
				}
				else {
					const animSettings = {
						duration: ANIM_DUR,
						ease: ANIM_EASE,
						delay: ANIM_DELAY,
					};
					if (tabContent === anchor) {
						const animTo = ANIM_PROP.open;
						const callbacks = {
							onStart: ()=> {
								tab.classList.add('is-active');
								tabButtons[ind].classList.add('is-active');
							},
							onComplete: () => {
								if (onAnimComplete) onAnimComplete();
							}
						};
						Object.assign(animTo, animSettings, callbacks);
						gsap.to(tab, animTo);
					}
					else {
						const animTo = ANIM_PROP.close;
						const callbacks = {
							onComplete: ()=> {
								tab.classList.remove('is-active');
								if (onAnimComplete) onAnimComplete();
							}
						};
						Object.assign(animTo, animSettings, callbacks);
						gsap.to(tab, animTo);
					}
				}
			});
		}
	}
}
