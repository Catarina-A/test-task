/**
 * Description of all function see on link
 * @see https://wiki.bsgdigital.com/ru/onboarding/developer/front-end/template/detect-device-js
 */

/**
 * @return { boolean } true, if customer's OS is Macintosh.
 */
export function isMacintosh() {
	return navigator.platform.indexOf('Mac') > -1;
}

/**
 * @return { boolean } true, if customer's OS is Windows.
 */
export function isWindows() {
	return navigator.platform.indexOf('Win') > -1;
}

/**
 * @return { Object } browser - Details of customer's browser
 * @return { string } browser.name - Can be: Opera, Chrome, Safari, Firefox, IE, Edge etc.
 * @return { number } browser.version - Number of browser version
 */
export function detectBrowser() {
	const ua = navigator.userAgent; 
	let tem;
	let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	if(/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		return {name:'IE', version:(tem[1] || '')};
	}
	if(M[1]=== 'Chrome') {
		tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
		if(tem !== null) return {name:tem[1].replace('OPR', 'Opera'), version:tem[2]};
	}
	M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
	if((tem = ua.match(/version\/(\d+)/i))!== null)
		M.splice(1, 1, tem[1]);
	return {name:M[0], version:M[1]};
}

/**
 * @return { boolean } true, if customer's device is iPad, iPhone or Android
 */
export function isTouch() {
	return navigator.userAgent.match(/iPad|iPhone|Android/i) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
}

/**
 * @return { boolean } true, if customer's device is iPad or iPhone
 */
export function isIOS() {
	return navigator.userAgent.match(/iPad|iPhone/i) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
}

/**
 * @return { boolean } true, if viewport width is mobile
 */
export function isMobile() {
	return window.innerWidth < 768;
}

/**
 * @return { boolean } true, if viewport width is tablet
 */
export function isTablet() {
	return window.innerWidth < 1025 && window.innerWidth > 767;
}

/**
 * @return { boolean } true, if viewport width is desktop
 */
export function isDesktop() {
	return window.innerWidth > 1024;
}

/**
 * @return { boolean } true, if viewport width is mobile and device has IOS
 */
export function isSafariMobile() {
	return isIOS() && isMobile();
}
