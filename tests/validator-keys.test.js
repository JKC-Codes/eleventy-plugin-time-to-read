const test = require('ava');
const validator = require('../components/options-validator.js');

test('rejects invalid keys', t => {
	t.throws(()=> {
		validator({ foo: 'bar' });
	});

	t.throws(()=> {
		validator({ hour: 'auto' });
	});

	t.throws(()=> {
		validator({ digit: 2 });
	});
});