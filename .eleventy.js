const defaultOptions = require('./components/options-default.js');
const validateOptions = require('./components/options-validator.js');
const parseOptions = require('./components/options-parser.js');
const measureTime = require('./components/measure-time.js');

module.exports = function(eleventyConfig, customOptions) {
	const globalOptions = Object.assign({}, defaultOptions, validateOptions(customOptions));
	eleventyConfig.addFilter('timeToRead', function(input, ...instanceOptions) {
		const options = Object.assign({}, globalOptions, parseOptions(instanceOptions));
		return measureTime(input, options);
	});
}