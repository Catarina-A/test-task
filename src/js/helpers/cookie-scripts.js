/**
 * Documents for all functions see on link
 * @see hhttps://wiki.bsgdigital.com/ru/onboarding/developer/front-end/template/cookie-script-js
 */

/**
 * @return { string } Current host url
 */
export function homeUrl() {
	const homeUrl = process.env.NODE_ENV === 'development' ? process.env.DEV_SITE_PATH : window.location.protocol + '//' + window.location.hostname;
	return homeUrl;
}

/**
 * Set cookie
 * @param { string } name - Cookie name
 * @param { string } value - Cookie value
 * @param { Date } [expires] - Date when cookie will delete
 * @param { string } [path] - Path to pages where cookie will work
 * @param { string } [domain] - Domain where cookies will work
 * @param { boolean } [secure] - True for using only https
 */
export function setCookie(name, value, expires, path, domain, secure) {
	const curCookie = name + '=' + escape(value) +
		((expires) ? '; expires=' + expires.toGMTString() : '') +
		((path) ? '; path=' + path : '') +
		((domain) ? '; domain=' + domain : '') +
		((secure) ? '; secure' : '');
	document.cookie = curCookie;
}

/**
 * Delete cookie
 * @param { string } name - Cookie name to be deleted
 */
export function deleteCookie(name) {
	setCookie(name, false, 0, '/');
}

/**
 * Get cookie
 * @param { string } name - Cookie name to get
 * @return { (string|undefined) } Value of cookie or undefined if doesn't exist
 */
export function getCookie(name) {
	const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

/**
 * Show site cookie
 * @return { string } List of all site cookies
 */
export function listCookies() {
	const theCookies = document.cookie.split(';');
	let aString = '';
	for (let i = 1; i <= theCookies.length; i++) {
		aString += i + ' ' + theCookies[i - 1] + '\n';
	}
	return aString;
}
