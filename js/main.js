const secs = document.querySelectorAll('.naviScroll');
const scrollButtons = document.querySelectorAll('#naviScroll li');
const baseline = -window.innerHeight / 2;
let eventBlock = false;

window.addEventListener('scroll', () => {
	if (eventBlock) return;
	console.log(scroll);
	eventBlock = setTimeout(() => {
		activeHeader();
		handleScroll();
		eventBlock = false;
	}, 300);
});

scrollButtons.forEach((btn, idx) => {
	btn.addEventListener('click', () => {
		window.scrollTo({ top: secs[idx].offsetTop + baseline, behavior: 'smooth' });
	});
});

function handleScroll() {
	const scroll = window.scrollY;
	secs.forEach((_, idx) => {
		if (scroll >= secs[idx].offsetTop + baseline) {
			for (const btn of scrollButtons) btn.classList.remove('on');
			scrollButtons[idx].classList.add('on');
		}
	});
}
//scroll시 헤더에
function activeHeader() {
	const header = document.querySelector('#header');

	const scroll = window.scrollY;
	scroll > 0 ? (header.className = 'on') : (header.className = 'off');
}
