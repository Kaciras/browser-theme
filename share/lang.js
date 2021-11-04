/**
 * 防抖 + 节流的组合体，专门用于搜索建议这种频繁输入 + 网络请求的场景。
 *
 * 【区分防抖和节流】
 * 防抖：延迟事件，如果在期间又被触发则重新计时。
 * 节流：多次触发只有最后一次生效，之前的全部取消。
 */
export class DebounceThrottle {

	/** 防抖的延时（毫秒） */
	threshold = 0;

	controller = new AbortController();
	timer = 0;

	constructor(handler) {
		this.handler = handler;
		this.callback = this.callback.bind(this);
	}

	callback() {
		this.controller.abort();
		this.controller = new AbortController();
		this.handler(this.controller.signal);
	}

	stop() {
		clearTimeout(this.timer);
		this.controller.abort();
	}

	reschedule() {
		const { timer, callback, threshold } = this;
		clearTimeout(timer);
		this.timer = setTimeout(callback, threshold);
	}
}

/**
 * 使用 getter & setter 将 object[name] 绑定到 target[prop]。
 */
export function delegate(object, name, target, prop) {
	Object.defineProperty(object, name, {
		configurable: true,
		enumerable: true,
		get: () => target[prop],
		set: value => { target[prop] = value; },
	});
}

/**
 * 将输入组件的值与另一个对象的属性绑定。
 * 属性名等于输入组件的 name 属性，监听使用 input 事件。
 *
 * @param input 输入组件，必须有 name 和 type 属性。
 * @param receiver 要绑定的对象
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
 * 虽然 Node 自带 dirname，但在浏览器里用的话还得自己写一个。
 */
export function dirname(path) {
	const i = path.lastIndexOf("/");
	return i < 0 ? path : path.slice(0, i);
}

/**
 * 插队，先将数组中的元素移除，然后插入到指定位置。
 *
 * @param array 数组
 * @param i 原位置
 * @param j 新位置
 * @param n 移动的元素个数
 */
export function jump(array, i, j, n = 1) {
	array.splice(j, 0, ...array.splice(i, n));
}

/**
 * 获取元素在其父元素的所有子元素中的位置。
 *
 * @param el DOM 元素
 * @return {number} 位置，如果没有父元素则出错。
 */
export function indexInParent(el) {
	return Array.prototype.indexOf.call(el.parentNode.children, el);
}
