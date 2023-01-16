/**
 * Bind the value of the input to a property of the object。
 * Property name is equals to input's name.
 *
 * @param input The input element, must have a name attribute。
 * @param receiver The object to bind to.
 */
export function bindInput(input, receiver) {
	const { type, name } = input;
	let prop;

	switch (type) {
		case "number":
			prop = "valueAsNumber";
			break;
		case "checkbox":
			prop = "checked";
			break;
		default:
			prop = "value";
			break;
	}

	input[prop] = receiver[name];
	input.addEventListener("input", event => {
		receiver[name] = event.target[prop];
	});
}

/**
 * Download the image by url and return its width & height.
 *
 * @param url The url of the image.
 * @returns {Promise<{width: number, height: number}>}
 */
export function getImageResolution(url) {
	const element = document.createElement("img");
	element.src = url;

	return new Promise((resolve, reject) => {
		element.onerror = reject;
		element.onload = () => resolve(element);
	});
}

/**
 * Gets the element's index among all children of its parent.
 * Throw an error if the element does not have a parent.
 *
 * @param el {Node} The DOM element.
 * @param from {number?} The array index at which to begin the search, default 0.
 * @return {number} The index.
 */
export function indexInParent(el, from) {
	return Array.prototype.indexOf.call(el.parentNode.children, el, from);
}
