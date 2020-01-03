'use strict'; //  Options
//    listener
//    multiplier

function Drag(options) {
  this._event = {
    X: 0,
    Y: 0,
    cursorDown: false,
    initialX: 0,
    // The X position of the cursor on start.
    initialY: 0,
    // The Y position of cursor on start.
    originalEvent: null
  };
  this.initialized = false;
  this.curDown = false; // True if cursor is down.

  this.numListeners = 0;
  this.listeners = [];
  this.listener = options.listener || window;
  this.multiplier = options.multiplier || 1; // Detect interaction type.

  this.hasMouseEvent = 'onmousedown' in document;
  this.hasTouchEvent = 'ontouchstart' in document;
  this.hasTouchWinEvent = navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1;
  this.hasPointerEvent = !!window.navigator.msPointerEnabled;
  this.isTouch = this.hasTouchEvent || this.hasTouchWinEvent || this.hasPointerEvent;
  this.msTouchAction = null; // Context binding.

  this._onDragStart = this._onDragStart.bind(this);
  this._onDrag = this._onDrag.bind(this);
  this._onDragEnd = this._onDragEnd.bind(this);
  this._onMouseLeave = this._onMouseLeave.bind(this);
  this._notify = this._notify.bind(this);
}

Drag.prototype.on = function (f) {
  if (!this.initialized) this._addListeners();
  this.listeners.push(f);
  this.numListeners = this.listeners.length;
};

Drag.prototype.off = function (f) {
  this.listeners.splice(f, 1);
  this.numListeners = this.listeners.length;
  if (this.numListeners <= 0) this._removeListeners();
};

Drag.prototype._notify = function (e) {
  var _e = this.isTouch && e.targetTouches ? e.targetTouches[0] : e;

  this._event.X = (_e.pageX - this._event.initialX) * this.multiplier;
  this._event.Y = (_e.pageY - this._event.initialY) * this.multiplier;
  this._event.originalEvent = e;
  this._event.cursorDown = this.curDown;
  this._event.initialX = _e.pageX;
  this._event.initialY = _e.pageY;

  for (var i = 0; i < this.numListeners; i++) {
    this.listeners[i](this._event);
  }
}; // Event Listeners.


Drag.prototype._onDrag = function (e) {
  if (this.curDown) {
    e.preventDefault();

    this._notify(e);
  }
};

Drag.prototype._onDragStart = function (e) {
  var _e = this.isTouch && e.targetTouches ? e.targetTouches[0] : e;

  this._event.initialX = _e.pageX;
  this._event.initialY = _e.pageY;
  this.curDown = true; //this._notify(e);
};

Drag.prototype._onDragEnd = function (e) {
  this.curDown = false; //this._notify(e);
};

Drag.prototype._onMouseLeave = function (e) {
  this._onDragEnd(e);
};

Drag.prototype._addListeners = function () {
  if (this.hasMouseEvent) {
    this.listener.addEventListener('mouseleave', this._onMouseLeave);
    this.listener.addEventListener('mouseup', this._onDragEnd);
    this.listener.addEventListener('mousedown', this._onDragStart);
    this.listener.addEventListener('mousemove', this._onDrag);
  }

  if (this.hasTouchEvent) {
    this.listener.addEventListener('touchmove', this._onDrag);
    this.listener.addEventListener('touchend', this._onDragEnd);
    this.listener.addEventListener('touchstart', this._onDragStart);
  }

  if (this.hasPointerEvent && this.hasTouchWinEvent) {
    this.msTouchAction = this.listener.style.msTouchAction;
    this.listener.style.msTouchAction = "none";
    this.listener.addEventListener('MSPointerMove', this._onDrag);
    this.listener.addEventListener('MSPointerUp', this._onDragEnd);
    this.listener.addEventListener('MSPointerDown', this._onDragStart);
  }
};

Drag.prototype._removeListeners = function () {
  if (this.hasMouseEvent) {
    this.listener.removeEventListener('mouseleave', this._onMouseLeave);
    this.listener.removeEventListener('mouseup', this._onDragEnd);
    this.listener.removeEventListener('mousedown', this._onDragStart);
    this.listener.removeEventListener('mousemove', this._onDrag);
  }

  if (this.hasTouchEvent) {
    this.listener.removeEventListener('touchmove', this._onDrag);
    this.listener.removeEventListener('touchend', this._onDragEnd);
    this.listener.removeEventListener('touchstart', this._onDragStart);
  }

  if (this.hasPointerEvent && this.hasTouchWinEvent) {
    if (this.msTouchAction) this.listener.style.msTouchAction = this.msTouchAction;
    this.listener.removeEventListener('MSPointerMove', this._onDrag);
    this.listener.removeEventListener('MSPointerUp', this._onDragEnd);
    this.listener.removeEventListener('MSPointerDown', this._onDragStart);
  }
}; // TODO: add sr-only span to announce which slide we're on


"use strict";

if (typeof Object.assign != "function") {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      // .length of function is 2
      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError("Cannot convert undefined or null to object");
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }

      return to;
    },
    writable: true,
    configurable: true
  });
} // add utilities; some of them borrowed from: https://scottaohara.github.io/a11y_tab_widget/


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
  generateID: function generateID(base) {
    return base + Math.floor(Math.random() * 999);
  },
  getDirectChildren: function getDirectChildren(elm, selector) {
    return Array.prototype.filter.call(elm.children, function (child) {
      return child.matches(selector);
    });
  },
  getUrlHash: function getUrlHash() {
    return window.location.hash.replace('#', '');
  },

  /**
   * Use history.replaceState so clicking through Tabs
   * does not create dozens of new history entries.
   * Browser back should navigate to the previous page
   * regardless of how many Tabs were activated.
   *
   * @param {string} hash
   */
  setUrlHash: function setUrlHash(hash) {
    if (history.replaceState) {
      history.replaceState(null, '', '#' + hash);
    } else {
      location.hash = hash;
    }
  },

  /** 
   * Convert hyphen-separated string to camelCase
   * Source: https://stackoverflow.com/questions/6660977/convert-hyphens-to-camel-case-camelcase 
   * CamelCase is readable by Screen Readers and so can be used as an accessible label for the dotNav
   * More info: https://adrianroselli.com/2018/01/improving-your-tweet-accessibility.html#Hash
   */
  dashToCamelCase: function dashToCamelCase(string) {
    return string.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
  }
};

(function (w, doc, undefined) {
  var ARIAaccOptions = {
    manual: true,
    loop: false,
    withDotNav: true
  };

  var ARIAslider = function ARIAslider(inst, options) {
    var _options = Object.assign(ARIAaccOptions, options);

    var el = inst;
    var slidesContainer = el.querySelector("[data-slides]");
    var slidesWrapper = el.querySelector("[data-slides-wrapper]");
    var slides = Array.from(el.querySelectorAll("[data-slide]"));
    var paddleNav = el.querySelector("[data-slider-paddleNav]");
    var prevButton = paddleNav.querySelector('[data-prev]');
    var nextButton = paddleNav.querySelector('[data-next]');
    var sliderID = util.generateID('c-slider-');
    var currentIndex = 0;
    var selectedDot = 0;
    var tempDot = 0;
    var manual = _options.manual;
    var loop = _options.loop;
    var withDotNav = _options.withDotNav;
    var dots = [];

    var init = function init() {
      el.setAttribute('id', sliderID);
      el.classList.add('js-slider');
      el.setAttribute('role', 'group'); // or region

      el.setAttribute('aria-roledescription', 'Slider');
      el.setAttribute('aria-label', el.getAttribute('data-aria-label')); // show Next and Prev Buttons

      paddleNav.removeAttribute('hidden');
      setupPaddleNav();
      if (withDotNav) setupDotNav();
      setupSlides();
    };

    var setupPaddleNav = function setupPaddleNav() {
      prevButton.addEventListener('keydown', function (e) {
        paddleKeyboardRespond(e);
      }, false);
      nextButton.addEventListener('keydown', function (e) {
        paddleKeyboardRespond(e);
      }, false);
      prevButton.addEventListener('click', function (e) {
        paddleBack();
      });
      nextButton.addEventListener('click', function (e) {
        paddleForward(e);
      });
      handlePaddleButtonsState();
    };

    var setupDotNav = function setupDotNav() {
      var dotNavList = document.createElement('div');
      dotNavList.setAttribute('data-slider-dotNav', '');
      dotNavList.setAttribute('role', 'tablist');
      dotNavList.setAttribute('class', 'c-slider__dotNav'); // create dots

      var nb = slides.length;

      for (var i = 0; i < nb; i++) {
        var dot = document.createElement('button');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', util.dashToCamelCase(slides[i].getAttribute('id')));
        dot.setAttribute('id', sliderID + '__dot-' + i);
        dot.setAttribute('class', 'c-slider__dotNav__dot');
        dot.setAttribute('data-slider-dot', '');
        dot.setAttribute('data-controls', slides[i].getAttribute('id')); // append dot to dotNavList

        dotNavList.appendChild(dot);
        dots.push(dot);
      }

      dots.forEach(function (dot, index) {
        if (index === currentIndex) {
          selectDot();
        }

        dot.addEventListener('click', function (e) {
          e.preventDefault();
          currentIndex = index;
          selectedDot = index;
          focusCurrentDot();
          selectDot();
        }, false);
        dot.addEventListener('keydown', function (e) {
          dotKeyboardRespond(e, dot);
        }, false);
      }); // append dotNavList to slider

      el.appendChild(dotNavList);
    };

    var selectDot = function selectDot() {
      // unactivate all other dots
      dots.forEach(function (dot) {
        dot.setAttribute('aria-selected', 'false');
        dot.setAttribute('tabindex', '-1');
      }); //activate current tab

      dots[selectedDot].setAttribute('aria-selected', 'true');
      dots[selectedDot].setAttribute('tabindex', '0'); // activate corresponding panel 

      activateCurrentSlide();
    };

    var setupSlides = function setupSlides() {
      slides.forEach(function (slide, index) {
        if (_options.withDotNav) {
          slide.setAttribute('role', 'tabpanel');
          slide.setAttribute('aria-labelledby', dots[index].getAttribute('id'));
        } else {
          slide.setAttribute('role', 'group');
          slide.setAttribute('aria-roledescription', 'Slide');
        }

        slide.setAttribute('tabindex', '-1');
        slide.setAttribute('data-hidden', '');
        slide.addEventListener('keydown', function (e) {// slideKeyboardRespond(e);
        }, false);
        slide.addEventListener("blur", function () {
          slide.setAttribute('tabindex', '-1');
        }, false);
      });
      activateCurrentSlide();
    };

    var slideKeyboardRespond = function slideKeyboardRespond(e) {
      var keyCode = e.keyCode || e.which;

      switch (keyCode) {
        case util.keyCodes.TAB:
          slides[currentIndex].setAttribute('tabindex', '-1');
          break;

        default:
          break;
      }
    };

    var handlePaddleButtonsState = function handlePaddleButtonsState() {
      if (!loop && currentIndex == slides.length - 1) {
        nextButton.setAttribute('aria-disabled', 'true');
        nextButton.setAttribute('tabindex', '-1');
      } else if (!loop && currentIndex < slides.length - 1) {
        nextButton.removeAttribute('aria-disabled');
        nextButton.removeAttribute('tabindex');
      }

      if (!loop && currentIndex == 0) {
        prevButton.setAttribute('aria-disabled', 'true');
        prevButton.setAttribute('tabindex', '-1');
      } else if (!loop && currentIndex > 0) {
        prevButton.removeAttribute('aria-disabled');
        prevButton.removeAttribute('tabindex');
      }
    };

    var activateCurrentSlide = function activateCurrentSlide() {
      slides.forEach(function (slide, index) {
        slide.setAttribute('data-hidden', '');
        slide.removeAttribute('tabindex');
      });
      slides[currentIndex].removeAttribute('data-hidden'); // if (withDotNav) slides[currentIndex].setAttribute('aria-labelledby', dots[currentIndex].getAttribute('id'));

      slides[currentIndex].setAttribute('tabindex', '0');
      slideToCurrentSlide(currentIndex);
    };

    var slideToCurrentSlide = function slideToCurrentSlide() {
      var translateValue = currentIndex * -100;
      slidesWrapper.style.transform = 'translateX(' + translateValue + '%)';
    };

    var incrementcurrentIndex = function incrementcurrentIndex() {
      if (currentIndex < slides.length - 1) {
        return ++currentIndex;
      } else {
        if (loop) {
          currentIndex = 0;
          return currentIndex;
        } else return;
      }
    };

    var decrementcurrentIndex = function decrementcurrentIndex() {
      if (currentIndex > 0) {
        return --currentIndex;
      } else {
        if (loop) {
          currentIndex = slides.length - 1;
          return currentIndex;
        } else return;
      }
    };

    var paddleBack = function paddleBack(e) {
      decrementcurrentIndex();
      activateCurrentSlide();
      handlePaddleButtonsState();
      selectedDot = currentIndex;
      tempDot = selectedDot;
      selectDot();
    };

    var paddleForward = function paddleForward(e) {
      incrementcurrentIndex();
      activateCurrentSlide();
      handlePaddleButtonsState();
      selectedDot = currentIndex;
      tempDot = selectedDot;
      selectDot();
    };

    var incrementTempDot = function incrementTempDot() {
      if (tempDot < dots.length - 1) {
        return ++tempDot;
      } else {
        if (loop) {
          tempDot = 0;
          return tempDot;
        } else return;
      }
    };

    var decrementTempDot = function decrementTempDot() {
      if (tempDot > 0) {
        return --tempDot;
      } else {
        if (loop) {
          tempDot = slides.length - 1;
          return tempDot;
        } else {
          return;
        }
      }
    };

    var focusCurrentDot = function focusCurrentDot() {
      dots[tempDot].focus();
    };

    var moveBack = function moveBack(e) {
      e.preventDefault();
      decrementTempDot();
      focusCurrentDot();

      if (!manual) {
        selectedDot = tempDot;
        currentIndex = selectedDot;
        selectDot();
        activateCurrentSlide();
        handlePaddleButtonsState();
      }
    };

    var moveForward = function moveForward(e) {
      e.preventDefault();
      incrementTempDot();
      focusCurrentDot();

      if (!manual) {
        selectedDot = tempDot;
        currentIndex = selectedDot;
        selectDot();
        activateCurrentSlide();
        handlePaddleButtonsState();
      }
    };

    var dotKeyboardRespond = function dotKeyboardRespond(e, dot) {
      var firstDot = dots[0];
      var lastDot = dots[dots.length - 1];
      var keyCode = e.keyCode || e.which;

      switch (keyCode) {
        case util.keyCodes.UP:
        case util.keyCodes.LEFT:
          moveBack(e);
          break;

        case util.keyCodes.DOWN:
        case util.keyCodes.RIGHT:
          moveForward(e);
          break;

        case util.keyCodes.ENTER:
        case util.keyCodes.SPACE:
          e.preventDefault();
          selectedDot = tempDot;
          currentIndex = selectedDot;
          handlePaddleButtonsState();
          selectDot();
          break;

        case util.keyCodes.TAB:
          slides[selectedDot].setAttribute('tabindex', '0');
          selectedDot = tempDot;
          currentIndex = selectedDot;
          break;

        case util.keyCodes.HOME:
          e.preventDefault();
          firstTab.focus();
          break;

        case util.keyCodes.END:
          e.preventDefault();
          lastTab.focus();
          break;
      }
    };

    var paddleKeyboardRespond = function paddleKeyboardRespond(e) {
      var keyCode = e.keyCode || e.which;

      switch (keyCode) {
        case util.keyCodes.LEFT:
          prevButton.focus();
          paddleBack(e);
          break;

        case util.keyCodes.RIGHT:
          nextButton.focus();
          paddleForward(e);
          break;

        case util.keyCodes.ENTER:
        case util.keyCodes.SPACE:
          selectedDot = currentIndex;
          selectDot();
          break;

        case util.keyCodes.TAB:
          slides[selectedDot].setAttribute('tabindex', '0');
          currentIndex = selectedDot;
          break;
      }
    };

    init.call(this);
    return this;
  }; // ARIAslider()


  w.ARIAslider = ARIAslider;
})(window, document);

var sliderInstance = "[data-slider]";
var els = document.querySelectorAll(sliderInstance);
var allslider = []; // Generate all slider instances

for (var i = 0; i < els.length; i++) {
  var nslider = new ARIAslider(els[i]); // if manual is set to false, the slider open on focus without needing an ENTER or SPACE press

  allslider.push(nslider);
} // Elements to listen/move.


var slidable = document.querySelector('[data-slide]');
var container = document.querySelector('[data-slides]'); // Where to store the drag position.

var currentX = 0;
var currentY = 0; // Initialize the library.

var options = {
  listener: container,
  multiplier: 2
};
var drag = new Drag(options); // Store the cursor position on move.

drag.on(function (event) {
  currentX = event.X;
  currentY = event.Y;
}); // Use the cursor position to slide the slidable element.

requestAnimationFrame(move);

function move() {
  slidable.style.transform = "translate3d(".concat(currentX, "px, ").concat(currentY, "px, 0px)");
  requestAnimationFrame(move);
}