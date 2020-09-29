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
		prepend: null,
		append: null,
		digits: 1
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
	t.is(measureTime('<!-- this comment should be ignored -->', {seconds: 'only'}), 0);

	t.is(measureTime('<p class="these tags should be ignored"></p>', {seconds: 'only'}), 0);

	t.is(measureTime(`${characters(10)} <!-- ignored comment --> ${characters(10)} <p class="ignored tag and class">characters</p> ${characters(10)}`, {seconds: 'only'}), 40);
});

test('calculates correct speed', t => {
	t.is(measureTime('', {seconds: 'only'}), 0);
	t.is(measureTime('a', {seconds: 'only'}), 1);
	t.is(measureTime(characters(456), {seconds: 'only'}), 456);
	t.is(measureTime(characters(456), {speed: '10 characters per second', seconds: 'only'}), 46);

	t.is(measureTime('', {speed: '1 word per second', seconds: 'only'}), 0);
	t.is(measureTime('word', {speed: '1 word per second', seconds: 'only'}), 1);
	t.is(measureTime(words(789), {speed: '1 word per second', seconds: 'only'}), 789);
	t.is(measureTime(words(789), {speed: '10 words per second', seconds: 'only'}), 79);

	t.is(measureTime('', {speed: '1 character per minute', seconds: 'only'}), 0);
	t.is(measureTime('a', {speed: '1 character per minute', seconds: 'only'}), 60);
	t.is(measureTime(characters(154), {speed: '1 character per minute', seconds: 'only'}), 9240);
	t.is(measureTime(characters(154), {speed: '10 characters per minute', seconds: 'only'}), 924);

	t.is(measureTime('', {speed: '1 character per hour', seconds: 'only'}), 0);
	t.is(measureTime('a', {speed: '1 character per hour', seconds: 'only'}), 3600);
	t.is(measureTime(characters(45), {speed: '1 character per hour', seconds: 'only'}), 162000);
	t.is(measureTime(characters(45), {speed: '10 characters per hour', seconds: 'only'}), 16200);
});

test('outputs multiple languages', t => {
	t.is(measureTime('a', {language: 'en', seconds: true}), '1 second');

	t.is(measureTime('a', {language: 'es', seconds: true}), '1 segundo');

	t.is(measureTime('a', {language: 'zh-u-nu-hanidec', seconds: true}), '一秒钟');
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

test.todo('outputs different labels');

test('outputs with pre/append', t => {
	t.is(measureTime('a', {prepend: 'foo'}), 'foo1 second');
	t.is(measureTime('a', {prepend: 'bar '}), 'bar 1 second');

	t.is(measureTime('a', {append: 'foo'}), '1 secondfoo');
	t.is(measureTime('a', {append: ' bar'}), '1 second bar');
});

test('outputs padded digits', t => {
	t.is(measureTime('foo', {digits: 1}), '3 seconds');
	t.is(measureTime('foo', {digits: 2}), '03 seconds');
	t.is(measureTime('foo', {digits: 3}), '003 seconds');

	t.is(measureTime(characters(90), {digits: 1, minutes: false}), '90 seconds');
	t.is(measureTime(characters(90), {digits: 2, minutes: false}), '90 seconds');
	t.is(measureTime(characters(90), {digits: 3, minutes: false}), '090 seconds');
});