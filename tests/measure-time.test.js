const test = require('ava');
const measureTimeFunction = require('../components/measure-time.js');

function characters(amount) {
	return 'a'.repeat(amount);
}

function words(amount) {
	return 'foo '.repeat(amount);
}

function measureTime(text, options = {}) {
	const defaultOptions = {
		speed: '1 character per second',
		language: 'en',
		style: 'long',
		type: 'unit',
		hours: 'auto',
		minutes: 'auto',
		seconds: 'auto',
		digits: 1,
		output: function(data) { return data.timing; },
		prepend: null, // Deprecated, remove in 2.0 major release
		append: null, // Deprecated, remove in 2.0 major release
	}
	const fullOptions = Object.assign({}, defaultOptions, options);
	return measureTimeFunction(text, fullOptions);
}


test('only accepts string or template', t => {
	t.notThrows(()=> {
		measureTime('')
	});
	t.notThrows(()=> {
		measureTime('foo')
	});
	t.notThrows(()=> {
		measureTime({foo: 'bar', templateContent: 'baz'})
	});

	t.throws(()=> {
		measureTime(123)
	});
	t.throws(()=> {
		measureTime(true)
	});
	t.throws(()=> {
		measureTime(false)
	});
	t.throws(()=> {
		measureTime(['foo', 'bar'])
	});
	t.throws(()=> {
		measureTime({foo: 'bar'})
	});
});

test('ignores html', t => {
	t.is(measureTime('<!-- this comment should be ignored -->', {output: function(data) { return data.totalSeconds; }}), 0);

	t.is(measureTime('<p class="these tags should be ignored"></p>', {output: function(data) { return data.totalSeconds; }}), 0);

	t.is(measureTime(`${characters(10)} <!-- ignored comment --> ${characters(10)} <p class="ignored tag and class">characters</p> ${characters(10)}`, {output: function(data) { return data.totalSeconds; }}), 40);
});

test('calculates correct speed', t => {
	t.is(measureTime('', {output: function(data) { return data.totalSeconds; }}), 0);
	t.is(measureTime('a', {output: function(data) { return data.totalSeconds; }}), 1);
	t.is(measureTime(characters(456), {output: function(data) { return data.totalSeconds; }}), 456);
	t.is(measureTime(characters(456), {speed: '10 characters per second', output: function(data) { return data.totalSeconds; }}), 46);

	t.is(measureTime('', {speed: '1 word per second', output: function(data) { return data.totalSeconds; }}), 0);
	t.is(measureTime('word', {speed: '1 word per second', output: function(data) { return data.totalSeconds; }}), 1);
	t.is(measureTime(words(789), {speed: '1 word per second', output: function(data) { return data.totalSeconds; }}), 789);
	t.is(measureTime(words(789), {speed: '10 words per second', output: function(data) { return data.totalSeconds; }}), 79);

	t.is(measureTime('', {speed: '1 character per minute', output: function(data) { return data.totalSeconds; }}), 0);
	t.is(measureTime('a', {speed: '1 character per minute', output: function(data) { return data.totalSeconds; }}), 60);
	t.is(measureTime(characters(154), {speed: '1 character per minute', output: function(data) { return data.totalSeconds; }}), 9240);
	t.is(measureTime(characters(154), {speed: '10 characters per minute', output: function(data) { return data.totalSeconds; }}), 924);

	t.is(measureTime('', {speed: '1 character per hour', output: function(data) { return data.totalSeconds; }}), 0);
	t.is(measureTime('a', {speed: '1 character per hour', output: function(data) { return data.totalSeconds; }}), 3600);
	t.is(measureTime(characters(45), {speed: '1 character per hour', output: function(data) { return data.totalSeconds; }}), 162000);
	t.is(measureTime(characters(45), {speed: '10 characters per hour', output: function(data) { return data.totalSeconds; }}), 16200);
});

test('outputs multiple languages', t => {
	t.is(measureTime('a', {language: 'en'}), '1 second');

	t.is(measureTime('a', {language: 'es'}), '1 segundo');

	t.is(measureTime('a', {language: 'zh-u-nu-hanidec'}), '一秒钟');
});

test('outputs different styles', t => {
	t.is(measureTime('a', {style: 'long'}), '1 second');

	t.is(measureTime('a', {style: 'short'}), '1 sec');

	t.is(measureTime('a', {style: 'narrow'}), '1s');
});

test('outputs different types', t => {
	t.is(measureTime(characters(90), {type: 'unit'}), '1 minute, 30 seconds');

	t.is(measureTime(characters(90), {type: 'conjunction'}), '1 minute and 30 seconds');

	t.is(measureTime(characters(90), {type: 'conjunction', style: 'short'}), '1 min & 30 sec');

	t.is(measureTime(characters(90), {type: 'conjunction', style: 'narrow'}), '1m, 30s');
});

test('outputs auto labels correctly', t => {
	t.is(measureTime(characters(3599), {hours: 'auto', minutes: 'auto', seconds: 'auto'}), '59 minutes, 59 seconds');
	t.is(measureTime(characters(3600), {hours: 'auto', minutes: 'auto', seconds: 'auto'}), '1 hour');
	t.is(measureTime(characters(3601), {hours: 'auto', minutes: 'auto', seconds: 'auto'}), '1 hour, 1 second');
	t.is(measureTime(characters(3540), {hours: 'auto', minutes: 'auto', seconds: 'auto'}), '59 minutes');
	t.is(measureTime(characters(3660), {hours: 'auto', minutes: 'auto', seconds: 'auto'}), '1 hour, 1 minute');
});

test('outputs true/false labels correctly', t => {
	t.is(measureTime('', {hours: true, minutes: true, seconds: true}), '0 hours, 0 minutes, 0 seconds');
	t.is(measureTime(characters(3661), {hours: true, minutes: true, seconds: true}), '1 hour, 1 minute, 1 second');
	t.is(measureTime(characters(3661), {hours: false, minutes: true, seconds: true}), '61 minutes, 1 second');
	t.is(measureTime(characters(3661), {hours: true, minutes: false, seconds: true}), '1 hour, 61 seconds');
	t.is(measureTime(characters(3661), {hours: true, minutes: true, seconds: false}), '1 hour, 1 minute');
	t.is(measureTime(characters(3661), {hours: true, minutes: false, seconds: false}), '1 hour');
	t.is(measureTime(characters(3661), {hours: false, minutes: true, seconds: false}), '61 minutes');
	t.is(measureTime(characters(3661), {hours: false, minutes: false, seconds: true}), '3,661 seconds');
});

test('outputs rounded times correctly', t => {
	t.is(measureTime(characters(1), {hours: 'auto', minutes: true, seconds: false}), '1 minute');
	t.is(measureTime(characters(59), {hours: 'auto', minutes: true, seconds: false}), '1 minute');
	t.is(measureTime(characters(89), {hours: false, minutes: true, seconds: false}), '1 minute');
	t.is(measureTime(characters(90), {hours: false, minutes: true, seconds: false}), '2 minutes');
	t.is(measureTime(characters(90), {hours: false, minutes: true, seconds: true}), '1 minute, 30 seconds');
	t.is(measureTime(characters(5399), {hours: true, minutes: false, seconds: false}), '1 hour');
	t.is(measureTime(characters(5400), {hours: true, minutes: false, seconds: false}), '2 hours');
	t.is(measureTime(characters(5400), {hours: true, minutes: false, seconds: true}), '1 hour, 1,800 seconds');
});

test('outputs padded digits', t => {
	t.is(measureTime('foo', {digits: 1}), '3 seconds');
	t.is(measureTime('foo', {digits: 2}), '03 seconds');
	t.is(measureTime('foo', {digits: 3}), '003 seconds');

	t.is(measureTime(characters(90), {digits: 1, minutes: false}), '90 seconds');
	t.is(measureTime(characters(90), {digits: 2, minutes: false}), '90 seconds');
	t.is(measureTime(characters(90), {digits: 3, minutes: false}), '090 seconds');
});

test('passes correct arguments to output', t => {
	const arguments = {
		hours: true,
		minutes: true,
		seconds: true,
		speed: '5 characters a minute',
		language: 'es',
		output: function(data) {
			return JSON.stringify([
				data.timing,
				data.hours,
				data.minutes,
				data.seconds,
				data.count,
				data.totalSeconds,
				data.speed.amount,
				data.speed.measure,
				data.speed.interval,
				data.language
			]);
		}
	}

	t.is(measureTime('foobarbaz', arguments), `["0 horas, 1 minuto y 48 segundos",0,1,48,9,108,5,"character","minute","es"]`);
});

test('output can be modified', t => {
	const outputFunction = function (data) {
		const numberOfEmoji = Math.max(1, Math.round(data.totalSeconds / 60));
		const emojiString = '🕒'.repeat(numberOfEmoji);

		return `${emojiString} ${data.timing} to read`;
	}

	t.is(measureTime(characters(180), {output: outputFunction}), '🕒🕒🕒 3 minutes to read');
});


// Deprecated, remove in 2.0 major release
test('outputs with pre/append', t => {
	t.is(measureTime('a', {prepend: 'foo'}), 'foo1 second');
	t.is(measureTime('a', {prepend: 'bar '}), 'bar 1 second');
	t.is(measureTime('a', {prepend: '2 '}), '2 1 second');

	t.is(measureTime('a', {append: 'foo'}), '1 secondfoo');
	t.is(measureTime('a', {append: ' bar'}), '1 second bar');
	t.is(measureTime('a', {append: ' 2'}), '1 second 2');
});