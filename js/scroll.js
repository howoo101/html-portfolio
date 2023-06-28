const secs = document.querySelectorAll('.naviScroll');
const scrollButtons = document.querySelectorAll('#naviScroll li');
const baseline = -window.innerHeight / 2;

scrollButtons.forEach((btn, idx) => {
	btn.addEventListener('click', () => {
		window.scrollTo({ top: secs[idx].offsetTop + baseline, behavior: 'smooth' });
	});
});

function handleScroll() {
	const scroll = parseInt(window.scrollY);
	secs.forEach((_, idx) => {
		if (scroll >= parseInt(secs[idx].offsetTop + baseline)) {
			for (const btn of scrollButtons) btn.classList.remove('on');
			scrollButtons[idx].classList.add('on');
		}
	});
}

export { handleScroll };
