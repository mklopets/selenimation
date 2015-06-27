# Selenimation
Selenimation is a lightweight JavaScript and CSS library for an input box style animated display of an array.

![GIF showing Selenimation in action](http://i.imgur.com/fuuZHfE.gif)

## Usage
---
To get started with Selenimation, you only need to include the files provided in the `/selenimation` folder and a recent version of jQuery in your HTML.

*jQuery* is a requirement for Selenimation to work. These are the lines of code required in the `head`tag of your HTML for Selenimation to work:
````html
<link rel="stylesheet" href="selenimation/selenimation.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="selenimation/selenimation.js"></script>
````

### Syntax
The strings to be looped through should be put in `li` elements inside an unordered list with the `selenimation` class:
````html
<u class="selenimation">
	<li>First string</li>
	<li>Second string</li>
	<li>One more string</li>
</u>
````
### Settings
Settings can be specified in `selenimation.js` by changing the values at the beginning of the file.

* `baseTypeSpeed` - time in milliseconds between each new character being 'typed'. Default: *150*

* `baseSelectionSpeed` - time in milliseconds between each new character being 'selected'. Default: *50*

* `prefix` - string to be prepended to the animated text. Default: `''` (empty string)

* `underline` - string specifying the underline style of the animated text - `dotted | dashed | none`. Default: `dotted`

* `selectionDirection` - direction for the selection animation - `left | right`. Default: `right`

* `afterTyping` - time in milliseconds to sleep after 'typing' the last character. Default: *1000*

* `afterSelection` - time in milliseconds to sleep after 'selecting' the last character. Default: *1000*
