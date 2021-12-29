/**
* Collecting form data
* @param { HTMLElement } form - Form element for collecting data
* @return { Object } Collection, where key is the name of the field and value is its value
* @see https://wiki.bsgdigital.com/ru/onboarding/developer/front-end/template/form-js-form-serialaize-js
*/
export default form => {

	// Setup our serialized data
	const serialized = {};

	// Loop through each field in the form
	for (let i = 0; i < form.elements.length; i++) {

		const field = form.elements[i];

		// Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
		if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

		// If a multi-select, get all selections
		if (field.type === 'select-multiple') {
			for (let n = 0; n < field.options.length; n++) {
				if (!field.options[n].selected) continue;
				serialized[field.name] = field.options[n].value;
			}
		}

		// Convert field data to a query string
		else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
			serialized[field.name] = field.value;
		}
	}

	return serialized;

};
