const test = require('ava');
const validator = require('../components/options-validator.js');


// Argument types
test('accepts language code as language', t => {
	const testArgument1 = 'en';
	const testArgument2 = 'en-gb';
	const testArgument3 = 'zh-hans';
	const testArgument4 = 'zh-u-nu-hanidec';
	t.is(validator({ language: testArgument1 }).language, testArgument1);
	t.is(validator({ language: testArgument2 }).language, testArgument2);
	t.is(validator({ language: testArgument3 }).language, testArgument3);
	t.is(validator({ language: testArgument4 }).language, testArgument4);
});

test('rejects unsupported language code as language', t => {
	t.throws(()=> {
		validator({ language: 'foo' });
	});
});

test('rejects invalid language code as language', t => {
	t.throws(()=> {
		validator({ language: '123' });
	});
});

test('rejects number as language option', t => {
	t.throws(()=> {
		validator({ language: 250 });
	});
});

test('rejects array as language option', t => {
	t.throws(()=> {
		validator({ language: ['en', 'zh'] });
	});
});

test('rejects object as language option', t => {
	t.throws(()=> {
		validator({ language: {country: 'en'}	});
	});
});

test('rejects boolean as language option', t => {
	t.throws(()=> {
		validator({ language: true	});
	});

	t.throws(()=> {
		validator({	language: false });
	});
});