import { gsap } from 'gsap';

/**
* Function for Dropdown and Select. For full docs see link.
* @see https://wiki.bsgdigital.com/ru/onboarding/developer/front-end/template/dropdown-js
* @param { Object } [props] - Full list of properties
* @param { string|HTMLElement|HTMLElement[] } [props.containers="[data-select]"] - Containers that will make dropdown
* @param { string } [props.buttonSelector="[data-select-name]"] - Selector of dropdown button (title)
* @param { string } [props.listSelector="[data-select-list]"] - Selector of dropdown list
* @param { string } [props.optionSelector="[data-select-item]"] - Selector of dropdown option
* @param { number } [props.showElements=0] - How many elements show when dropdown is open. If 0 will show full list.
* @param { number } [props.duration=0.5] - Dropdown animation duration in seconds
* @param { string } [props.ease="power1.out"] - Name of gsap ease function for dropdown animation
* @param { number } [props.delay=0] - Dropdown animation delay in seconds
* @param { callback } [props.onAnimComplete] - Callback function that is called after open or close dropdown animation completed
* @param { callback } [props.onOptionSelect(option,container)] - Callback function that id called after option is selected
*/
/**
* @callback props.onOptionSelect
* @param { HTMLElement } option - List element that was checked (corresponds to [data-select-item])
* @param { HTMLElement } container - Container of full dropdown (corresponds to [data-select])
*/
export default (props) => {

	if (!props) props = {};

	let selectArray;
	if (!props.containers) {
		selectArray = document.querySelectorAll('[data-select]');
	} else if (typeof props.containers == 'string') {
		selectArray = document.querySelectorAll(props.containers);
	} else if (props.containers.length && !props.containers.tagName) {
		selectArray = Array.from(props.containers);
	} else if (typeof props.containers == 'object' && "tagName" in props.containers) {
		selectArray = [props.containers];
	}

	if (!selectArray || selectArray.length == 0) return;

	const SHOW_ELEMENTS = props.showElements || 0;
	const ANIM_DUR = props.duration || 0.5;
	const ANIM_EASE = props.ease || 'power1.out';
	const ANIM_DELAY = props.delay || 0;
	const onAnimComplete = props.onAnimComplete;
	const onOptionSelect = props.onOptionSelect;

	selectArray.forEach(select => {
		selectHandle(select);
	});

	function selectHandle(select) {
		const titleSelector = props.buttonSelector || '[data-select-name]';
		const listSelector = props.listSelector || '[data-select-list]';
		const optionSelector = props.optionSelector || '[data-select-item]';
		const title = select.querySelector(titleSelector);
		const currentTitle = title.querySelector('span');
		const selectList = select.querySelector(listSelector);
		const selectItems = selectList.querySelectorAll(optionSelector);
		let maxHeight = 0;

		selectItems.forEach((element, index) => {
			if (index <= (SHOW_ELEMENTS - 1)) {
				maxHeight += element.offsetHeight;
			}
		});

		gsap.set(selectList, {
			height: 0,
			overflow: maxHeight > 0 ? 'auto' : 'hidden'
		})

		title.addEventListener('click', () => {
			select.classList.contains('is-active') ? hideFilter() : showFilter();
		})

		selectItems.forEach((element, index) => {
			element.addEventListener('click', event => {
				setTitle(event.target);
				onOptionSelect(element, select);
				hideFilter();
			})
		});

		document.addEventListener("click", hideFilterOnOuterClick);

		function hideFilterOnOuterClick(event) {
			if (select.contains(event.target)) return;
			hideFilter();
		}

		function showFilter() {
			gsap.to(selectList, {
				height: maxHeight > 0 ? maxHeight : 'auto',
				duration: ANIM_DUR,
				ease: ANIM_EASE,
				delay: ANIM_DELAY,
				onStart: () => {
					select.classList.add('is-active');
				},
				onComplete: () => {
					if (onAnimComplete) onAnimComplete();
				}
			});
		}

		function hideFilter() {
			gsap.to(selectList, {
				height: 0,
				duration: ANIM_DUR,
				ease: ANIM_EASE,
				delay: ANIM_DELAY,
				onComplete: () => {
					select.classList.remove('is-active');
					if (onAnimComplete) onAnimComplete();
				}
			})
		}

		function setTitle(el) {
			currentTitle.innerHTML = el.closest(optionSelector).querySelector('span').innerHTML
		}
	}
}
