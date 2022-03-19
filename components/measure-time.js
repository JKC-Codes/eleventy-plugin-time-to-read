const regEx = require('./regular-expressions.js');

module.exports = function(content, options) {
	const text = convertToPlainText(content);
	const parsedSpeed = parseSpeedOption(options.speed);
	const count = getCount(text, parsedSpeed);
	const totalSeconds = getTotalSeconds(count, parsedSpeed);
	const timings = getTimings(totalSeconds, options.hours, options.minutes, options.seconds);
	let sentence = getTimeToRead(timings, options.language, options.style, options.type, options.digits);

	// Deprecated, remove in 2.0 major release
	if(/^only$/i.test(options.seconds)) {
		return totalSeconds;
	}
	else {
		if(options.prepend !== null) {
			sentence = options.prepend + sentence;
		}
		if(options.append !== null) {
			sentence = sentence + options.append;
		};
	}

	return options.output({
		timing: sentence,
		hours: timings.hours,
		minutes: timings.minutes,
		seconds: timings.seconds,
		count: count,
		totalSeconds: totalSeconds,
		speed: parsedSpeed,
		language: options.language
	});
}


function convertToPlainText(content) {
	const html = content.templateContent || content;

	if(typeof html !== 'string') {
		throw new Error("Time-to-read's input must be a string or template");
	}

	// Remove html
	return html.replace(new RegExp(regEx.html,'gi'), '');
}

function parseSpeedOption(speedOption) {
	const speedOptions = speedOption.split(' ');

	function trimAndLowerCase(text) {
		if(text.endsWith('s')) {
			text = text.slice(0, -1);
		}
		return text.toLowerCase();
	};

	return {
		amount: Number(speedOptions[0]),
		measure: trimAndLowerCase(speedOptions[1]),
		interval: trimAndLowerCase(speedOptions[speedOptions.length - 1])
	};
}

function getCount(text, speed) {
	let count;

	if(speed.measure === 'word') {
		// Split words by whitespace and remove any empty values
		count = text.split(/\s+/).filter(word => word).length;
	}
	else if(speed.measure === 'character') {
		// Remove all whitespace and normalise non-latin characters
		count = text.replace(/\s+/g, '').normalize('NFC').length;
	}

	return count;
}

function getTotalSeconds(count, speed) {
	// Normalise to seconds
	switch(speed.interval) {
		case('hour'): count *= 60;
		case('minute'): count *= 60;
	}

	return Math.ceil(count / speed.amount);
}

function getTimings(totalSeconds, showHours, showMinutes, showSeconds) {
	let hours, minutes, seconds;

	if(showHours && showMinutes && !showSeconds) {
		hours = Math.floor(totalSeconds / 3600);
		minutes = Math.round((totalSeconds % 3600) / 60);
		if(hours === 0 && minutes === 0) {
			minutes = 1;
		}
	}
	else if(showHours && showMinutes && showSeconds) {
		hours = Math.floor(totalSeconds / 3600);
		minutes = Math.floor((totalSeconds % 3600) / 60);
		seconds = totalSeconds % 60;
	}
	else if(!showHours && showMinutes && !showSeconds) {
		minutes = Math.max(1, Math.round(totalSeconds / 60));
	}
	else if(!showHours && showMinutes && showSeconds) {
		minutes = Math.floor(totalSeconds / 60);
		seconds = totalSeconds % 60;
	}
	else if(!showHours && !showMinutes && showSeconds) {
		seconds = Math.max(1, totalSeconds);
	}
	else if(showHours && !showMinutes && showSeconds) {
		hours = Math.floor(totalSeconds / 3600);
		seconds = totalSeconds % 3600;
	}
	else if(showHours && !showMinutes && !showSeconds) {
		hours = Math.max(1, Math.round(totalSeconds / 3600));
	}

	if(!showHours || (/^auto$/i.test(showHours) && hours === 0)) {
		hours = null;
	}
	if(!showMinutes || (/^auto$/i.test(showMinutes) && minutes === 0)) {
		minutes = null;
	}
	if(!showSeconds || (/^auto$/i.test(showSeconds) && seconds === 0)) {
		seconds = null;
	}

	return { hours, minutes, seconds };
}

function getTimeToRead(timings, language, style, type, digits) {

	function addLabel(unit, amount) {
		return new Intl.NumberFormat(language, {
			style: 'unit',
			unit: unit,
			unitDisplay: style,
			minimumIntegerDigits: digits
		}).format(amount);
	}

	let timeUnits = [];
	if(timings.hours !== null) {
		timeUnits.push(addLabel('hour', timings.hours));
	}
	if(timings.minutes !== null) {
		timeUnits.push(addLabel('minute', timings.minutes));
	}
	if(timings.seconds !== null) {
		timeUnits.push(addLabel('second', timings.seconds));
	}

	return new Intl.ListFormat(language, {
		type: type,
		style: style
	}).format(timeUnits);
}