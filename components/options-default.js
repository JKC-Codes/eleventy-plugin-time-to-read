module.exports = {
	// The number of characters read per minute tends to be around 1000 for all languages: https://en.wikipedia.org/wiki/Words_per_minute#Reading_and_comprehension
	speed: '1000 character minute',
	language: 'en',
	style: 'long',
	type: 'unit',
	hours: 'auto',
	minutes: true,
	seconds: false,
	digits: 1,
	output: function(data) {
		return data.timing;
	},

	// Deprecated, remove in 2.0 major release
	prepend: null,
	append: null,
}
