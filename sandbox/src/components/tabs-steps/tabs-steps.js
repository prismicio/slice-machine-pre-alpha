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
// add utilities; borrowed from: https://scottaohara.github.io/a11y_tab_widget/
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

	getUrlHash: function() {
		return window.location.hash.replace('#', '')
	},

	/**
	 * Use history.replaceState so clicking through Tabs
	 * does not create dozens of new history entries.
	 * Browser back should navigate to the previous page
	 * regardless of how many Tabs were activated.
	 *
	 * @param {string} hash
	 */
	setUrlHash: function(hash) {
		if (history.replaceState) {
			history.replaceState(null, '', '#' + hash)
		} else {
			location.hash = hash
		}
	}
}

;(function(w, doc, undefined) {
	var ARIAaccOptions = {
		manual: true,
		open: 0
	}

	var ARIAtabs = function(inst, options) {
		var _options = Object.assign(ARIAaccOptions, options)
		var el = inst
		var tablist = el.querySelector('[data-tablist]')
		var tabs = Array.from(el.querySelectorAll('[data-tab]'))
		var tabpanels = Array.from(el.querySelectorAll('[data-tabpanel]'))
		var tabsID = util.generateID('ps__tabs-')
		var orientation = el.getAttribute('data-tabs-orientation')
		var currentIndex = _options.open
		var selectedTab = currentIndex
		var manual = _options.manual

		el.setAttribute('id', tabsID)

		var init = function() {
			el.classList.add('js-tabs')
			tablist.removeAttribute('hidden')
			setupTabList()
			setupTabs()
			setupTabPanels()
		}

		var setupTabList = function() {
			tablist.setAttribute('role', 'tablist')
			if (orientation == 'vertical')
				tablist.setAttribute('aria-orientation', 'vertical')
		}

		var setupTabs = function() {
			tabs.forEach(function(tab, index) {
				tab.setAttribute('role', 'tab')
				// each tab needs an ID that will be used to label its corresponding panel
				tab.setAttribute('id', tabsID + '__tab-' + index)
				tab.setAttribute('data-controls', tabpanels[index].getAttribute('id'))

				// first tab is initially active
				if (index === currentIndex) {
					selectTab(tab)
					// updateUrlHash();
				}

				if (tab.getAttribute('data-controls') === util.getUrlHash()) {
					currentIndex = index
					selectedTab = index
					selectTab(tab)
				}

				tab.addEventListener(
					'click',
					function(e) {
						e.preventDefault()
						currentIndex = index
						selectedTab = index
						focusCurrentTab()
						selectTab(tab)
						updateUrlHash()
					},
					false
				)

				tab.addEventListener(
					'keydown',
					function(e) {
						tabKeyboardRespond(e, tab)
					},
					false
				)
			})
		}

		var focusCurrentTab = function() {
			tabs[currentIndex].focus()
		}

		var updateUrlHash = function() {
			var active = tabs[selectedTab]
			util.setUrlHash(active.getAttribute('data-controls'))
		}

		var selectTab = function(tab) {
			// unactivate all other tabs
			tabs.forEach(function(tab) {
				tab.setAttribute('aria-selected', 'false')
				tab.setAttribute('tabindex', '-1')
			})
			//activate current tab
			tab.setAttribute('aria-selected', 'true')
			tab.setAttribute('tabindex', '0')

			// activate corresponding panel
			showTabpanel(tab)
		}

		var setupTabPanels = function() {
			tabpanels.forEach(function(tabpanel, index) {
				tabpanel.setAttribute('role', 'tabpanel')
				tabpanel.setAttribute('tabindex', '-1')
				tabpanel.setAttribute('hidden', '')

				if (index == currentIndex) {
					tabpanel.removeAttribute('hidden')
				}

				tabpanel.addEventListener(
					'keydown',
					function(e) {
						panelKeyboardRespond(e)
					},
					false
				)

				tabpanel.addEventListener(
					'blur',
					function() {
						tabpanel.setAttribute('tabindex', '-1')
					},
					false
				)
			})
		}

		var panelKeyboardRespond = function(e) {
			var keyCode = e.keyCode || e.which

			switch (keyCode) {
				case util.keyCodes.TAB:
					tabpanels[currentIndex].setAttribute('tabindex', '-1')
					break

				default:
					break
			}
		}

		var showTabpanel = function(tab) {
			tabpanels.forEach(function(tabpanel, index) {
				tabpanel.setAttribute('hidden', '')
				tabpanel.removeAttribute('tabindex')

				if (index == currentIndex) {
					tabpanel.removeAttribute('hidden')
					tabpanel.setAttribute(
						'aria-labelledby',
						tabs[currentIndex].getAttribute('id')
					)
					tabpanel.setAttribute('tabindex', '0')
				}
			})
		}

		var incrementcurrentIndex = function() {
			if (currentIndex < tabs.length - 1) {
				return ++currentIndex
			} else {
				currentIndex = 0
				return currentIndex
			}
		}

		var decrementcurrentIndex = function() {
			if (currentIndex > 0) {
				return --currentIndex
			} else {
				currentIndex = tabs.length - 1
				return currentIndex
			}
		}

		var tabKeyboardRespond = function(e, tab) {
			var firstTab = tabs[0]
			var lastTab = tabs[tabs.length - 1]

			var keyCode = e.keyCode || e.which

			switch (keyCode) {
				case util.keyCodes.UP:
				case util.keyCodes.LEFT:
					e.preventDefault()
					decrementcurrentIndex()
					focusCurrentTab()

					if (!manual) {
						selectedTab = currentIndex
						selectTab(tabs[selectedTab])
						updateUrlHash()
					}

					break

				case util.keyCodes.DOWN:
				case util.keyCodes.RIGHT:
					e.preventDefault()
					incrementcurrentIndex()
					focusCurrentTab()

					if (!manual) {
						selectedTab = currentIndex
						selectTab(tabs[selectedTab])
						updateUrlHash()
					}

					break

				case util.keyCodes.ENTER:
				case util.keyCodes.SPACE:
					e.preventDefault()
					selectedTab = currentIndex
					selectTab(tabs[selectedTab])
					updateUrlHash()

					break

				case util.keyCodes.TAB:
					tabpanels[selectedTab].setAttribute('tabindex', '0')
					currentIndex = selectedTab

					break

				case util.keyCodes.HOME:
					e.preventDefault()
					firstTab.focus()
					updateUrlHash()

					break

				case util.keyCodes.END:
					e.preventDefault()
					lastTab.focus()
					updateUrlHash()

					break
			}
		}

		init.call(this)
		return this
	} // ARIAtabs()

	w.ARIAtabs = ARIAtabs
})(window, document)

var tabsInstance = '[data-tabs]'
var els = document.querySelectorAll(tabsInstance)
var allTabs = []

// Generate all tabs instances
for (var i = 0; i < els.length; i++) {
	var nTabs = new ARIAtabs(els[i], { manual: true }) // if manual is set to false, the tabs open on focus without needing an ENTER or SPACE press
	allTabs.push(nTabs)
}
