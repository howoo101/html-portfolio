import { Anime } from './anime.js';

const sections = document.querySelectorAll('.naviScroll');
const scrollButtons = document.querySelectorAll('#naviScroll li');
const baseline = -window.innerHeight / 4;
let enableEvent = true;

scrollButtons.forEach((btn, idx) => {
	btn.addEventListener('click', () => {
		enableEvent && moveSection(idx);
	});
});

window.addEventListener('mousewheel', moveAuto, { passive: false });

function moveAuto(e) {
	e.preventDefault();

	const activeIdx = Array.from(scrollButtons).findIndex((el) => el.className.includes('on'));

	if (e.deltaY > 0) {
		if (activeIdx === scrollButtons.length - 1) return;
		moveSection(activeIdx + 1);
	} else {
		if (activeIdx === 0) return;
		moveSection(activeIdx - 1);
	}
}

function moveSection(idx) {
	enableEvent = false;
	let lastMove = 0;
	if (idx === scrollButtons.length - 1) lastMove = 250;
	new Anime(window, {
		prop: 'scroll',
		value: sections[idx].offsetTop + baseline + lastMove,
		duration: 500,
		callback: () => (enableEvent = true),
	});
}

function handleScroll() {
	const scroll = parseInt(window.scrollY);
	sections.forEach((_, idx) => {
		if (scroll >= parseInt(sections[idx].offsetTop + baseline)) {
			for (const btn of scrollButtons) btn.classList.remove('on');
			scrollButtons[idx].classList.add('on');
			for (const section of sections) section.classList.remove('on');
			sections[idx].classList.add('on');
		}
	});
}

export { handleScroll };
