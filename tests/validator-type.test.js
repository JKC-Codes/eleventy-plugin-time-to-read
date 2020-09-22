const test = require('ava');
const validator = require('../components/options-validator.js');


// Argument types
test('accepts string as type option', t => {
	const testArgument = 'unit';
	t.is(validator({ type: testArgument }).type, testArgument);
});

test('rejects number as type option', t => {
	t.throws(()=> {
		validator({ type: 250 });
	});
});

test('rejects array as type option', t => {
	t.throws(()=> {
		validator({ type: ['unit', 'conjunction'] });
	});
});

test('rejects object as type option', t => {
	t.throws(()=> {
		validator({ type: {list: 'unit'}	});
	});
});

test('rejects boolean as type option', t => {
	t.throws(()=> {
		validator({ type: true	});
	});

	t.throws(()=> {
		validator({	type: false });
	});
});


// Argument values
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