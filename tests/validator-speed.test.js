const test = require('ava');
const validator = require('../components/options-validator.js');


// Argument types
test('accepts string as speed option', t => {
	const testArgument = '250 words a minute';
	t.is(validator({ speed: testArgument }).speed, testArgument);
});

test('rejects number as speed option', t => {
	t.throws(()=> {
		validator({ speed: 250 });
	});
});

test('rejects array as speed option', t => {
	t.throws(()=> {
		validator({ speed: ['250', 'words', 'minute'] });
	});
});

test('rejects object as speed option', t => {
	t.throws(()=> {
		validator({ speed: {number: 250}	});
	});
});

test('rejects boolean as speed option', t => {
	t.throws(()=> {
		validator({ speed: true	});
	});

	t.throws(()=> {
		validator({	speed: false });
	});
});


// Number unit
test('accepts speed number as integer', t => {
	const testArgument1 = '250 words a minute';
	const testArgument2 = '099 words a minute';
	t.is(validator({ speed: testArgument1 }).speed, testArgument1);
	t.is(validator({ speed: testArgument2 }).speed, testArgument2);
});

test('accepts speed number as decimal', t => {
	const testArgument1 = '1.5 words a minute';
	const testArgument2 = '01.9 words a minute';
	const testArgument3 = '060.07 words a minute';
	t.is(validator({ speed: testArgument1 }).speed, testArgument1);
	t.is(validator({ speed: testArgument2 }).speed, testArgument2);
	t.is(validator({ speed: testArgument3 }).speed, testArgument3);
});

test('rejects invalid speed number', t => {
	t.throws(()=> {
		validator({	speed: 'foo words a minute' });
	});

	t.throws(()=> {
		validator({	speed: '0 words a minute' });
	});

	t.throws(()=> {
		validator({	speed: '-1 words a minute' });
	});
});


// Measure unit
test('accepts \'word\' as speed measure', t => {
	const testArgument1 = '250 word a minute';
	const testArgument2 = '250 words a minute';
	t.is(validator({ speed: testArgument1 }).speed, testArgument1);
	t.is(validator({ speed: testArgument2 }).speed, testArgument2);
});

test('accepts \'character\' as speed measure', t => {
	const testArgument1 = '250 character a minute';
	const testArgument2 = '250 characters a minute';
	t.is(validator({ speed: testArgument1 }).speed, testArgument1);
	t.is(validator({ speed: testArgument2 }).speed, testArgument2);
});

test('rejects invalid speed measure', t => {
	t.throws(()=> {
		validator({	speed: '250 foo a minute' });
	});

	t.throws(()=> {
		validator({	speed: '250 wordsa a minute' });
	});

	t.throws(()=> {
		validator({	speed: '250 charascters a minute' });
	});
});


// Time unit
test('accepts \'hour\' as speed time unit', t => {
	const testArgument1 = '250 words a hour';
	const testArgument2 = '250 words a hours';
	t.is(validator({ speed: testArgument1 }).speed, testArgument1);
	t.is(validator({ speed: testArgument2 }).speed, testArgument2);
});

test('accepts \'minute\' as speed time unit', t => {
	const testArgument1 = '250 words a minute';
	const testArgument2 = '250 words a minutes';
	t.is(validator({ speed: testArgument1 }).speed, testArgument1);
	t.is(validator({ speed: testArgument2 }).speed, testArgument2);
});

test('accepts \'second\' as speed time unit', t => {
	const testArgument1 = '250 words a second';
	const testArgument2 = '250 words a seconds';
	t.is(validator({ speed: testArgument1 }).speed, testArgument1);
	t.is(validator({ speed: testArgument2 }).speed, testArgument2);
});

test('rejects invalid speed time unit', t => {
	t.throws(()=> {
		validator({	speed: '250 words a foo' });
	});

	t.throws(()=> {
		validator({	speed: '250 words a minut' });
	});

	t.throws(()=> {
		validator({	speed: '250 words a sec' });
	});
});