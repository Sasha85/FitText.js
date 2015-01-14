/*!	
* FitText.js 1.0 jQuery free version
*
* Copyright 2011, Dave Rupert http://daverupert.com 
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
* Modified by Slawomir Kolodziej http://slawekk.info
* Modified by Aleksander Efremov
*/
(function() {
	var	addEvent,
			removeEvent,
			resizeTimeout,
			extend = function (obj, ext) {
				for (var key in ext) {
					if (ext.hasOwnProperty(key)) {
						obj[key] = ext[key];
					}
				}

				return obj;
		};

	if (window.addEventListener) {	
		addEvent = function (el, type, handler) {
			el.addEventListener(type, handler);
		};
	} else {	
		addEvent = function (el, type, handler) {
			el.attachEvent("on" + type, handler);
		};
	}

	window.fitText = function (el, compressor, options) {
		var settings = extend({
			minFontSize: -1 / 0,
			maxFontSize: 1 / 0
		}, options);

		var fit = function (el) {
			var compressor = compressor || 1;

			// Look at https://developer.mozilla.org/en-US/docs/Web/Events/resize
			var resizer = function () {
				if (resizeTimeout) return;

				resizeTimeout = setTimeout(function () {
					el.style.fontSize = Math.max(Math.min(el.clientWidth / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + 'px';
					resizeTimeout = null;
				}, 100);
			};

			// Call once to set.
			resizer();

			// Bind events
			// If you have any js library which support Events, replace this part
			// and remove addEvent function (or use original jQuery version)
			addEvent(window, 'resize', resizer);
		};

		if (el.length) {
			for(var i = 0; i < el.length; i++) {
				fit(el[i]);
			}
		} else {				
			fit(el);
		}

		// Return set of elements
		return el;
	};
})();
