// Regex = 1 or more numbers + optional '.' followed by 1 or more numbers
const speedUnitAmount = String.raw`[0-9]+(\.[0-9]+)?`;

// Regex = 'character(s)' or 'word(s)'
const speedUnitMeasure = String.raw`(character|word)s?`;

// Regex = 'hour(s)' or 'minute(s)' or 'second(s)'
const speedUnitInterval = String.raw`(hour|minute|second)s?`;

// Regex = speedUnitAmount + ' ' + speedUnitMeasure + ' ' + optional anything followed by space + speedUnitInterval
const speed = String.raw`^${speedUnitAmount} ${speedUnitMeasure} (.* )*${speedUnitInterval}$`;

// Regex = '<' + optional '/' + 1 or more alphanumeric characters + a non-word character + 0 or more non-'>' characters + '>'
const htmlTags = String.raw`<\/?[a-z0-9]+\b[^>]*>`;

//Regex = '<!--' + the minimal amount of 0 or more characters + '-->'
const htmlComments = String.raw`<!--[^]*?-->`;

// Regex = htmlTags or htmlComments
const html = String.raw`${htmlTags}|${htmlComments}`;

module.exports = {
	speedUnitAmount,
	speed,
	html
}