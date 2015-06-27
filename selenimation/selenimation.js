$(function() {
	var list = [], // strings to loop through will be put into this
		animate = true,
		listIndex = 0,
		typeIndex = 0,
		container,

		config = {
		baseTypeSpeed: 150,
		baseSelectionSpeed: 50,
		prefix: '',
		afterTyping: 1000,
		afterSelection: 1000,
		selectionDirection: 'right',
		underline: 'dotted'
	};

	// saves & removes strings from DOM
	$('ul.selenimation li').each(function() {
		list.push($(this).html())
		$(this).remove();
	});
	container = $('ul.selenimation').parent();
	$('ul.selenimation').remove();


	if (list) {
		typeString(0, 0);
	}


	/*
	 * recursively adds characters from currentString to 'container' element
	 */
	function typeString(listIndex, position) {
		var currentString = list[listIndex],
			length = currentString.length;
		if (position < length) {
			var character = currentString[position];


			var currentlyTyped = currentString.substring(0, position + 1);
			resetContainer();

			// handle different underlining options
			if (config.underline == 'dotted') {
				$(container).html(config.prefix + '<span class="selenimation-progress-dotted">' + currentlyTyped + '</span>');
			}
			else if (config.underline == 'dashed') {
				$(container).html(config.prefix + '<span class="selenimation-progress-dashed">' + currentlyTyped + '</span>');
			}
			else {
				$(container).html(config.prefix + currentlyTyped);
			}

			// wait before typing the next character
			var timeout = window.setTimeout(function() {
				return typeString(listIndex, position + 1);
			}, config.baseTypeSpeed);
		}
		else if (position == length) {
			// finished typing string
			
			// starts selecting the freshly-written string after afterTyping ms
			window.setTimeout(function() {
				selectString(listIndex, 0);
				return true;
			}, config.afterTyping);
		}
		else {
			return true;
		}

	}


	/*
	 * imitates animated text selection
	 * recurisvely wrap characters from either end of string inside span.selenimation-highlighted
	 */
	function selectString(listIndex, position) {
		var currentString = list[listIndex],
			length = currentString.length;


		// left to right selection direction
		if (position < length + 1 && (config.selectionDirection == 1 || config.selectionDirection == 'right')) {
			var currentlySelected = currentString.substring(0, position),
				restOfString = currentString.substring(position);

			resetContainer();

			$(container).append('<span class="selenimation-highlighted">' + currentlySelected + '</span>' + prepareRestOfString(restOfString));

			// wait before selecting next character
			var timeout = window.setTimeout(function() {
				return selectString(listIndex, position + 1);
			}, config.baseSelectionSpeed);

		}

		// right to left selection direction
		else if (position < length + 1 && (config.selectionDirection == 1 || config.selectionDirection == 'left')) {
			var currentlySelected = currentString.substring(length - position),
				restOfString = currentString.substring(0, length - position);

			resetContainer();
			$(container).append(prepareRestOfString(restOfString) + '<span class="selenimation-highlighted">' + currentlySelected + '</span>');

			// wait before selecting next character
			var timeout = window.setTimeout(function() {
				return selectString(listIndex, position + 1);
			}, config.baseSelectionSpeed);

		}


		else {
			// next word, come at me! -this block of code, ca 2015
			
			// starts typing the next string after afterSelection ms
			window.setTimeout(function() {
				resetContainer();

				// if hasn't reached end of list
				if (listIndex < list.length - 1) {
					// move on to the next string to type out
					return typeString(listIndex + 1, 0);
				}
				else {
					// start typing the first entry of the strings' list again
					return typeString(0, 0);
				}				
			}, config.afterSelection);

		}
	}

	/*
	 * wraps not-yet-selected part of string in span according to underline settings
	 */
	function prepareRestOfString(restOfString) {
		if (config.underline == 'dotted') {
			return '<span class="selenimation-progress-dotted">' + restOfString + '</span>';
		}
		else if (config.underline == 'dashed') {
			return '<span class="selenimation-progress-dashed">' + restOfString + '</span>';
		}
		else {
			return restOfString;
		}
	}

	function resetContainer() {
		$(container).text(config.prefix);
	}


})