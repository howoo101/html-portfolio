function Anime(target, option) {
	const startTime = performance.now();
	// 움직일 타겟 현재 위치
	let currentValue =
		option.prop === 'scroll' ? target.scrollY : parseFloat(getComputedStyle(box)[option.prop]);

	const isString = typeof option.value === 'string';

	// %로 계산해야하는 친구들
	if (isString && option.value.includes('%')) {
		//1. 비율 계산을 위해 타겟의 부모 너비 높이 변수에 담는다.
		const targetParentWidth = parseInt(getComputedStyle(target.parentElement).width);
		const targetParentHeight = parseInt(getComputedStyle(target.parentElement).height);

		// 가로축 친구들
		const vertical = ['left', 'right', 'width'];
		// 세로축 친구들
		const horizontal = ['top', 'bottom', 'height'];
		//some 최초로 만족하는게 생기면 반복끝난다.

		if (vertical.some((el) => option.prop.includes(el))) {
			currentValue = (currentValue / targetParentWidth) * 100;
		}
		if (horizontal.some((el) => option.prop.includes(el))) {
			currentValue = (currentValue / targetParentHeight) * 100;
		}
	}

	if (parseFloat(option.value) === currentValue) return;
	else requestAnimationFrame(run);

	function run(time) {
		// 브라우저 시작하고 버튼 눌렀을때까지의 시간
		const duration = option.duration;
		const timeElapsed = time - startTime;

		let progress = timeElapsed / duration;
		progress = Math.min(progress, 1) < 0 ? 0 : Math.min(progress, 1);
		// progress = Math.min(Math.max(progress, 0), 1);

		const result = currentValue + (parseFloat(option.value) - currentValue) * progress;

		if (option.prop === 'scroll') {
			target.scroll(0, result);
		} else if (option.prop === 'opacity') {
			target.style[option.prop] = result;
		} else {
			if (isString) {
				target.style[option.prop] = result + (option.value.includes('%') ? '%' : 'px');
			} else {
				target.style[option.prop] = result + 'px';
			}
		}

		if (progress < 1) {
			requestAnimationFrame(run);
		} else if (option.callback) {
			option.callback();
		}
	}
}

export { Anime };
