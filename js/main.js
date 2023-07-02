import { handleScroll } from './scroll.js';

// swiper
const btnPlay = document.querySelector('.btnPlay');
const btnPause = document.querySelector('.btnPause');

const swiper = new Swiper('.swiper', {
	loop: true,
	effect: 'coverflow',
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: 'auto',
	coverflowEffect: {
		rotate: 50,
		stretch: 0,
		depth: 100,
		modifier: 1,
		slideShadows: true,
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	autoplay: {
		delay: 2000,
	},
});

btnPlay.addEventListener('click', () => {
	swiper.autoplay.start();
});
btnPause.addEventListener('click', () => {
	swiper.autoplay.stop();
});
// swiper
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
