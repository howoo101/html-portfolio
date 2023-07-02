const wrap = document.querySelector('.gallery .wrap');
const loading = document.querySelector('.gallery .loading');

const searchBtn = document.querySelector('.gallery .searchBtn');
const searchInput = document.querySelector('.gallery #search');

const api_key = config.flickrApiKey;
const method_interest = 'flickr.interestingness.getList';
const method_search = 'flickr.photos.search';
const imageNum = 300;
const baseUrl = `https://www.flickr.com/services/rest/?api_key=${api_key}&format=json&nojsoncallback=1&per_page=${imageNum}&method=`;

fetchData(baseUrl + `${method_interest}`);

searchBtn.addEventListener('click', (e) => {
	e.preventDefault();
	loading.classList.remove('off');
	wrap.classList.remove('on');

	const value = searchInput.value.trim();
	if (value.length === 0) fetchData(baseUrl + `${method_interest}`);
	else {
		const url_search = `${baseUrl}${method_search}&tags=${value}`;
		fetchData(url_search);
	}
});

wrap.addEventListener('click', (e) => {
	e.preventDefault();

	if (e.target.className === 'picture') {
		const imageSrc = e.target.getAttribute('alt');
		const popup = createPopup(imageSrc);
		document.body.append(popup);
		popup.addEventListener('click', (e) => e.target.className === 'close' && removePopup());
		window.addEventListener('keydown', (e) => e.key === 'Escape' && removePopup());
	}
});

async function fetchData(url) {
	const data = await fetch(url);
	const json = await data.json();
	// console.log(json.photos);
	const items = json.photos.photo;

	wrap.innerHTML = createImages(items);

	/**
	 * sorting library
	 * imgDOM 생성되었지만 이미지가 렌더링 되지 않은 상태에서 isotope이 호출되어 이미지가 겹치면서 레이아웃이 깨짐   -> 모든 이미지가 렌더링을 완료하면 호출하는 방식으로 한다.
	 */

	completeLoadingImages();
}

function createImages(items) {
	let tags = '';

	items.forEach((item) => {
		tags += `
		<li class='item'>
		<div>
		<img class='picture' src='https://live.staticflickr.com/${item.server}/${item.id}_${
			item.secret
		}_m.jpg' alt='https://live.staticflickr.com/${item.server}/${item.id}_${
			item.secret
		}_b.jpg' />           

		<p>${item.title === '' ? 'Have a good day!!' : item.title}</p>
		<article class='profile'>	
							<img src='http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg' />				
							<span>${item.owner}</span>
						</article>
		</div>
		</li>
		`;
	});

	return tags;
}

function isotopeLayout() {
	new Isotope(wrap, {
		itemSelector: '.item',
		transitionDuration: '0.5s',
	});
	//이미지 렌더링 완료 및 정렬 완료 후
	wrap.classList.add('on');
	loading.classList.add('off');
}

function completeLoadingImages() {
	const images = wrap.querySelectorAll('img');
	let count = 0;
	for (const image of images) {
		image.onerror = () => {
			image.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
		};
		image.onload = () => {
			count++;
			count === images.length && isotopeLayout();
		};
	}
}

// 이미지 클릭시 팝업생성
function createPopup(imageSrc) {
	const tags = `	
		<div class='content'>
			<img src="${imageSrc}" />
		</div>
		<span class='close'>close</span>
	`;
	const popup = document.createElement('aside');
	popup.classList.add('popup');
	popup.innerHTML = tags;

	setTimeout(() => popup.classList.add('on'), 0);
	return popup;
}

function removePopup() {
	const popup = document.querySelector('.popup');
	popup.classList.remove('on');
	setTimeout(() => popup.remove(), 1000);
}
