const regEx = require('./regular-expressions.js');

function convertToPlainText(content) {
	// Convert template object to a string
	const html = content.templateContent || content;

	// Validate input
	if(typeof html !== 'string') {
		throw new Error("Time-to-read's input must be a string or template");
	}

	// Remove html
	return html.replace(new RegExp(regEx.html,'gi'), '');
}

function parseSpeedOption(speedOption) {
	const speedOptions = speedOption.split(' ');
	return {
		amount: Number(speedOptions[0]),
		measure: speedOptions[1].toLowerCase(),
		interval: speedOptions[speedOptions.length - 1].toLowerCase()
	};
}

function calculateSeconds(content, speed) {
	const text = convertToPlainText(content);
	const { amount, measure, interval } = parseSpeedOption(speed);
	let subject;
	if(measure === 'words') {
		// Split words by whitespace and remove any empty values
		subject = text.split(/\s/).filter(word => word);
	}
	else if(measure === 'characters') {
		// Remove all whitespace and normalise non-latin characters
		subject = text.replace(/\s/g, '').normalize('NFC');
	}
	let count = subject.length / amount;

	// Normalise to seconds
	switch(interval) {
		case('hour'): count *= 60;
		case('minute'): count *= 60;
	}

	return Math.ceil(count);
}

function getUnitsOfTime(content, options) {
	const {
		speed,
		hours: displayHours,
		minutes: displayMinutes,
		seconds: displaySeconds
	} = options;
	let remainingSeconds = calculateSeconds(content, speed);
	let hours;
	let minutes;
	let seconds;

	// Calculate hours
	if(displayHours) {
		if(displayMinutes || displaySeconds) {
			hours = Math.floor(remainingSeconds / 3600);
		}
		else {
			hours = Math.round(remainingSeconds / 3600);
			if(hours === 0) {
				hours = 1;
			}
		}
		remainingSeconds = remainingSeconds % 3600;
	}

	// Calculate minutes
	if(displayMinutes) {
		if(displaySeconds) {
			minutes = Math.floor(remainingSeconds / 60);
		}
		else {
			minutes = Math.round(remainingSeconds / 60);
			if(displayHours && minutes === 60) {
				minutes = 59;
			}
			else if(!displayHours && minutes === 0) {
				minutes = 1;
			}
		}
		remainingSeconds = remainingSeconds % 60;
	}

	// Calculate seconds
	seconds = remainingSeconds;

	return {
		hours,
		minutes,
		seconds
	}
}

function createNumberFormat(language, unit, unitDisplay, digits) {
	return new Intl.NumberFormat(language,  {
    style: 'unit',
    unit: unit,
		unitDisplay: unitDisplay,
		minimumIntegerDigits: digits
	});
}

function constructTimeToRead(content, options) {
	const timeUnits = getUnitsOfTime(content, options);
	const {hours, minutes, seconds, language, style, digits} = options;
	let times =[];

	function shouldDisplay(labelDisplay, label) {
		if(typeof labelDisplay === 'boolean') {
			return labelDisplay;
		}
		else if(labelDisplay.toLowerCase() === 'auto') {
			return timeUnits[label] === 0 ? false : true;
		}
	}

	if(shouldDisplay(hours, 'hours')) {
		const template = createNumberFormat(language, 'hour', style, digits);
		times.push(template.format(timeUnits.hours));
	}

	if(shouldDisplay(minutes, 'minutes')) {
		const template = createNumberFormat(language, 'minute', style, digits);
		times.push(template.format(timeUnits.minutes));
	}

	if(shouldDisplay(seconds, 'seconds')) {
		const template = createNumberFormat(language, 'second', style, digits);
		times.push(template.format(timeUnits.seconds));
	}

	return new Intl.ListFormat(language, {type: 'unit', style: style}).format(times);
}

module.exports = function(content, options) {
	const timeToRead = constructTimeToRead(content, options);

	if(typeof options.seconds === 'string' && options.seconds.toLowerCase() === 'only') {
		return calculateSeconds(content, options.speed);
	}

	let sentence = timeToRead;
	if(options.prepend) {
		sentence = options.prepend + sentence;
	}
	if(options.append) {
		sentence = sentence + options.append;
	}

	return sentence;
}