class page {
	data() {
		return {
			title: "JavaScript"
		};
	}

	render({tests}) {
		const html = tests.reduce((acc, cur) => {
			return acc + `\n\t\t<li>${cur.title}: ${this.timeToRead(cur.text)}</li>\n\t\t<li>${cur.title}: ${this.timeToRead(cur.text, 'zh', '100 words per minute')}</li>`;
		}, '');
		return `\n<ul>${html}\n</ul>`;
	}
}

module.exports = page;