const pluginTimeToRead = require('./index.js');

module.exports = function(eleventyConfig) {

	eleventyConfig.addPlugin(pluginTimeToRead, {});

	return {
		dir: {
			input: './tests/test-site/',
			output: './tests/test-site/_site'
		}
	};
};