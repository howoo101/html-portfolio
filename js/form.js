const submitButton = document.querySelector('[type=submit]');

submitButton.addEventListener('click', (e) => {
	if (!validate()) e.preventDefault();
});

// 필수 요소 선택
function getRequiredElements(formElement) {
	return Array.from(formElement).filter(
		(el) => !['fieldset', 'submit', 'reset'].includes(el.type)
	);
}

// 에러 메시지 표시
function showErrorMessage(target, message) {
	const errorMessageElement = document.createElement('p');
	errorMessageElement.innerText = message;
	target.closest('td').append(errorMessageElement);
	target.parentNode.classList.add('error');
	target.focus();
}

// 에러 메시지 제거
function removeErrorMsg(target) {
	const errMsg = target.closest('td').querySelector('p');
	if (errMsg) target.closest('td').querySelector('p').remove();
	target.parentNode.classList.remove('error');
}

// 텍스트 또는 비밀번호 필드 유효성 검사
function validateTextAndPassword(target) {
	target.value = target.value.trim();
	removeErrorMsg(target);

	const targetText = target.parentNode.previousElementSibling.innerText;

	const valueLength = target.value.length;
	const errorMessage =
		targetText + ` (을,를) ${target.minLength} 이상 ${target.maxLength} 이하로 입력하세요`;

	if (
		(target.type === 'text' || target.type === 'password') &&
		(valueLength < target.minLength || valueLength > target.maxLength)
	) {
		showErrorMessage(target, errorMessage);
		return false;
	}

	if (target.type === 'password') {
		const pwd1 = document.querySelector('#pwd1');
		if (target.value !== pwd1.value) {
			removeErrorMsg(target);
			showErrorMessage(target, '비밀번호가 일치하지 않습니다.');
			return false;
		}
	}

	return true;
}

// 이메일 유효성 검사
function validateEmail(target) {
	const regex = /(\W|^)[\w.\-]{0,25}@(naver|daum|gmail)\.com(\W|$)/.test(target.value);
	const errorMessage = `올바른 이메일 형식이 아닙니다.`;

	if (!regex) {
		showErrorMessage(target, errorMessage);
		return false;
	}

	return true;
}

// select-one 필드 유효성 검사
function validateSelect(target) {
	if (target.value.length === 0) {
		const targetText = target.parentNode.previousElementSibling.innerText;
		const errorMessage = targetText + ' (을,를) 선택하세요';
		showErrorMessage(target, errorMessage);
		return false;
	}

	return true;
}

// radio 또는 checkbox 필드 유효성 검사
function validateRadioOrCheckbox(target) {
	const checks = document.querySelectorAll(`[name=${target.name}]`);
	let checked = false;

	for (check of [...checks]) {
		if (check.checked) {
			checked = true;
			break;
		}
	}

	if (!checked) {
		const targetText = target.parentNode.previousElementSibling.innerText;
		const errorMessage = targetText + ' (을,를) 하나 이상 체크하세요';
		showErrorMessage(target, errorMessage);
		return false;
	}

	return true;
}

// textarea 필드 유효성 검사
function validateTextarea(target) {
	if (target.value.length === 0) {
		const targetText = target.parentNode.previousElementSibling.innerText;
		const errorMessage = targetText + ' (을,를) 입력하세요';
		showErrorMessage(target, errorMessage);
		return false;
	}
	return true;
}

// 전체 유효성 검사 함수
function validate() {
	const formElement = document.querySelector('#form');
	const requiredEl = getRequiredElements(formElement);

	for (target of requiredEl) {
		target.value = target.value.trim();
		removeErrorMsg(target);

		switch (target.type) {
			case 'text':
			case 'password':
				if (!validateTextAndPassword(target)) {
					return false;
				}
				break;
			case 'email':
				if (!validateEmail(target)) {
					return false;
				}
				break;
			case 'select-one':
				if (!validateSelect(target)) {
					return false;
				}
				break;
			case 'radio':
			case 'checkbox':
				if (!validateRadioOrCheckbox(target)) {
					return false;
				}
				break;
			case 'textarea':
				if (!validateTextarea(target)) {
					return false;
				}
				break;
		}
	}
	return true;
}
