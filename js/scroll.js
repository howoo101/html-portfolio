const sections = document.querySelectorAll('.naviScroll');
const scrollButtons = document.querySelectorAll('#naviScroll li');
const baseline = -window.innerHeight / 1.8;

scrollButtons.forEach((btn, idx) => {
	btn.addEventListener('click', () => {
		window.scrollTo({ top: sections[idx].offsetTop + baseline, behavior: 'smooth' });
	});
});

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
