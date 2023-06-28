const wrapEl = document.querySelector('.department .wrap');

fetchData('DB/department.json');

async function fetchData(json) {
	const resp = await fetch(json);
	const jsonData = await resp.json();
	wrapEl.innerHTML = createArticle(jsonData);
}

function createArticle(data) {
	let articleTags = '';
	const members = data.members;

	members.forEach((member, idx) => {
		const name = member.name;
		const position = member.position;
		const picture = member.pic;

		articleTags += `
        <article>
          <div class='picture'>
            <img src="imgs/${picture}"/>
          </div>
          <div class='content'>
            <h2>${name}</h2>
            <p>${position}</p>
          </div>
        </article>
      `;
	});

	return articleTags;
}
