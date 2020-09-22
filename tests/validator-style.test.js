const test = require('ava');
const validator = require('../components/options-validator.js');


// Argument types
test('accepts string as style option', t => {
	const testArgument = 'narrow';
	t.is(validator({ style: testArgument }).style, testArgument);
});

test('rejects number as style option', t => {
	t.throws(()=> {
		validator({ style: 250 });
	});
});

test('rejects array as style option', t => {
	t.throws(()=> {
		validator({ style: ['narrow', 'short', 'long'] });
	});
});

test('rejects object as style option', t => {
	t.throws(()=> {
		validator({ style: {type: 'narrow'}	});
	});
});

test('rejects boolean as style option', t => {
	t.throws(()=> {
		validator({ style: true	});
	});

	t.throws(()=> {
		validator({	style: false });
	});
});


// Argument values
test('accepts \'narrow\' as style', t => {
	const testArgument = 'narrow';
	t.is(validator({ style: testArgument }).style, testArgument);
});

test('accepts \'short\' as style', t => {
	const testArgument = 'short';
	t.is(validator({ style: testArgument }).style, testArgument);
});

test('accepts \'long\' as style', t => {
	const testArgument = 'long';
	t.is(validator({ style: testArgument }).style, testArgument);
});

test('rejects invalid styles', t => {
	t.throws(()=> {
		validator({	style: 'foo' });
	});

	t.throws(()=> {
		validator({	style: '' });
	});

	t.throws(()=> {
		validator({	style: 'narro' });
	});
});