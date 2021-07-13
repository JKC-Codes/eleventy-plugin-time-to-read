const test = require('ava');
const validator = require('../components/options-validator.js');


test('accepts True as label', t => {
	const testArgument = true;

	t.is(validator({ hours: testArgument }).hours, testArgument);
	t.is(validator({ minutes: testArgument }).minutes, testArgument);
	t.is(validator({ seconds: testArgument }).seconds, testArgument);
});

test('accepts False as label', t => {
	const testArgument = false;

	t.is(validator({ hours: testArgument }).hours, testArgument);
	t.is(validator({ minutes: testArgument }).minutes, testArgument);
	t.is(validator({ seconds: testArgument }).seconds, testArgument);
});

test(`accepts 'auto' as label`, t => {
	const testArgument = 'auto';

	t.is(validator({ hours: testArgument }).hours, testArgument);
	t.is(validator({ minutes: testArgument }).minutes, testArgument);
	t.is(validator({ seconds: testArgument }).seconds, testArgument);
});

test('rejects invalid labels', t => {
	t.throws(()=> {
		validator({	hours: 'foo' });
	});

	t.throws(()=> {
		validator({	minutes: 'foo' });
	});

	t.throws(()=> {
		validator({	seconds: 'foo' });
	});

	t.throws(()=> {
		validator({	hours: '' });
	});

	t.throws(()=> {
		validator({	minutes: '' });
	});

	t.throws(()=> {
		validator({	seconds: '' });
	});

	t.throws(()=> {
		validator({	hours: 1 });
	});

	t.throws(()=> {
		validator({	minutes: 1 });
	});

	t.throws(()=> {
		validator({	seconds: 1 });
	});
	t.throws(()=> {
		validator({	hours: 0 });
	});

	t.throws(()=> {
		validator({	minutes: 0 });
	});

	t.throws(()=> {
		validator({	seconds: 0 });
	});
});


test('rejects invalid label argument types', t => {
	t.throws(()=> {
		validator({ hours: 250 });
	});
	t.throws(()=> {
		validator({ minutes: 250 });
	});
	t.throws(()=> {
		validator({ seconds: 250 });
	});

	t.throws(()=> {
		validator({ hours: [true, false] });
	});
	t.throws(()=> {
		validator({ minutes: [true, false] });
	});
	t.throws(()=> {
		validator({ seconds: [true, false] });
	});

	t.throws(()=> {
		validator({ hours: {display: 'auto'} });
	});
	t.throws(()=> {
		validator({ minutes: {display: 'auto'} });
	});
	t.throws(()=> {
		validator({ seconds: {display: 'auto'} });
	});
});


// Deprecated, remove in 2.0 major release
test(`accepts 'only' as seconds`, t => {
	const testArgument = 'only';
	t.is(validator({ seconds: testArgument }).seconds, testArgument);
	t.throws(()=> {
		validator({	hours: testArgument });
	});
	t.throws(()=> {
		validator({	minutes: testArgument });
	});
});