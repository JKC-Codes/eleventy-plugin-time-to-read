# Time To Read

An [11ty](https://www.11ty.dev/) plugin that approximates how long it would take a user to read a given text and outputs the result in your choice of language and format.

```
1 minute
3 minutes
3 minutes, 10 seconds
3 minutes and 10 seconds
3 min & 10 sec
3m, 10s
3m 10s
3 minuty i 10 sekund
३ मिनट और १० सेकंड
三分钟和一〇秒钟
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
- [Example](#example)
- [Licence](#licence)


## Installation

**Requires Node 13.0.0 or greater**
```shell
npm install eleventy-plugin-time-to-read
```


## Usage

In your [Eleventy config file](https://www.11ty.dev/docs/config/) (`.eleventy.js` by default):
```js
const timeToRead = require('eleventy-plugin-time-to-read');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(timeToRead);
}
```

Then, depending on your template engine (Liquid by default) insert the filter into your template:

```
// Liquid (.liquid) or Nunjucks (.njk):
It will take {{ 'text' | timeToRead }} to read this

// Handlebars (.hbs):
It will take {{ timeToRead 'text' }} to read this

// Javascript (.11ty.js):
It will take ${this.timeToRead('text')} to read this

// Output:
It will take 1 minute to read this
```


## Configuration

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
- Accepts: A String formatted as: Number characters/words [optional preposition] hour/minute/second

The speed to calculate the time to read with. E.g. '250 words a minute', '5 words per second'.

Can also be entered when using a filter:
```
{{ content | timeToRead: '220 words a minute' }} // Liquid

{{ content | timeToRead ('220 words a minute') }} // Nunjucks

{{ timeToRead content '220 words a minute' }} // Handlebars

${this.timeToRead(data.content, '220 words a minute')} // JavaScript
```

### Language

- Default: 'en'
- Accepts: A String representing a language supported by the [Internationalisation API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

The language to use when outputting reading times. For example:

- fr = French
- es = Spanish
- ru = Russian
- zh-hans = Simplified Chinese

Number scripts can be changed using '-u-nu-', for example:

- en = 3 minutes
- zh = 3分钟
- zh-u-nu-hanidec = 三分钟
- en-u-nu-hanidec = 三 minutes
- hi-u-nu-deva = ३ मिनट

Can also be entered when using a filter:
```
{{ content | timeToRead: 'zh-hans' }} // Liquid

{{ content | timeToRead ('zh-hans') }} // Nunjucks

{{ timeToRead content 'zh-hans' }} // Handlebars

${this.timeToRead(data.content, 'zh-hans')} // JavaScript
```

### Style

- Default: 'long'
- Accepts: 'narrow', 'short' or 'long'

The style of the text and conjunction, for example:

- long = 3 minutes and 10 seconds
- short = 3 min & 10 sec
- narrow = 3m, 10s

The exact output depends on the *language* and *type* options.

### Type

- Default: 'unit'
- Accepts: 'unit' or 'conjunction'

The type of connection between list items, for example:

- unit = 3 minutes, 10 seconds
- conjunction = 3 minutes and 10 seconds

The exact output depends on the *language* and *style* options.

### Hours

- Default: 'auto'
- Accepts: Boolean or 'auto'

Whether to show (*true*) or hide (*false*) hours. 'auto' will only display hours when they are greater than zero.

### Minutes

- Default: 'true'
- Accepts: Boolean or 'auto'

Whether to show (*true*) or hide (*false*) minutes. 'auto' will only display minutes when they are greater than zero.

### Seconds

- Default: 'false'
- Accepts: Boolean, 'auto' or 'only'

Whether to show (*true*) or hide (*false*) seconds. 'auto' will only display seconds when they are greater than zero. 'only' displays seconds without any text; overriding *hours*, *minutes* and *pre/append* options.

### Prepend

- Default: null
- Accepts: String or Null

Adds a string to the beginning of Time To Read's output, for example:

- 'About ' = About 3 minutes, 10 seconds
- '~' = ~3 minutes, 10 seconds

Does not add spaces automatically. Will not be translated.

### Append

- Default: null
- Accepts: String or Null

Adds a string to the end of Time To Read's output, for example:

- ' to read' = 3 minutes, 10 seconds to read
- '-ish' = 3 minutes, 10 seconds-ish

Does not add spaces automatically. Will not be translated.

### Digits

- Default: 1
- Accepts: An integer between 1 and 21 inclusive

The minimum number of digits to display. Will pad with 0 if not met, for example:

- 1 = 3 minutes, 10 seconds
- 2 = 03 minutes, 10 seconds
- 3 = 003 minutes, 010 seconds


## Example

How to create a blog page listing all posts with their reading times as well as include the reading time within those posts.

#### File structure:

```
_includes
└─ post.liquid
blog
├─ blog.html
└─ post.md
.eleventy.js
```

#### _includes/post.liquid

``` liquid
<header>
  <h1>{{ title }}</h1>
  <p>About {{ content | timeToRead }} to read</p>
</header>

<main>
{{ content }}
</main>
```

#### blog/blog.html

``` html
<h1>Blog</h1>

<ul>
  {%- for post in collections.blogPost %}
    <li>
      <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
      <p>{{ post.templateContent | timeToRead }}</p>
    </li>
  {%- endfor %}
</ul>
```

#### blog/post.md

``` md
---
layout: post.liquid
title: Lorem Ipsum
tags: blogPost
---
Lorem ipsum dolor sit…
```

#### .eleventy.js

``` js
const timeToRead = require('eleventy-plugin-time-to-read');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(timeToRead);
}
```


## Licence
[MPL-2.0](https://choosealicense.com/licenses/mpl-2.0/)