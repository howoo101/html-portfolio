import { Anime } from './anime.js';

const sections = document.querySelectorAll('.naviScroll');
const scrollButtons = document.querySelectorAll('#naviScroll li');
const baseline = -window.innerHeight / 2;
let eventBlock = false;

scrollButtons.forEach((btn, idx) => {
	btn.addEventListener('click', () => {
		// window.scrollTo({ top: sections[idx].offsetTop + baseline, behavior: 'smooth' });
		if (eventBlock) return;
		console.log(1111);

		eventBlock = setTimeout((e) => {
			moveSection(idx);
			eventBlock = false;
		}, 300);
	});
});

window.addEventListener('mousewheel', moveAuto, { passive: false });

function moveAuto(e) {
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
	new Anime(window, {
		prop: 'scroll',
		value: sections[idx].offsetTop + baseline,
		duration: 500,
		callback: () => (eventBlock = false),
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
