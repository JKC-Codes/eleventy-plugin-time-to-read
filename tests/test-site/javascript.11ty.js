class page {
	data() {
		return {
			title: "JavaScript"
		};
	}

	render({tests}) {
		const html = tests.reduce((acc, cur) => {
			return acc + `<li>${cur.title}: ${this.timeToRead(cur.text)}</li>`;
		}, '');
		return `<ul>${html}</ul>`;
	}
}

module.exports = page;