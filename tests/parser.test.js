const test = require('ava');
const parser = require('../components/options-parser.js');


test('returns valid speed argument as object', t => {
	const testArgument1 = '250 words a minute';
	const testArgument2 = '0.9 characters per second';
	t.is(parser([testArgument1]).speed, testArgument1);
	t.is(parser([testArgument2]).speed, testArgument2);
});

test('returns valid language argument as object', t => {
	const testArgument1 = 'en';
	const testArgument2 = 'zh-u-nu-hanidec';
	t.is(parser([testArgument1]).language, testArgument1);
	t.is(parser([testArgument2]).language, testArgument2);
});

test('returns array of arguments as object', t => {
	const testArgument = ['1000 characters per hour', 'hi'];
	t.is(parser(testArgument).speed, testArgument[0]);
	t.is(parser(testArgument).language, testArgument[1]);
});

test('accepts object argument', t => {
	const testArgument = {
		speed: '1000 characters per minute',
		language: 'en',
		style: 'long',
		type: 'unit',
		hours: 'auto',
		minutes: true,
		seconds: false,
		prepend: null,
		append: null,
		digits: 1
	};
	t.is(parser([testArgument]).speed, testArgument.speed);
	t.is(parser([testArgument]).language, testArgument.language);
	t.is(parser([testArgument]).style, testArgument.style);
	t.is(parser([testArgument]).type, testArgument.type);
	t.is(parser([testArgument]).hours, testArgument.hours);
	t.is(parser([testArgument]).minutes, testArgument.minutes);
	t.is(parser([testArgument]).seconds, testArgument.seconds);
	t.is(parser([testArgument]).prepend, testArgument.prepend);
	t.is(parser([testArgument]).append, testArgument.append);
	t.is(parser([testArgument]).digits, testArgument.digits);
});

test('rejects invalid speed argument', t => {
	t.throws(() => {
		parser(['0 words a minute'])
	});
	t.throws(() => {
		parser(['250 chars a minute'])
	});
	t.throws(() => {
		parser(['250 words a min'])
	});
});

test('rejects invalid language argument', t => {
	t.throws(() => {
		parser(['en_us'])
	});
});

test('rejects array argument', t => {
	t.throws(() => {
		parser([['250 words per minute', 'en']])
	});
});

test('rejects number argument', t => {
	t.throws(() => {
		parser([123])
	});
});

test('rejects boolean argument', t => {
	t.throws(() => {
		parser([true])
	});
	t.throws(() => {
		parser([false])
	});
});