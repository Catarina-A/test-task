/**
* Fire new script
* @see https://wiki.bsgdigital.com/ru/onboarding/developer/front-end/template/scriptLoader-js
* @param { Object } props
* @param { string } props.libraryName - ID of script
* @param { string } props.url - URL of script
* @param { string } [props.integrity] - Integrity attribute of script
* @param { string } [props.crossorigin] - Crossorigin attribute of script
*/
export default (props) => {
	return new Promise((resolve, reject) => {
		const existingScript = document.getElementById(props.libraryName);

		if (existingScript) {
			resolve();
		}
		else {
			const script = document.createElement('script');
			script.src = props.url;
			script.id = props.libraryName;
			if (props.integrity) {
				script.integrity = props.integrity;
			}
			if (props.crossorigin) {
				script.crossOrigin = props.crossorigin;
			}
			document.body.appendChild(script);
			script.onload = () => {
				resolve();
			};
			script.onerror = () => {
				reject();
			};
		}
	});
};
