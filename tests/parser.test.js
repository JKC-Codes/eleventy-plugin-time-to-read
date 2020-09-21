const test = require('ava');
const parser = require('../components/options-parser.js');


test('accepts valid speed arguments', t => {
	t.notThrows(()=> {
		parser(['250 words a minute']);
	});
});

test('accepts valid language arguments', t => {
	const validatorError = `The locale used in time-to-read's language option (en) is not supported`;
	try {
		parser(['en']);
		t.pass();
	}
	catch(error) {
		if(error.message === validatorError) {
			t.pass();
		}
		else {
			t.fail(error.message);
		}
	}
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

test('rejects invlaid language arguments', t => {
	t.throws(() => {
		parser(['language-foo'])
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