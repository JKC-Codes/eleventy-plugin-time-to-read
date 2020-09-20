class page {
	data() {
		return {
			title: "JavaScript with arguments as an object"
		};
	}

	render({tests}) {
		const html = tests.reduce((acc, cur) => {
			return acc + `\n\t\t<li>${cur.title}: ${this.timeToRead(cur.text, {language: 'zh', speed: '100 words per minute'})}</li>`;
		}, '');
		return `\n<ul>${html}\n</ul>`;
	}
}

module.exports = page;