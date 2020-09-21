const test = require('ava');
const parser = require('../components/options-parser.js');


test('accepts valid speed arguments', t => {
	t.notThrows(()=> {
		parser(['250 words a minute']);
	});
});

test('accepts valid language arguments', t => {
	t.notThrows(()=> {
		parser(['en']);
	});
});

test('accepts object arguments', t => {
	t.notThrows(()=> {
		parser([{
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
		}]);
	});
});

test('rejects invalid speed arguments', t => {
	t.throws(() => {
		parser(['99 chars min'])
	});
});

test('rejects invalid language arguments', t => {
	t.throws(() => {
		parser(['en_us'])
	});
});

test('rejects array arguments', t => {
	t.throws(() => {
		parser([['250 words per minute', 'en']])
	});
});

test('rejects number arguments', t => {
	t.throws(() => {
		parser([123])
	});
});

test('rejects boolean arguments', t => {
	t.throws(() => {
		parser([true])
	});
	t.throws(() => {
		parser([false])
	});
});

test('returns arguments as an object', t => {
	const speedTest = parser(['250 words a minute']);
	const languageTest = parser(['en']);
	const objectTest = parser(['1000 characters per hour', 'hi']);

	t.is(typeof objectTest, 'object');
	t.is(speedTest.speed, '250 words a minute');
	t.is(languageTest.language, 'en');
	t.is(objectTest.speed, '1000 characters per hour');
	t.is(objectTest.language, 'hi');
});