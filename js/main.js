let eventBlock = false;

window.addEventListener('scroll', () => {
	const header = document.querySelector('#header');

	if (eventBlock) return;

	eventBlock = setTimeout(() => {
		activeHeader(header);
		eventBlock = false;
	}, 200);
});

function activeHeader(header) {
	const scroll = window.scrollY;
	scroll > 0 ? (header.className = 'on') : (header.className = 'off');
}
