"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* inert polyfill 
 * source: https://cdn.rawgit.com/GoogleChrome/inert-polyfill/v0.1.0/inert-polyfill.min.js
 */
window.addEventListener("load", function () {
  function h(a, b, c) {
    if (0 > b) {
      if (a.previousElementSibling) {
        for (a = a.previousElementSibling; a.lastElementChild;) {
          a = a.lastElementChild;
        }

        return a;
      }

      return a.parentElement;
    }

    if (a != c && a.firstElementChild) return a.firstElementChild;

    for (; null != a;) {
      if (a.nextElementSibling) return a.nextElementSibling;
      a = a.parentElement;
    }

    return null;
  }

  function g(a) {
    for (; a && a !== document.documentElement;) {
      if (a.hasAttribute("inert")) return a;
      a = a.parentElement;
    }

    return null;
  }

  (function (a) {
    var b = document.createElement("style");
    b.type = "text/css";
    b.styleSheet ? b.styleSheet.cssText = a : b.appendChild(document.createTextNode(a));
    document.body.appendChild(b);
  })("/*[inert]*/[inert]{position:relative!important;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}[inert]::before{content:'';display:block;position:absolute;top:0;left:0;right:0;bottom:0}");

  var c = 0;
  document.addEventListener("keydown", function (a) {
    c = 9 === a.keyCode ? a.shiftKey ? -1 : 1 : 0;
  });
  document.addEventListener("mousedown", function () {
    c = 0;
  });
  document.body.addEventListener("focus", function (a) {
    var b = a.target,
        f = g(b);

    if (f) {
      if (document.hasFocus() && 0 !== c) {
        var d = document.activeElement,
            e = new KeyboardEvent("keydown", {
          keyCode: 9,
          which: 9,
          key: "Tab",
          code: "Tab",
          keyIdentifier: "U+0009",
          shiftKey: !!(0 > c),
          bubbles: !0
        });
        Object.defineProperty(e, "keyCode", {
          value: 9
        });
        document.activeElement.dispatchEvent(e);
        if (d != document.activeElement) return;

        for (d = f;;) {
          d = h(d, c, f);
          if (!d) break;

          a: {
            e = b;

            if (!(0 > d.tabIndex) && (d.focus(), document.activeElement !== e)) {
              e = !0;
              break a;
            }

            e = !1;
          }

          if (e) return;
        }
      }

      b.blur();
      a.preventDefault();
      a.stopPropagation();
    }
  }, !0);
  document.addEventListener("click", function (a) {
    g(a.target) && (a.preventDefault(), a.stopPropagation());
  }, !0);
});
/* IntersectionObserver polyfill 
 * 
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */

!function () {
  "use strict";

  if ("object" == (typeof window === "undefined" ? "undefined" : _typeof(window))) if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) "isIntersecting" in window.IntersectionObserverEntry.prototype || Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
    get: function get() {
      return 0 < this.intersectionRatio;
    }
  });else {
    var g = window.document,
        e = [];
    t.prototype.THROTTLE_TIMEOUT = 100, t.prototype.POLL_INTERVAL = null, t.prototype.USE_MUTATION_OBSERVER = !0, t.prototype.observe = function (e) {
      if (!this._observationTargets.some(function (t) {
        return t.element == e;
      })) {
        if (!e || 1 != e.nodeType) throw new Error("target must be an Element");
        this._registerInstance(), this._observationTargets.push({
          element: e,
          entry: null
        }), this._monitorIntersections(), this._checkForIntersections();
      }
    }, t.prototype.unobserve = function (e) {
      this._observationTargets = this._observationTargets.filter(function (t) {
        return t.element != e;
      }), this._observationTargets.length || (this._unmonitorIntersections(), this._unregisterInstance());
    }, t.prototype.disconnect = function () {
      this._observationTargets = [], this._unmonitorIntersections(), this._unregisterInstance();
    }, t.prototype.takeRecords = function () {
      var t = this._queuedEntries.slice();

      return this._queuedEntries = [], t;
    }, t.prototype._initThresholds = function (t) {
      var e = t || [0];
      return Array.isArray(e) || (e = [e]), e.sort().filter(function (t, e, n) {
        if ("number" != typeof t || isNaN(t) || t < 0 || 1 < t) throw new Error("threshold must be a number between 0 and 1 inclusively");
        return t !== n[e - 1];
      });
    }, t.prototype._parseRootMargin = function (t) {
      var e = (t || "0px").split(/\s+/).map(function (t) {
        var e = /^(-?\d*\.?\d+)(px|%)$/.exec(t);
        if (!e) throw new Error("rootMargin must be specified in pixels or percent");
        return {
          value: parseFloat(e[1]),
          unit: e[2]
        };
      });
      return e[1] = e[1] || e[0], e[2] = e[2] || e[0], e[3] = e[3] || e[1], e;
    }, t.prototype._monitorIntersections = function () {
      this._monitoringIntersections || (this._monitoringIntersections = !0, this.POLL_INTERVAL ? this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL) : (n(window, "resize", this._checkForIntersections, !0), n(g, "scroll", this._checkForIntersections, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in window && (this._domObserver = new MutationObserver(this._checkForIntersections), this._domObserver.observe(g, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      }))));
    }, t.prototype._unmonitorIntersections = function () {
      this._monitoringIntersections && (this._monitoringIntersections = !1, clearInterval(this._monitoringInterval), this._monitoringInterval = null, o(window, "resize", this._checkForIntersections, !0), o(g, "scroll", this._checkForIntersections, !0), this._domObserver && (this._domObserver.disconnect(), this._domObserver = null));
    }, t.prototype._checkForIntersections = function () {
      var h = this._rootIsInDom(),
          c = h ? this._getRootRect() : r();

      this._observationTargets.forEach(function (t) {
        var e = t.element,
            n = _(e),
            o = this._rootContainsTarget(e),
            i = t.entry,
            r = h && o && this._computeTargetAndRootIntersection(e, c),
            s = t.entry = new a({
          time: window.performance && performance.now && performance.now(),
          target: e,
          boundingClientRect: n,
          rootBounds: c,
          intersectionRect: r
        });

        i ? h && o ? this._hasCrossedThreshold(i, s) && this._queuedEntries.push(s) : i && i.isIntersecting && this._queuedEntries.push(s) : this._queuedEntries.push(s);
      }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this);
    }, t.prototype._computeTargetAndRootIntersection = function (t, e) {
      if ("none" != window.getComputedStyle(t).display) {
        for (var n, o, i, r, s, h, c, a, u = _(t), l = m(t), d = !1; !d;) {
          var p = null,
              f = 1 == l.nodeType ? window.getComputedStyle(l) : {};
          if ("none" == f.display) return;
          if (l == this.root || l == g ? (d = !0, p = e) : l != g.body && l != g.documentElement && "visible" != f.overflow && (p = _(l)), p && (n = p, o = u, void 0, i = Math.max(n.top, o.top), r = Math.min(n.bottom, o.bottom), s = Math.max(n.left, o.left), h = Math.min(n.right, o.right), a = r - i, !(u = 0 <= (c = h - s) && 0 <= a && {
            top: i,
            bottom: r,
            left: s,
            right: h,
            width: c,
            height: a
          }))) break;
          l = m(l);
        }

        return u;
      }
    }, t.prototype._getRootRect = function () {
      var t;
      if (this.root) t = _(this.root);else {
        var e = g.documentElement,
            n = g.body;
        t = {
          top: 0,
          left: 0,
          right: e.clientWidth || n.clientWidth,
          width: e.clientWidth || n.clientWidth,
          bottom: e.clientHeight || n.clientHeight,
          height: e.clientHeight || n.clientHeight
        };
      }
      return this._expandRectByRootMargin(t);
    }, t.prototype._expandRectByRootMargin = function (n) {
      var t = this._rootMarginValues.map(function (t, e) {
        return "px" == t.unit ? t.value : t.value * (e % 2 ? n.width : n.height) / 100;
      }),
          e = {
        top: n.top - t[0],
        right: n.right + t[1],
        bottom: n.bottom + t[2],
        left: n.left - t[3]
      };

      return e.width = e.right - e.left, e.height = e.bottom - e.top, e;
    }, t.prototype._hasCrossedThreshold = function (t, e) {
      var n = t && t.isIntersecting ? t.intersectionRatio || 0 : -1,
          o = e.isIntersecting ? e.intersectionRatio || 0 : -1;
      if (n !== o) for (var i = 0; i < this.thresholds.length; i++) {
        var r = this.thresholds[i];
        if (r == n || r == o || r < n != r < o) return !0;
      }
    }, t.prototype._rootIsInDom = function () {
      return !this.root || i(g, this.root);
    }, t.prototype._rootContainsTarget = function (t) {
      return i(this.root || g, t);
    }, t.prototype._registerInstance = function () {
      e.indexOf(this) < 0 && e.push(this);
    }, t.prototype._unregisterInstance = function () {
      var t = e.indexOf(this);
      -1 != t && e.splice(t, 1);
    }, window.IntersectionObserver = t, window.IntersectionObserverEntry = a;
  }

  function a(t) {
    this.time = t.time, this.target = t.target, this.rootBounds = t.rootBounds, this.boundingClientRect = t.boundingClientRect, this.intersectionRect = t.intersectionRect || r(), this.isIntersecting = !!t.intersectionRect;
    var e = this.boundingClientRect,
        n = e.width * e.height,
        o = this.intersectionRect,
        i = o.width * o.height;
    this.intersectionRatio = n ? Number((i / n).toFixed(4)) : this.isIntersecting ? 1 : 0;
  }

  function t(t, e) {
    var n,
        o,
        i,
        r = e || {};
    if ("function" != typeof t) throw new Error("callback must be a function");
    if (r.root && 1 != r.root.nodeType) throw new Error("root must be an Element");
    this._checkForIntersections = (n = this._checkForIntersections.bind(this), o = this.THROTTLE_TIMEOUT, i = null, function () {
      i = i || setTimeout(function () {
        n(), i = null;
      }, o);
    }), this._callback = t, this._observationTargets = [], this._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(r.rootMargin), this.thresholds = this._initThresholds(r.threshold), this.root = r.root || null, this.rootMargin = this._rootMarginValues.map(function (t) {
      return t.value + t.unit;
    }).join(" ");
  }

  function n(t, e, n, o) {
    "function" == typeof t.addEventListener ? t.addEventListener(e, n, o || !1) : "function" == typeof t.attachEvent && t.attachEvent("on" + e, n);
  }

  function o(t, e, n, o) {
    "function" == typeof t.removeEventListener ? t.removeEventListener(e, n, o || !1) : "function" == typeof t.detatchEvent && t.detatchEvent("on" + e, n);
  }

  function _(t) {
    var e;

    try {
      e = t.getBoundingClientRect();
    } catch (t) {}

    return e ? (e.width && e.height || (e = {
      top: e.top,
      right: e.right,
      bottom: e.bottom,
      left: e.left,
      width: e.right - e.left,
      height: e.bottom - e.top
    }), e) : r();
  }

  function r() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0
    };
  }

  function i(t, e) {
    for (var n = e; n;) {
      if (n == t) return !0;
      n = m(n);
    }

    return !1;
  }

  function m(t) {
    var e = t.parentNode;
    return e && 11 == e.nodeType && e.host ? e.host : e && e.assignedSlot ? e.assignedSlot.parentNode : e;
  }
}();
"use strict";

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
  // Function from David Walsh: http://davidwalsh.name/css-animation-callback
  whichTransitionEvent: function whichTransitionEvent() {
    var t,
        el = document.createElement("fakeelement");
    var transitions = {
      "transition": "transitionend",
      "OTransition": "oTransitionEnd",
      "MozTransition": "transitionend",
      "WebkitTransition": "webkitTransitionEnd"
    };

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  }
};

(function (w, doc, undefined) {
  var ARIAcarouselOptions = {};

  var ARIAcarousel = function ARIAcarousel(inst, options) {
    var _options = Object.assign(ARIAcarouselOptions, options);

    var el = inst;
    var carouselContainer = el.querySelector("[data-carousel-cards]");
    var cardsWrapper = el.querySelector("[data-carousel-cards-wrapper]");
    var cards = Array.from(el.querySelectorAll("[data-carousel-card]"));
    var paddleNav = el.querySelector("[data-carousel-paddleNav]");
    var prevButton = paddleNav.querySelector('[data-prev]');
    var nextButton = paddleNav.querySelector('[data-next]');
    var transitionEvent = util.whichTransitionEvent();
    var carouselID = util.generateID('c-carousel-');
    var cardWidth = cards[0].offsetWidth;
    var containerWidth = carouselContainer.offsetWidth;
    var itemsAvailable = Math.floor(containerWidth / cardWidth);
    var itemsOutOfView = cards.length - itemsAvailable;
    var rightCounter = itemsOutOfView; // counts the number of remaining slides that are out of view

    var leftCounter = 0;
    var itemsShowing = []; // console.log('card width: ' + cardWidth);
    // console.log('Items in view: ' + itemsAvailable);
    // console.log('Items out of view: ' + itemsOutOfView);

    var init = function init() {
      el.setAttribute('id', carouselID);
      el.classList.add('js-carousel');
      el.setAttribute('role', 'group'); // or region

      el.setAttribute('aria-roledescription', 'Carousel');
      el.setAttribute('aria-label', el.getAttribute('data-aria-label')); // show Next and Prev Buttons

      paddleNav.removeAttribute('hidden');
      initHelper();
      /***************************************** * 
       * handle carousel on window resize 
       ******************************************/

      var timeout = false,
          // holder for timeout id
      delay = 100,
          // delay after event is "complete" to run callback
      calls = 0;
      window.addEventListener("resize", function () {
        // clear the timeout
        clearTimeout(timeout); // start timing for event "completion"

        timeout = setTimeout(updateState, delay);
      });
      updateState();

      function updateState() {
        cardWidth = cards[0].offsetWidth;
        containerWidth = carouselContainer.offsetWidth;
        itemsAvailable = Math.floor(containerWidth / cardWidth);
        itemsOutOfView = cards.length - itemsAvailable;
        rightCounter = itemsOutOfView;
        leftCounter = 0; // reset it

        handlePaddleButtonsState();
        updateHelper();
        slideCards();
      }
      /* ************************************************ */


      initCards();
      initPaddleNav();
      enableTouchSwipes();
    };

    var initCards = function initCards() {
      var options = {
        root: carouselContainer,
        rootMargin: '0px',
        threshold: .5
      };
      var observer = new IntersectionObserver(a11ifyCards, options);
      cards.forEach(function (card) {
        return observer.observe(card);
      });

      function a11ifyCards(entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // entry.target.style.opacity = "1";
            entry.target.classList.add('is-visible');
            entry.target.setAttribute('aria-hidden', 'false');
            entry.target.removeAttribute('inert');
          } else {
            // entry.target.style.opacity = "0".5
            entry.target.classList.remove('is-visible');
            entry.target.setAttribute('aria-hidden', 'true');
            entry.target.setAttribute('inert', '');
          }
        });
        updateHelper();
      }
    };

    var enableTouchSwipes = function enableTouchSwipes() {
      var mc = new Hammer(cardsWrapper, {
        threshold: 500
      }); // listen to events...

      mc.on("swipeleft", function (e) {
        paddleForward();
      });
      mc.on("swiperight", function (e) {
        paddleBack();
      });
    };

    var initHelper = function initHelper() {
      var helper = document.createElement('span');
      helper.setAttribute('aria-live', 'polite');
      helper.setAttribute('id', carouselID + '__SRHelper');
      helper.classList.add('sr-only');
      helper.classList.add('c-carousel__SRHelper');
      el.prepend(helper);
      updateHelper();
    };

    var updateHelper = function updateHelper() {
      // setTimeout(function () {
      var visibleItems = Array.from(el.querySelectorAll('.c-carousel__card.is-visible'));
      var cardNumbers = [];
      var helper = el.querySelector('.c-carousel__SRHelper');
      visibleItems.forEach(function (item) {
        var number = cards.indexOf(item);
        cardNumbers.push(number + 1);
      });
      helper.innerHTML = 'Showing carousel items ' + cardNumbers.toString() + ' of ' + cards.length; // }, 300);
    };

    var initPaddleNav = function initPaddleNav() {
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

    var handlePaddleButtonsState = function handlePaddleButtonsState() {
      if (rightCounter == 0) {
        nextButton.setAttribute('aria-disabled', 'true');
        nextButton.setAttribute('tabindex', '-1');
      } else if (rightCounter > 0) {
        nextButton.removeAttribute('aria-disabled');
        nextButton.removeAttribute('tabindex');
      }

      if (leftCounter == 0) {
        prevButton.setAttribute('aria-disabled', 'true');
        prevButton.setAttribute('tabindex', '-1');
      } else if (leftCounter > 0) {
        prevButton.removeAttribute('aria-disabled');
        prevButton.removeAttribute('tabindex');
      }
    };

    var slideCards = function slideCards() {
      var translateValue = leftCounter * cardWidth * -1;
      cardsWrapper.style.transform = 'translateX(' + translateValue + 'px)'; // cardsWrapper.addEventListener('transitionend', function () {
      //   updateHelper();
      // });
    };

    var incrementRightCounter = function incrementRightCounter() {
      if (rightCounter < itemsOutOfView) {
        return ++rightCounter;
      } else return;
    };

    var decrementRightCounter = function decrementRightCounter() {
      if (rightCounter > 0) {
        return --rightCounter;
      } else return;
    };

    var incrementLeftCounter = function incrementLeftCounter() {
      if (leftCounter < itemsOutOfView) {
        return ++leftCounter;
      } else return;
    };

    var decrementLeftCounter = function decrementLeftCounter() {
      if (leftCounter > 0) {
        return --leftCounter;
      } else return;
    };

    var paddleBack = function paddleBack(e) {
      incrementRightCounter();
      decrementLeftCounter();
      slideCards();
      handlePaddleButtonsState();
    };

    var paddleForward = function paddleForward(e) {
      decrementRightCounter();
      incrementLeftCounter();
      slideCards();
      handlePaddleButtonsState();
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
          // selectedDot = currentIndex;
          // selectDot();
          break;

        case util.keyCodes.TAB:
          // slides[selectedDot].setAttribute('tabindex', '0');
          // currentIndex = selectedDot;
          break;
      }
    };

    init.call(this);
    return this;
  }; // ARIAcarousel()


  w.ARIAcarousel = ARIAcarousel;
})(window, document);

var carouselInstance = "[data-carousel]";
var els = document.querySelectorAll(carouselInstance);
var allcarousel = []; // Generate all carousel instances

for (var i = 0; i < els.length; i++) {
  var ncarousel = new ARIAcarousel(els[i]); // if manual is set to false, the carousel open on focus without needing an ENTER or SPACE press

  allcarousel.push(ncarousel);
}