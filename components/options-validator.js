const regEx = require('./regular-expressions.js');

module.exports = function(userOptions = {}) {
	const validatedOptions = {};

	for(let [key, value] of Object.entries(userOptions)) {
		if(value === null || value === undefined) {
			continue;
		}

		key = key.toLowerCase();

		switch(key) {
			case 'speed':
				validateSpeed(value);
			break;

			case 'language':
				validateLanguage(value);
			break;

			case 'style':
				validateStyle(value);
			break;

			case 'type':
				validateType(value);
			break;

			case 'hours':
			case 'minutes':
			case 'seconds':
				validateLabel(value, key);
			break;

			case 'digits':
				validateDigits(value);
			break;

			case 'output':
				validateOutput(value);
			break;

			default: throw new Error(`Time-to-read encountered an unrecognised option: ${JSON.stringify(key)}`);

			// Deprecated, remove in 2.0 major release
			case 'prepend':
			case 'append':
				validateInserts(value, key);
			break;
		}

		validatedOptions[key] = value;
	}
	return validatedOptions;
}


function validateSpeed(speed) {
	if(!new RegExp(regEx.speed,'i').test(speed)) {
		throw new Error(`Time-to-read's speed option must be a space separated string matching: [Number greater than 0] ['words' or 'characters'] ['hour', 'minute' or 'second']. Received ${typeof speed}: ${JSON.stringify(speed)}`);
	}

	const speedNumber = speed.match(new RegExp(regEx.speedUnitAmount,'i'))[0];
	if(speedNumber <= 0) {
		throw new Error(`Time-to-read's speed option must be greater than 0`);
	}
}

function validateLanguage(language) {
	if(typeof language !== 'string') {
		throw new Error(`Time-to-read's language option must be a string. Received ${typeof language}: ${JSON.stringify(language)}`);
	}

	try {
		Intl.getCanonicalLocales(language);
	}
	catch {
		throw new Error(`Time-to-read's language option must be a valid locale format. Received: ${JSON.stringify(language)}`);
	}

	if(!Intl.NumberFormat.supportedLocalesOf(language)[0]) {
		throw new Error(`The locale used in time-to-read's language option (${JSON.stringify(language)}) is not supported`);
	}
}

function validateStyle(style) {
	if(!/^(narrow|short|long)$/i.test(style)) {
		throw new Error(`Time-to-read's style option must be a string matching 'narrow', 'short' or 'long'. Received: ${typeof style}: ${JSON.stringify(style)}`);
	}
}

function validateType(type) {
	if(!/^(unit|conjunction)$/i.test(type)) {
		throw new Error(`Time-to-read's type option must be a string matching 'unit' or 'conjunction'. Received ${typeof type}: ${JSON.stringify(type)}`);
	}
}

function validateLabel(label, optionKey) {
	const isBoolean = typeof label === 'boolean';
	const isAuto = /^auto$/i.test(label);

	const isOnlySeconds = optionKey === 'seconds' && /^only$/i.test(label); // Deprecated, remove in 2.0 major release

	if(!isBoolean && !isAuto && !isOnlySeconds) { // Deprecated, remove isOnlySeconds in 2.0 major release
		throw new Error(`Time-to-read's ${JSON.stringify(optionKey)} option must be True, False or 'auto'. Received ${typeof label}: '${JSON.stringify(label)}'`);
	}
}

function validateDigits(digits) {
	const number = typeof digits === 'string' ? Number(digits) : digits;
	const isInteger = Number.isInteger(number);
	const isWithinRange = number >= 1 && number <= 21;

	if(!isInteger || !isWithinRange) {
		throw new Error(`Time-to-read's digits option must be an integer from 1 to 21. Received ${typeof digits}: ${JSON.stringify(digits)}`);
	}
}

function validateOutput(output) {
	if(typeof output !== 'function') {
		throw new Error(`Time-to-read's output option must be a function. Received ${typeof output}: ${JSON.stringify(output)}`);
	}
}


// Deprecated, remove in 2.0 major release
function validateInserts(insert, optionKey) {
	const isNull = insert === null;
	const isString = typeof insert === 'string';
	const isNumber = typeof insert === 'number';

	if(!isNull && !isString && !isNumber) {
		throw new Error(`Time-to-read's ${optionKey} option must be a string. Received: ${insert}`);
	}
}