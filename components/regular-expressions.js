// Regex = 1 or more numbers
const speedUnitAmount = String.raw`[0-9]+(\.[0-9]+)?`;

// Regex = 'characters' or 'words'
const speedUnitMeasure = String.raw`(character|word)s?`;

// Regex = 'per' or 'a' or 'an'
const speedUnitPreposition = String.raw`(per|a|an)`;

// Regex = 'hour' or 'minute' or 'second'
const speedUnitInterval = String.raw`(hour|minute|second)s?`;

// Regex = speedUnitAmount + ' ' + speedUnitMeasure + ' ' + optional speedUnitPreposition + speedUnitInterval
const speed = String.raw`^${speedUnitAmount} ${speedUnitMeasure} (${speedUnitPreposition} )?${speedUnitInterval}$`;

// Regex = '<' + optional '/' + 1 or more alphanumeric characters + a non-word character + 0 or more non-'>' characters + '>'
const htmlTags = String.raw`<\/?[a-z0-9]+\b[^>]*>`;

//Regex = '<!--' + the minimal amount of 0 or more characters + '-->'
const htmlComments = String.raw`<!--[^]*?-->`;

// Regex = htmlTags or htmlComments
const html = String.raw`${htmlTags}|${htmlComments}`;

module.exports = {
	speedUnitAmount,
	speedUnitMeasure,
	speedUnitPreposition,
	speedUnitInterval,
	speed,
	htmlTags,
	htmlComments,
	html
}