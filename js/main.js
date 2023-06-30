import { handleScroll } from './scroll.js';

let eventBlock = false;

window.addEventListener('scroll', () => {
	if (eventBlock) return;
	eventBlock = setTimeout(() => {
		activeHeader();
		handleScroll();
		eventBlock = false;
	}, 300);
});

//scroll시 헤더에 배경
function activeHeader() {
	const header = document.querySelector('#header');

	const scroll = window.scrollY;

	header.classList.remove('on');
	header.classList.remove('off');

	scroll > 0 ? header.classList.add('on') : header.classList.add('off');
}
