const test = require('ava');
const validator = require('../components/options-validator.js');


test('accepts integer from 1-21 as digits', t => {
	const testArgument1 = 1;
	const testArgument2 = 2;
	const testArgument3 = 21;

	t.is(validator({ digits: testArgument1 }).digits, testArgument1);
	t.is(validator({ digits: testArgument2 }).digits, testArgument2);
	t.is(validator({ digits: testArgument3 }).digits, testArgument3);
});

test('rejects invalid digits', t => {
	t.throws(()=> {
		validator({	digits: 0 });
	});

	t.throws(()=> {
		validator({	digits: -1 });
	});

	t.throws(()=> {
		validator({	digits: 22 });
	});

	t.throws(()=> {
		validator({	digits: 1.5 });
	});

	t.throws(()=> {
		validator({	digits: 0.9 });
	});
});


test('rejects invalid digits argument types', t => {
	t.throws(()=> {
		validator({ digits: 'two' });
	});

	t.throws(()=> {
		validator({ digits: [1, 2] });
	});

	t.throws(()=> {
		validator({ digits: {padding: 2} });
	});

	t.throws(()=> {
		validator({ digits: null });
	});

	t.throws(()=> {
		validator({ digits: true });
	});

	t.throws(()=> {
		validator({	digits: false });
	});
});