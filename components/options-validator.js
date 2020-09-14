const regEx = require('./regular-expressions.js');

function validateSpeed(speed) {
	if(typeof speed !== 'string' || !new RegExp(regEx.speed,'i').test(speed)) {
		throw new Error(`Time-to-read's speed option must be a string matching: '(Number) ${regEx.speedUnitMeasure} optional ${regEx.speedUnitPreposition} ${regEx.speedUnitInterval}'. Received: ${speed}`);
	}
}

function validateLanguage(language) {
	if(typeof language !== 'string') {
		throw new Error(`Time-to-read's language option must be a string. Received: ${language}`);
	}

	try {
		Intl.getCanonicalLocales(language);
	}
	catch {
		throw new Error(`Time-to-read's language option must be a valid locale format. Received: ${language}`);
	}

	if(!Intl.NumberFormat.supportedLocalesOf(language)[0]) {
		throw new Error(`The locale used in time-to-read's language option (${language}) is not supported`);
	}
}

function validateStyle(style) {
	const isString = typeof style === 'string';
	const lowerCase = isString && style.toLowerCase();
	const isValidString = lowerCase === 'narrow' || lowerCase === 'short' || lowerCase === 'long';

	if(!(isString && isValidString)) {
		throw new Error(`Time-to-read's style option must be a string matching 'narrow', 'short' or 'long'. Received: ${style}`);
	}
}

function validateType(type) {
	const isString = typeof type === 'string';
	const lowerCase = isString && type.toLowerCase();
	const isValidString = lowerCase === 'unit' || lowerCase === 'conjunction';

	if(!(isString && isValidString)) {
		throw new Error(`Time-to-read's type option must be a string matching 'unit' or 'conjunction'. Received: ${type}`);
	}
}

function validateLabel(label, optionKey) {
	const isBoolean = typeof label === 'boolean';
	const isAuto = typeof label === 'string' && label.toLowerCase() === 'auto';
	const isOnlySeconds = typeof label === 'string' && label.toLowerCase() === 'only' && optionKey === 'seconds';

	if(!(isBoolean || isAuto || isOnlySeconds)) {
		const secondsOnly = optionKey === 'seconds' ? " 'only', ":" ";
		throw new Error(`Time-to-read's ${optionKey} option must be true, false${secondsOnly}or 'auto'. Received '${label}'`);
	}
}

function validateInserts(insert, optionKey) {
	if(typeof insert !== 'string' && insert !== null) {
		throw new Error(`Time-to-read's ${optionKey} option must be a string. Received: ${insert}`);
	}
}

function validateDigits(digits) {
	const digitsAsNumber = Number(digits);
	const isInteger = Number.isInteger(digitsAsNumber);
	const isWithinRange = digitsAsNumber >= 1 && digitsAsNumber <= 21;
	if(!isInteger || !isWithinRange) {
		throw new Error(`Time-to-read's digits option must be an integer from 1 to 21. Received: ${digit}`);
	}
}

module.exports = function(options) {
	for(option in options) {
		switch(option) {
			case 'speed':
				validateSpeed(options[option]);
			break;

			case 'language':
				validateLanguage(options[option]);
			break;

			case 'style':
				validateStyle(options[option]);
			break;

			case 'type':
				validateType(options[option]);
			break;

			case 'hours':
			case 'minutes':
			case 'seconds':
				validateLabel(options[option], option);
			break;

			case 'prepend':
			case 'append':
				validateInserts(options[option], option);
			break;

			case 'digits':
				validateDigits(options[option]);
			break;

			default: throw new Error(`Time-to-read encountered an unrecognised option: ${option}`);
		}
	}
	return options;
}