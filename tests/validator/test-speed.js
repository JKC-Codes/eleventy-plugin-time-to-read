const test = require('ava');

test.todo('accepts string as speed option');

test.todo('rejects non-string as speed option');


test.todo('accepts speed number as integer');

test.todo('accepts speed number as decimal');

test.todo('rejects speed number less than or equal to 0');


test.todo('accepts "characters" as speed unit');

test.todo('accepts "words" as speed unit');

test.todo('rejects invalid speed units');


test.todo('accepts "hours" as speed interval');

test.todo('accepts "minutes" as speed interval');

test.todo('accepts "seconds" as speed interval');

test.todo('rejects invalid speed interval');