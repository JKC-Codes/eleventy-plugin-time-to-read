const test = require('ava');
const validator = require('../components/options-validator.js');


test('accepts String as insert', t => {
	const testArgument1 = 'foo';
	const testArgument2 = '';
	t.is(validator({ prepend: testArgument1 }).prepend, testArgument1);
	t.is(validator({ append: testArgument1 }).append, testArgument1);

	t.is(validator({ prepend: testArgument2 }).prepend, testArgument2);
	t.is(validator({ append: testArgument2 }).append, testArgument2);
});

test('accepts Number as insert', t => {
	const testArgument = 123;
	t.is(validator({ prepend: testArgument }).prepend, testArgument);
	t.is(validator({ append: testArgument }).append, testArgument);
});

test('accepts Null as insert', t => {
	const testArgument = null;
	t.is(validator({ prepend: testArgument }).prepend, testArgument);
	t.is(validator({ append: testArgument }).append, testArgument);
});


test('rejects invalid insert argument types', t => {
	t.throws(()=> {
		validator({ append: ['foo', 'bar'] });
	});
	t.throws(()=> {
		validator({ prepend: ['foo', 'bar'] });
	});

	t.throws(()=> {
		validator({ append: {text: 'foo'}	});
	});
	t.throws(()=> {
		validator({ prepend: {text: 'foo'} });
	});

	t.throws(()=> {
		validator({ prepend: true	});
	});
	t.throws(()=> {
		validator({ append: true });
	});

	t.throws(()=> {
		validator({ prepend: false });
	});
	t.throws(()=> {
		validator({ append: false	});
	});
});