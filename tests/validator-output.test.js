const test = require('ava');
const validator = require('../components/options-validator.js');


test('accepts a Function as output', t => {
	const testArgument1 = function(data) { return data.timing; };

	t.is(validator({ output: testArgument1 }).output, testArgument1);
});

test('rejects invalid output argument types', t => {
	t.throws(()=> {
		validator({ output: 'foo' });
	});

	t.throws(()=> {
		validator({ output: 123 });
	});

	t.throws(()=> {
		validator({ output: ['foo', 'bar'] });
	});

	t.throws(()=> {
		validator({ output: {foo: 'bar'} });
	});

	t.throws(()=> {
		validator({ output: true });
	});

	t.throws(()=> {
		validator({ output: false });
	});
});