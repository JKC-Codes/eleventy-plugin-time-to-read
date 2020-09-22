const test = require('ava');
const validator = require('../components/options-validator.js');


test('accepts \'unit\' as type', t => {
	const testArgument = 'unit';
	t.is(validator({ type: testArgument }).type, testArgument);
});

test('accepts \'conjunction\' as type', t => {
	const testArgument = 'conjunction';
	t.is(validator({ type: testArgument }).type, testArgument);
});

test('rejects invalid types', t => {
	t.throws(()=> {
		validator({	type: 'foo' });
	});

	t.throws(()=> {
		validator({	type: '' });
	});

	t.throws(()=> {
		validator({	type: 'con' });
	});
});


test('rejects invalid type argument types', t => {
	t.throws(()=> {
		validator({ type: 250 });
	});

	t.throws(()=> {
		validator({ type: ['unit', 'conjunction'] });
	});

	t.throws(()=> {
		validator({ type: {list: 'unit'} });
	});

	t.throws(()=> {
		validator({ type: null });
	});

	t.throws(()=> {
		validator({ type: true });
	});

	t.throws(()=> {
		validator({	type: false });
	});
});