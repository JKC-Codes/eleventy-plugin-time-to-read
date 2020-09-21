const regEx = require('./regular-expressions.js');

function isSpeed(option) {
	return new RegExp(regEx.speed,'i').test(option);
}

function isLanguage(option) {
	if(typeof option !== 'string') { return false; }
	try {
		Intl.getCanonicalLocales(option);
		return true;
	}
	catch {
		return false;
	}
}

function isHandlebarsHelper(option) {
	if(typeof option !== 'object') { return false; }

	const optionKeys = Object.keys(option);
	const handlebarKeys = ['lookupProperty', 'name', 'hash', 'data', 'loc'];

	return handlebarKeys.every(key => {
		return optionKeys.includes(key);
	})
}

function isJSArgument(option) {
	if(typeof option === 'object') {
		return true;
	}
}

module.exports = function(customOptions) {
	let options = {};
	customOptions.forEach(option => {
		if(isSpeed(option)) {
			options.speed = option;
		}
		else if(isLanguage(option)) {
			options.language = option;
		}
		else if(isHandlebarsHelper(option)) {
			return;
		}
		else if(isJSArgument(option)) {
			Object.assign(options, option);
		}
		else {
			throw new Error(`Time-to-read encountered an unrecognised option: ${option}`);
		}
	})
	return options;
}