const test = require('ava');
const validator = require('../components/options-validator.js');


test(`accepts 'narrow' as style`, t => {
	const testArgument = 'narrow';

	t.is(validator({ style: testArgument }).style, testArgument);
});

test(`accepts 'short' as style`, t => {
	const testArgument = 'short';

	t.is(validator({ style: testArgument }).style, testArgument);
});

test(`accepts 'long' as style`, t => {
	const testArgument = 'long';

	t.is(validator({ style: testArgument }).style, testArgument);
});

test('rejects invalid style strings', t => {
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


test('rejects invalid style argument types', t => {
	t.throws(()=> {
		validator({ style: 250 });
	});
	t.throws(()=> {
		validator({ style: ['narrow', 'short', 'long'] });
	});

	t.throws(()=> {
		validator({ style: {type: 'narrow'}	});
	});

	t.throws(()=> {
		validator({ style: true	});
	});

	t.throws(()=> {
		validator({	style: false });
	});
});