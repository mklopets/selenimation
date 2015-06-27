$(function() {
	var list = [], // strings to loop through will be put into this
		animate = true,
		baseTypeSpeed = 150,
		baseSelectionSpeed = 50,
		listIndex = 0,
		typeIndex = 0,
		container,
		// prefix = 'for example, ', // string prepended to all animated strings
		prefix = '', // set to empty string for no prefix
		afterTyping = 1000,
		afterSelection = 1000,
		selectionDirection = 'right',
		underline = 'dotted';


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
			if (underline == 'dotted') {
				$(container).html(prefix + '<span class="selenimation-progress-dotted">' + currentlyTyped + '</span>');
			}
			else if (underline == 'dashed') {
				$(container).html(prefix + '<span class="selenimation-progress-dashed">' + currentlyTyped + '</span>');
			}
			else {
				$(container).html(prefix + currentlyTyped);
			}

			// wait before typing the next character
			var timeout = window.setTimeout(function() {
				return typeString(listIndex, position + 1);
			}, baseTypeSpeed);
		}
		else if (position == length) {
			// finished typing string
			
			// starts selecting the freshly-written string after afterTyping ms
			window.setTimeout(function() {
				selectString(listIndex, 0);
				return true;
			}, afterTyping);
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
		if (position < length + 1 && (selectionDirection == 1 || selectionDirection == 'right')) {
			var currentlySelected = currentString.substring(0, position),
				restOfString = currentString.substring(position);

			resetContainer();

			$(container).append('<span class="selenimation-highlighted">' + currentlySelected + '</span>' + prepareRestOfString(restOfString));

			// wait before selecting next character
			var timeout = window.setTimeout(function() {
				return selectString(listIndex, position + 1);
			}, baseSelectionSpeed);

		}

		// right to left selection direction
		else if (position < length + 1 && (selectionDirection == 1 || selectionDirection == 'left')) {
			var currentlySelected = currentString.substring(length - position),
				restOfString = currentString.substring(0, length - position);

			resetContainer();
			$(container).append(prepareRestOfString(restOfString) + '<span class="selenimation-highlighted">' + currentlySelected + '</span>');

			// wait before selecting next character
			var timeout = window.setTimeout(function() {
				return selectString(listIndex, position + 1);
			}, baseSelectionSpeed);

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
			}, afterSelection);

		}
	}

	/*
	 * wraps not-yet-selected part of string in span according to underline settings
	 */
	function prepareRestOfString(restOfString) {
		if (underline == 'dotted') {
			return '<span class="selenimation-progress-dotted">' + restOfString + '</span>';
		}
		else if (underline == 'dashed') {
			return '<span class="selenimation-progress-dashed">' + restOfString + '</span>';
		}
		else {
			return restOfString;
		}
	}

	function resetContainer() {
		$(container).text(prefix);
	}


})