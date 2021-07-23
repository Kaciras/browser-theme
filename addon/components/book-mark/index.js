import styles from "./index.css";

const template = document.createElement("template");
template.innerHTML = `
	<style>${styles}</style>
	
	<button type="button"></button>
	<div id="icon-box">
		<img id="favicon" alt="favicon" src="#">
	</div>
	<span id="name"></span>
`;

class BookMarkElement extends HTMLElement {

	static get observedAttributes() {
		return ["name", "favicon", "url"];
	}

	constructor() {
		super();
		const root = this.attachShadow({ mode: "closed" });
		root.append(template.content.cloneNode(true));

		this.nameEl = root.getElementById("name");
		this.iconEl = root.getElementById("favicon");

		this.addEventListener("click", this.handleClick);
		this.addEventListener("keyup", this.handleKeyUp);
	}

	handleClick() {
		window.open(this.url);
	}

	handleKeyUp() {
		window.open(this.url);
	}

	get name() {
		return this.nameEl.textContent;
	}

	set name(value) {
		this.nameEl.textContent = value;
	}

	get favicon() {
		return this.iconEl.src;
	}

	set favicon(value) {
		this.iconEl.src = value;
	}

	attributeChangedCallback(name, oldValue, newValue) {
		const { input } = this;
		if (newValue === null) {
			input.removeAttribute(name);
		} else {
			input.setAttribute(name, newValue);
		}
	}
}

customElements.define("book-mark", BookMarkElement);
