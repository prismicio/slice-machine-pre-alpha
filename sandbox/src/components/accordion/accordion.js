'use strict'
// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
	Array.from = (function() {
		var toStr = Object.prototype.toString
		var isCallable = function(fn) {
			return typeof fn === 'function' || toStr.call(fn) === '[object Function]'
		}
		var toInteger = function(value) {
			var number = Number(value)
			if (isNaN(number)) {
				return 0
			}
			if (number === 0 || !isFinite(number)) {
				return number
			}
			return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number))
		}
		var maxSafeInteger = Math.pow(2, 53) - 1
		var toLength = function(value) {
			var len = toInteger(value)
			return Math.min(Math.max(len, 0), maxSafeInteger)
		}

		// The length property of the from method is 1.
		return function from(arrayLike /*, mapFn, thisArg */) {
			// 1. Let C be the this value.
			var C = this

			// 2. Let items be ToObject(arrayLike).
			var items = Object(arrayLike)

			// 3. ReturnIfAbrupt(items).
			if (arrayLike == null) {
				throw new TypeError(
					'Array.from requires an array-like object - not null or undefined'
				)
			}

			// 4. If mapfn is undefined, then let mapping be false.
			var mapFn = arguments.length > 1 ? arguments[1] : void undefined
			var T
			if (typeof mapFn !== 'undefined') {
				// 5. else
				// 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
				if (!isCallable(mapFn)) {
					throw new TypeError(
						'Array.from: when provided, the second argument must be a function'
					)
				}

				// 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
				if (arguments.length > 2) {
					T = arguments[2]
				}
			}

			// 10. Let lenValue be Get(items, "length").
			// 11. Let len be ToLength(lenValue).
			var len = toLength(items.length)

			// 13. If IsConstructor(C) is true, then
			// 13. a. Let A be the result of calling the [[Construct]] internal method
			// of C with an argument list containing the single item len.
			// 14. a. Else, Let A be ArrayCreate(len).
			var A = isCallable(C) ? Object(new C(len)) : new Array(len)

			// 16. Let k be 0.
			var k = 0
			// 17. Repeat, while k < len… (also steps a - h)
			var kValue
			while (k < len) {
				kValue = items[k]
				if (mapFn) {
					A[k] =
						typeof T === 'undefined'
							? mapFn(kValue, k)
							: mapFn.call(T, kValue, k)
				} else {
					A[k] = kValue
				}
				k += 1
			}
			// 18. Let putStatus be Put(A, "length", len, true).
			A.length = len
			// 20. Return A.
			return A
		}
	})()
}

if (typeof Object.assign != 'function') {
	// Must be writable: true, enumerable: false, configurable: true
	Object.defineProperty(Object, 'assign', {
		value: function assign(target, varArgs) {
			// .length of function is 2

			if (target == null) {
				// TypeError if undefined or null
				throw new TypeError('Cannot convert undefined or null to object')
			}

			var to = Object(target)

			for (var index = 1; index < arguments.length; index++) {
				var nextSource = arguments[index]

				if (nextSource != null) {
					// Skip over if undefined or null
					for (var nextKey in nextSource) {
						// Avoid bugs when hasOwnProperty is shadowed
						if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
							to[nextKey] = nextSource[nextKey]
						}
					}
				}
			}
			return to
		},
		writable: true,
		configurable: true
	})
}
// add utilities
var util = {
	keyCodes: {
		UP: 38,
		DOWN: 40,
		LEFT: 37,
		RIGHT: 39,
		HOME: 36,
		END: 35,
		ENTER: 13,
		SPACE: 32,
		DELETE: 46,
		TAB: 9
	},

	generateID: function(base) {
		return base + Math.floor(Math.random() * 999)
	},

	getDirectChildren: function(elm, selector) {
		return Array.prototype.filter.call(elm.children, function(child) {
			return child.matches(selector)
		})
	}
}

;(function(w, doc, undefined) {
	var ARIAaccOptions = {
		showOneAnswerAtATime: true,
		allCollapsed: true,
		withControls: true,

		// the following needs to be an SVG icon
		// we will be dynamically inserting this icon into the buttons in this script
		// make sure you add the class `accordion-icon` to it
		icon:
			'<svg class="accordion-icon" width="12" height="8" aria-hidden="true" focusable="false" viewBox="0 0 12 8"><g fill="none"><path fill="#000" d="M1.41.59l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z"/><path d="M-6-8h24v24h-24z"/></g></svg>'
	}
	/**
	 * ARIA Accordion
	 * Creates a tab list to toggle the visibility of
	 * different subsections of a document.
	 *
	 * Author: Sara Soueidan
	 * Version: 0.2.0
	 */

	var ARIAaccordion = function(inst, options) {
		var _options = Object.assign(ARIAaccOptions, options)
		var el = inst
		var accordionHeadings = el.querySelectorAll('[data-accordion-heading]')
		var accordionPanels = el.querySelectorAll('[data-accordion-panel]')
		var controlsWrapper
		var expandButton
		var collapseButton
		var accID = util.generateID('c-accordion-')

		var init = function() {
			// if you have any functionality in CSS that needs JS to be activated
			// this class added to the accordion container works as a JS hook to announce JS is enabled
			// in the CSS, we have a part that adds borders and paddings to the headings, buttons and panels
			// these borders and padding are only needed if the content turns into an accordion
			el.classList.add('accordion-js')

			setupAccordionHeadings(accordionHeadings)
			setupAccordionPanels(accordionPanels)

			if (_options.withControls) {
				createControls()
			}
		}

		var createControls = function() {
			controlsWrapper = document.createElement('div')
			controlsWrapper.setAttribute('data-accordion-controls', '')
			el.prepend(controlsWrapper)

			expandButton = document.createElement('button')
			expandButton.setAttribute('data-accordion-control', 'expand')
			expandButton.setAttribute('aria-label', 'Expand all panels')
			expandButton.innerText = 'Expand All'
			controlsWrapper.appendChild(expandButton)

			collapseButton = document.createElement('button')
			collapseButton.setAttribute('data-accordion-control', 'collapse')
			collapseButton.setAttribute('aria-label', 'Collapse all panels')
			collapseButton.innerText = 'collapse All'
			controlsWrapper.appendChild(collapseButton)

			// if we start out with an accordion whose panels are collapsed (as opposed to open)
			// disable the Collapse All button
			if (_options.allCollapsed) disableCollapseButton()

			setupAccordionControls()
		}

		var setupAccordionControls = function() {
			expandButton.addEventListener('click', function() {
				// expand them all

				Array.from(accordionHeadings).forEach(function(item, index) {
					item.querySelector('button').setAttribute('aria-expanded', 'true')
				})

				Array.from(accordionPanels).forEach(function(item, index) {
					item.setAttribute('aria-hidden', 'false')
				})

				disableExpandButton()
				enableCollapseButton()
			})

			collapseButton.addEventListener('click', function() {
				Array.from(accordionHeadings).forEach(function(item, index) {
					item.querySelector('button').setAttribute('aria-expanded', 'false')
				})

				Array.from(accordionPanels).forEach(function(item, index) {
					item.setAttribute('aria-hidden', 'true')
				})

				disableCollapseButton()
				enableExpandButton()
			})
		}

		var setupAccordionHeadings = function(accordionHeadings) {
			Array.from(accordionHeadings).forEach(function(item, index) {
				var $this = item

				let text = $this.innerText
				let headingButton = document.createElement('button')
				headingButton.setAttribute('aria-expanded', 'false')
				headingButton.setAttribute('data-accordion-toggle', '')
				headingButton.setAttribute('id', accID + '__heading-' + index)
				headingButton.setAttribute('aria-controls', accID + '__panel-' + index)
				headingButton.innerText = text

				$this.innerHTML = ''

				$this.appendChild(headingButton)
				headingButton.innerHTML += _options.icon

				headingButton.addEventListener('click', function(e) {
					togglePanel(headingButton)
				})
			})
		}

		var setupAccordionPanels = function(accordionPanels) {
			Array.from(accordionPanels).forEach(function(item, index) {
				let $this = item

				$this.setAttribute('id', accID + '__panel-' + index)
				$this.setAttribute('aria-labelledby', accID + '__heading-' + index)
				$this.setAttribute('aria-hidden', 'true')
			})
		}

		var togglePanel = function(toggleButton) {
			var thepanel = toggleButton.parentNode.nextElementSibling

			if (toggleButton.getAttribute('aria-expanded') == 'true') {
				toggleButton.setAttribute('aria-expanded', 'false')
				thepanel.setAttribute('aria-hidden', 'true')

				checkToggleCollapseButtonState()
				checkToggleExpandButtonState()
			} else {
				if (_options.showOneAnswerAtATime) {
					// Hide all answers
					Array.from(accordionPanels).forEach(function(panel) {
						panel.setAttribute('aria-hidden', 'true')
					})

					Array.from(accordionHeadings).forEach(function(heading) {
						heading
							.querySelector('button')
							.setAttribute('aria-expanded', 'false')
					})

					checkToggleCollapseButtonState()
					checkToggleExpandButtonState()
				}

				// Show answer
				toggleButton.setAttribute('aria-expanded', 'true')
				thepanel.setAttribute('aria-hidden', 'false')

				checkToggleCollapseButtonState()
				checkToggleExpandButtonState()
			}
		}

		var enableCollapseButton = function() {
			if (collapseButton) collapseButton.removeAttribute('disabled')
		}

		var disableCollapseButton = function() {
			if (collapseButton) collapseButton.setAttribute('disabled', 'disabled')
		}

		var enableExpandButton = function() {
			if (expandButton) expandButton.removeAttribute('disabled')
		}

		var disableExpandButton = function() {
			if (expandButton) expandButton.setAttribute('disabled', 'disabled')
		}

		var checkToggleExpandButtonState = function() {
			var closedPanels = el.querySelectorAll('button[aria-expanded="false"]')

			if (!closedPanels.length) {
				disableExpandButton()
			} else {
				enableExpandButton()
			}
		}

		var checkToggleCollapseButtonState = function() {
			var openPanels = el.querySelectorAll('button[aria-expanded="true"]')

			if (openPanels.length === 0) {
				disableCollapseButton()
			} else {
				enableCollapseButton()
			}
		}

		init.call(this)
		return this
	} // ARIAaccordion()

	w.ARIAaccordion = ARIAaccordion
})(window, document)

var accInstance = '[data-accordion]'
var els = document.querySelectorAll(accInstance)
var allAccs = []

// Generate all accordion instances
for (var i = 0; i < els.length; i++) {
	// var nAccs = new ARIAaccordion(els[i]);
	var nAccs = new ARIAaccordion(els[i], { withControls: false })

	allAccs.push(nAccs)
}
