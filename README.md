# Time To Read

An [11ty](https://www.11ty.dev/) plugin that approximates how long it would take a user to read a given text and outputs the result in your choice of language.

```
1 minute
3 minutes
1 min
3m
3 minutos
3 मिनट
3 минуты
三分钟
```

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
	- [Speed](#speed)
	- [Language](#language)
	- [Style](#style)
	- [Type](#type)
	- [Hours](#hours)
	- [Minutes](#minutes)
	- [Seconds](#seconds)
	- [Prepend](#prepend)
	- [Append](#append)
	- [Digits](#digits)
- [Examples](#examples)


## Installation

```shell
npm install eleventy-plugin-time-to-read
```

**Note: requires Node 13.0.0 or greater**


## Usage

In your [Eleventy config file](https://www.11ty.dev/docs/config/) (`.eleventy.js` by default):
```js
const time-to-read = require('eleventy-plugin-time-to-read');

module.exports = function(eleventyConfig) {
	// other config options
	eleventyConfig.addPlugin(time-to-read);
	// other config options
}
```

Then, depending on your template engine (11ty uses Liquid by default) insert the filter into your template:

Liquid or Nunjucks:
```liquid
It will take {{ text | timeToRead }} to read this
```

Handlebars:
```handlebars
It will take {{ timeToRead text }} to read this
```

Javascript:
```js
module.exports = function({text}) {
	return `It will take ${this.timeToRead(text)} to read this`;
};
```

Output:
```html
It will take 6 minutes to read this
```


## Configuration

Time To Read accepts a number of configuration options as an object.

```js
const timeToRead = require('eleventy-plugin-time-to-read');

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(timeToRead, {
		speed: '1000 characters per minute',
		language: 'en',
		style: 'long',
		type: 'unit',
		hours: 'auto',
		minutes: true,
		seconds: false,
		prepend: null,
		append: null,
		digits: 1,
	});
}
```

### Speed

- Default: '1000 characters per minute'
- Accepts: String formatted as: [Number] ['characters' or 'words'] [optional 'per', 'a' or 'an'] ['hour', 'minute' or 'second']

The speed to calculate the time to read with. E.g. '250 words a minute', '5 words per second'.

Can also be entered when using a filter:
```liquid
{{ post.templateContent | timeToRead: '220 words a minute' }}
```

### Language
- Default: 'en'
- Accepts: A string with a [Unicode BCP 47 language identifier](https://www.unicode.org/reports/tr35/tr35.html#BCP_47_Conformance). E.g. 'en', 'es', 'fr', 'ru', 'hi', 'zh'.

The language to use when outputting reading times, for example:

- fr = French
- es = Spanish
- ru = Russian
- zh-hans = Simplified Chinese
- de-AT = German as used in Austria

Can also change the number script by using '-u-nu-':

- en = 3 minutes
- zh = 3分钟
- zh-u-nu-hanidec = 三分钟
- en-u-nu-hanidec = 三 minutes

Accepts any language supported by your Node version's [Internationalisation API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

Can also be entered when using a filter:
```liquid
{{ post.templateContent | timeToRead: 'fr' }}
```

### Style

- Default: 'long'
- Accepts: 'narow', 'short' or 'long'

The style of the speed unit text and conjunction. E.g. 'm', 'min' or 'minute'; 's', 'sec' or 'second'; '&' or 'and'.

The exact output depends on the language and type options. Some options may output the same value.

### Type

- Default: 'unit'
- Accepts: 'unit' or 'conjunction'

Whether to style as a list of units or a generic list. E.g. '1 minute, 10 seconds', '1 minute and 10 seconds', '1 min, 10 secs', '1 min & 10 secs'

The exact output depends on the language and style options. Some options may output the same value.

### Hours

- Default: 'auto'
- Accepts: True, False or 'auto'

Whether to show (True) or hide (False) hours. Auto will only display hours when they are greater than zero.

### Minutes

- Default: 'True'
- Accepts: True, False or 'auto'

Whether to show (True) or hide (False) minutes. Auto will only display minutes when they are greater than zero.

### Seconds

- Default: 'False'
- Accepts: True, False, 'auto' or 'only'

Whether to show (True) or hide (False) seconds. Auto will only display seconds when they are greater than zero.

Only will display the seconds without a label and hide all other text including other time units, the 'seconds' label and any pre/appends. E.g. 10, 37, 454

### Prepend

- Default: null
- Accepts: String or Null

Adds a string to the beginning of Time To Read's output. E.g. 'About 3 minutes', '~3 minutes'

Does not add spaces automatically. Will not be translated.

### Append

- Default: null
- Accepts: String or Null

Adds a string to the end of Time To Read's output. E.g. '3 minutes to read', '3 minutes-ish'

Does not add spaces automatically. Will not be translated.

### Digits

- Default: 1
- Accepts: Number between 1 and 21 inclusive

The minimum number of digits to display. Will pad with 0 if not met. E.g. '01 minute', '07 minutes'


## Examples

### Blog posts listing
```
---
layout: base
---

<h1>Blog Posts</h1>

<ul>
	{%- for post in collections.posts %}
		<li>
			<h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
			<p>About {{ post.templateContent | timeToRead }} to read</p>
		</li>
	{%- endfor %}
</ul>
```

Output:
```html
<h1>Blog Posts</h1>

<ul>
	<li>
		<h2><a href="example.com/blog/post1">Post 1</a></h2>
		<p>About 6 minutes to read</p>
	</li>
	<li>
		<h2><a href="example.com/blog/post2">Post 2</a></h2>
		<p>About 1 minute to read</p>
	</li>
</ul>
```

### Individual Articles Template
```
---
layout: base
---

<header>
	<h1>{{ title }}</h1>
	<p>{{ content | timeToRead }}</p>
</header>

{{ content }}
```

Output:
```
<header>
	<h1>An Article</h1>
	<p>9 minutes</p>
</header>

Lorem ipsum dolor sit…
```

## License
[GNU GPLv3 ](https://choosealicense.com/licenses/gpl-3.0/)