const regEx = require('./regular-expressions.js');

module.exports = function(options) {
	for(option in options) {
		// Prevent undefined overwriting defaults
		if(options[option] === undefined) {
			delete options[option];
			continue;
		}

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

function validateSpeed(speed) {
	if(typeof speed !== 'string' || !new RegExp(regEx.speed,'i').test(speed)) {
		throw new Error(`Time-to-read's speed option must be a space separated string matching: [Number greater than 0] ['words' or 'characters'] ['hour', 'minute' or 'second']. Received: ${speed}`);
	}

	const speedNumber = speed.match(new RegExp(regEx.speedUnitAmount,'i'))[0];
	if(speedNumber <= 0) {
		throw new Error(`Time-to-read's speed option must be greater than 0`);
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
	if(!(typeof style === 'string' && /^(narrow|short|long)$/i.test(style))) {
		throw new Error(`Time-to-read's style option must be a string matching 'narrow', 'short' or 'long'. Received: ${style}`);
	}
}

function validateType(type) {
	if(!(typeof type === 'string' && /^(unit|conjunction)$/i.test(type))) {
		throw new Error(`Time-to-read's type option must be a string matching 'unit' or 'conjunction'. Received: ${type}`);
	}
}

function validateLabel(label, optionKey) {
	const isBoolean = typeof label === 'boolean';
	const isString = typeof label === 'string';
	const isAuto = isString && label.toLowerCase() === 'auto';
	const isOnlySeconds = optionKey === 'seconds' && isString && label.toLowerCase() === 'only';

	if(!(isBoolean || isAuto || isOnlySeconds)) {
		const secondsOnly = optionKey === 'seconds' ? " 'only', ":" ";
		throw new Error(`Time-to-read's ${optionKey} option must be true, false${secondsOnly}or 'auto'. Received '${label}'`);
	}
}

function validateInserts(insert, optionKey) {
	const isString = typeof insert === 'string';
	const isNumber = typeof insert === 'number';
	const isNull = insert === null;

	if(!(isString || isNumber || isNull)) {
		throw new Error(`Time-to-read's ${optionKey} option must be a string. Received: ${insert}`);
	}
}

function validateDigits(digits) {
	const number = typeof digits === 'string' ? Number(digits) : digits;
	const isInteger = Number.isInteger(number);
	const isWithinRange = number >= 1 && number <= 21;

	if(!isInteger || !isWithinRange) {
		throw new Error(`Time-to-read's digits option must be an integer from 1 to 21. Received: ${digits}`);
	}
}