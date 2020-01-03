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
    }); // Usage:
    // var myStr = dashToCamelCase('this-string');
    // alert(myStr); // => thisString
  }
};

(function (w, doc, undefined) {
  var ARIAaccOptions = {
    manual: true,
    open: 0,
    loop: true,
    widthDotNav: true
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
    var currentIndex = _options.open;
    var selectedDot = currentIndex;
    var manual = _options.manual;
    var loop = _options.loop;
    var withDotNav = _options.widthDotNav;
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
        paddleBack(e);
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
          selectActiveDot();
        }

        dot.addEventListener('click', function (e) {
          e.preventDefault();
          currentIndex = index;
          selectedDot = index;
          focusCurrentDot();
          selectActiveDot();
        }, false);
        dot.addEventListener('keydown', function (e) {
          dotKeyboardRespond(e, dot);
        }, false);
      }); // append dotNavList to slider

      el.appendChild(dotNavList);
    };

    var focusCurrentDot = function focusCurrentDot() {
      dots[currentIndex].focus();
    };

    var selectActiveDot = function selectActiveDot() {
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
        if (_options.widthDotNav) {
          slide.setAttribute('role', 'tabpanel');
        } else {
          slide.setAttribute('role', 'group');
          slide.setAttribute('aria-roledescription', 'Slide');
        }

        slide.setAttribute('tabindex', '-1');
        slide.setAttribute('data-hidden', 'true');

        if (index == currentIndex) {
          slide.setAttribute('data-hidden', 'false');
        }

        slide.addEventListener('keydown', function (e) {// slideKeyboardRespond(e);
        }, false);
        slide.addEventListener("blur", function () {
          slide.setAttribute('tabindex', '-1');
        }, false);
      });
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

    var activateCurrentSlide = function activateCurrentSlide(dot) {
      slides.forEach(function (slide, index) {
        slide.setAttribute('data-hidden', 'true');
        slide.removeAttribute('tabindex');

        if (index == currentIndex) {
          slide.setAttribute('data-hidden', 'false');
          slide.setAttribute('aria-labelledby', dots[currentIndex].getAttribute('id'));
          slide.setAttribute('tabindex', '0');
          slideToSlide(index);
        }
      });
    };

    var incrementcurrentIndex = function incrementcurrentIndex() {
      if (currentIndex < dots.length - 1) {
        return ++currentIndex;
      } else {
        return; // if we wanna loop back, use this
        // currentIndex = 0;
        // return currentIndex;
      }
    };

    var decrementcurrentIndex = function decrementcurrentIndex() {
      if (currentIndex > 0) {
        return --currentIndex;
      } else {
        return; // if we wanna loop back, use this
        // currentIndex = dots.length - 1;
        // return currentIndex;
      }
    };

    var handlePaddleButtonsState = function handlePaddleButtonsState() {
      if (currentIndex === slides.length - 1) nextButton.setAttribute('data-disabled', '');else if (currentIndex < slides.length - 1) nextButton.removeAttribute('data-disabled');
      if (currentIndex === 0) prevButton.setAttribute('data-disabled', '');else if (currentIndex > 0) prevButton.removeAttribute('data-disabled');
    };

    var slideToSlide = function slideToSlide(index) {
      var translateValue = index * 100 * -1;
      slidesWrapper.style.transform = 'translateX(' + translateValue + '%)';
    };

    var paddleBack = function paddleBack(e) {
      decrementcurrentIndex();
      handlePaddleButtonsState();
      selectedDot = currentIndex;
      selectActiveDot();
    };

    var paddleForward = function paddleForward(e) {
      incrementcurrentIndex();
      handlePaddleButtonsState();
      selectedDot = currentIndex;
      selectActiveDot();
    };

    var moveBack = function moveBack(e) {
      e.preventDefault();
      decrementcurrentIndex();
      handlePaddleButtonsState();
      focusCurrentDot();

      if (!manual) {
        selectedDot = currentIndex;
        selectActiveDot();
      }
    };

    var moveForward = function moveForward(e) {
      e.preventDefault();
      incrementcurrentIndex();
      handlePaddleButtonsState();
      focusCurrentDot();

      if (!manual) {
        selectedDot = currentIndex;
        selectActiveDot();
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
          selectedDot = currentIndex;
          selectActiveDot();
          break;

        case util.keyCodes.TAB:
          slides[selectedDot].setAttribute('tabindex', '0');
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
          selectActiveDot();
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
}