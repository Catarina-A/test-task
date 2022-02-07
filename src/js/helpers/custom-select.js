import dropdown from './dropdown';

/**
* Function for Custom Select. For full docs see link.
* @see https://wiki.bsgdigital.com/ru/onboarding/developer/front-end/template/custom-select-js
* @param { Object } [props] - Full list of properties
* @param { string|HTMLElement|HTMLElement[] } [props.select="select"] - Elements that will be styled
* @param { string } [props.classPrefix="custom-select"] - Prefix for all styled classes
* @param { Object } [props.dropdownProps] - List of dropdown properties
* @param { string } [props.dropdownProps.containers="[data-form-select]"] - Selector that will make dropdown
* @param { string } [props.dropdownProps.buttonSelector="[data-select-name]"] - Selector of dropdown button (title)
* @param { string } [props.dropdownProps.listSelector="[data-select-list]"] - Selector of dropdown list
* @param { string } [props.dropdownProps.optionSelector="[data-select-item]"] - Selector of dropdown option
* @param { number } [props.dropdownProps.showElements=0] - How many elements show when dropdown is open. If 0 will show full list.
* @param { number } [props.dropdownProps.duration=0.5] - Dropdown animation duration in seconds
* @param { string } [props.dropdownProps.ease="power1.out"] - Name of gsap ease function for dropdown animation
* @param { number } [props.dropdownProps.delay=0] - Dropdown animation delay in seconds
* @param { callback } [props.dropdownProps.onAnimComplete] - Callback function that is called after open or close dropdown animation completed
* @param { callback } [props.dropdownProps.onOptionSelect(option,container)] - Callback function that is called after option is selected
*/
/**
* @callback props.dropdownProps.onOptionSelect
* @param { HTMLElement } option - List element that was checked (corresponds to [data-select-item])
* @param { HTMLElement } container - Container of full dropdown (corresponds to [data-select])
*/
export default (props) => {

	if (!props) props = {};

	let selects;
	if (!props.select) {
		selects = document.querySelectorAll('select');
	}
	else if (typeof props.select === 'string') {
		selects = document.querySelectorAll(props.select);
	}
	else if (props.select.length && !props.select.tagName) {
		selects = Array.from(props.select);
	}
	else if (typeof props.select === 'object' && 'tagName' in props.select) {
		selects = [props.select];
	}

	if (!selects || selects.length == 0) return;

	const dropdownProps = props.dropdownProps || {};

	const dropdownJsSelector = dropdownProps.containers || '[data-form-select]';
	const buttonJsSelector = dropdownProps.buttonSelector || '[data-select-name]';
	const listJsSelector = dropdownProps.listSelector || '[data-select-list]';
	const optionJsSelector = dropdownProps.optionSelector || '[data-select-item]';

	const classPrefix = props.classPrefix || 'custom-select';

	selects.forEach((select) => {
		createNewHTML(select);
	});

	function createNewHTML(select) {
		const options = select.querySelectorAll('option');

		let dropdownOptionsHTML = '';
		options.forEach((option) => {
			const disabled = option.hasAttribute('disabled');

			let additionalClasses = '';
			if (disabled) additionalClasses += ` ${classPrefix}__item--disabled`;

			const dropdownOptionHTML = `<div class="${classPrefix}__item${additionalClasses}" ${optionJsSelector.slice(1, -1)}="${option.getAttribute('value')}">
				<span>${option.innerHTML}</span>
			</div>`;

			dropdownOptionsHTML += dropdownOptionHTML;
		});

		let title;
		if (select.querySelector('option[selected]')) {
			title = select.querySelector('option[selected]').innerHTML;
		}
		else {
			title = options[0].innerHTML;
		}

		const dropdownHTML = `<div class="${classPrefix}" ${dropdownJsSelector.slice(1, -1)}>
			<div class="${classPrefix}__name" ${buttonJsSelector.slice(1, -1)}>
				<span>${title}</span>
			</div>
			<div class="${classPrefix}__list" ${listJsSelector.slice(1, -1)}>
				${dropdownOptionsHTML}
			</div>
		</div>`;

		select.classList.add('is-hidden');
		select.insertAdjacentHTML('afterend', dropdownHTML);
	}

	const onOptionSelect = dropdownProps.onOptionSelect;

	const dropdownNewProps = {
		containers: dropdownJsSelector,
		onOptionSelect: optionSelectCallback
	};
	Object.assign(dropdownProps, dropdownNewProps);

	dropdown(dropdownProps);

	function optionSelectCallback(option, container) {
		const select = container.previousElementSibling;
		select.value = option.getAttribute('data-select-item');
		if (onOptionSelect) {
			onOptionSelect(option, container);
		}
	}

};
