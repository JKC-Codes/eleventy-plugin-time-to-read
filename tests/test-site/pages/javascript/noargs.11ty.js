class page {
	data() {
		return {
			title: "JavaScript without arguments"
		};
	}

	render({tests}) {
		const html = tests.reduce((acc, cur) => {
			return acc + `\n\t\t<li>${cur.title}: ${this.timeToRead(cur.text)}</li>`;
		}, '');
		return `\n<ul>${html}\n</ul>`;
	}
}

module.exports = page;