import { handleScroll } from './scroll.js';

let eventBlock = false;

window.addEventListener('scroll', () => {
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
	scroll > 0 ? (header.className = 'on') : (header.className = 'off');
}
