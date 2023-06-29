class Tab {
	constructor(selector, option) {
		const defaults = { btns: 'tab_buttons li', boxs: 'tab_items' };
		const result = { ...defaults, ...option };
		this.tab = document.querySelector(selector);
		this.btns = this.tab.querySelectorAll(result.btns);
		this.boxs = this.tab.querySelectorAll(result.boxs);
		this.bindingEvent();
	}

	bindingEvent() {
		this.btns.forEach((el, idx) => {
			el.addEventListener('click', () => {
				[this.btns, this.boxs].forEach((el) => this.activation(el, idx));
			});
		});
	}

	activation(arr, idx) {
		arr.forEach((el) => el.classList.remove('on'));
		arr[idx].classList.add('on');
	}
}

new Tab('#tab', {
	btns: '.tab_buttons li',
	boxs: '.tab_items',
});
