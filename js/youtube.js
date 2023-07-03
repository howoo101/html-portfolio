import { config } from './apikey.js';
const wrap = document.querySelector('.youtube .wrap');

fetchData();
async function fetchData() {
	const apiKey = config.youtubeApiKey;
	const playlistId = 'PLtyGCdgf6inmUrDz2XNQJq37nfcZFOJ_M';
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=50`;

	const data = await fetch(url);
	const json = await data.json();

	wrap.innerHTML = createArticle(json.items);
}

wrap.addEventListener('click', (e) => {
	const videoId = e.target.getAttribute('alt');
	if (e.target.className !== 'thumbnail') return;
	if (e.target.className === 'thumbnail') {
		const popup = createPopup(videoId);
		document.body.append(popup);
		popup.addEventListener('click', (e) => e.target.className === 'close' && removePopup());
		window.addEventListener('keydown', (e) => e.key === 'Escape' && removePopup());
	}
});

function createArticle(json) {
	let tags = '';

	json.forEach((item) => {
		let tit = item.snippet.title;
		let desc = item.snippet.description;
		let date = item.snippet.publishedAt;

		tags += `
      <article>
        <h2>${tit.length > 50 ? tit.substr(0, 50) + '...' : tit}</h2>
        <div class='txt'>
          <p>${desc.length > 200 ? desc.substr(0, 200) + '...' : desc}</p>
          <span>${date.split('T')[0].split('-').join('.')}</span>
        </div>  
        <div class='pic'>
          <img class='thumbnail' src=${item.snippet.thumbnails.standard.url}  alt=${
			item.snippet.resourceId.videoId
		}/>
        </div>          
      </article>
    `;
	});
	return tags;
}

// 팝업생성
function createPopup(videoId) {
	const tags = `	
    <div class='content'>
      <iframe src='https://www.youtube.com/embed/${videoId}'></iframe>
    </div>
    <span class='close'>close</span>
	`;

	const popup = document.createElement('aside');
	popup.className = 'popup';
	popup.innerHTML = tags;
	// opacity transition용 스크립트로 애니메이션 줄수없어서
	setTimeout(() => document.querySelector('.popup').classList.add('on'), 0);
	// 팝업 스크롤 제거용
	document.body.style.overflow = 'hidden';
	return popup;
}

//팝업제거
function removePopup() {
	const popup = document.querySelector('.popup');
	popup.classList.remove('on');
	setTimeout(() => popup.remove(), 1000);
	// 팝업 제거후 스크롤 재생성용
	document.body.style.overflow = 'auto';
}
