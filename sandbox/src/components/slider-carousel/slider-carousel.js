
"use strict";
// polyfill prepend method for IE
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('prepend')) {
      return;
    }
    Object.defineProperty(item, 'prepend', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.insertBefore(docFrag, this.firstChild);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

if (typeof Object.assign != "function") {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      // .length of function is 2

      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError(
          "Cannot convert undefined or null to object"
        );
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (
              Object.prototype.hasOwnProperty.call(
                nextSource,
                nextKey
              )
            ) {
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
}
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

  generateID: function (base) {
    return base + Math.floor(Math.random() * 999);
  }
};



(function (w, doc, undefined) {

  var ARIAcarouselOptions = {

  }

  var ARIAcarousel = function (inst, options) {
    const _options = Object.assign(ARIAcarouselOptions, options);
    const el = inst;
    const carouselContainer = el.querySelector("[data-carousel-cards]");
    const cardsWrapper = el.querySelector("[data-carousel-cards-wrapper]");
    const cards = Array.from(el.querySelectorAll("[data-carousel-card]"));
    const paddleNav = el.querySelector("[data-carousel-paddleNav]");
    const prevButton = paddleNav.querySelector('[data-prev]');
    const nextButton = paddleNav.querySelector('[data-next]');
    const carouselID = util.generateID('c-carousel-');
    let itemsShowing = [];

    let cardWidth = cards[0].offsetWidth;
    let containerWidth = carouselContainer.offsetWidth;
    let itemsInView = Math.round(containerWidth / cardWidth); // Math.round() instead of Math.floor() because FF sometimes errs on a couple of pixels, leading to a value of 3.99 instead of 4.something, so the number is set to 3, which is wrong. To avoid that, round up.
    let itemsOutOfView = cards.length - itemsInView;
    let rightCounter = itemsOutOfView;
    let leftCounter = 0; // reset it


    var init = function () {
      el.setAttribute('id', carouselID);
      el.classList.add('js-carousel');
      // set up carousel a11y attributes
      el.setAttribute('role', 'group'); // or region
      el.setAttribute('aria-roledescription', 'Carousel');
      el.setAttribute('aria-label', el.getAttribute('data-aria-label'));
      // show Next and Prev Buttons
      paddleNav.removeAttribute('hidden');
      // add the SR announcement span
      initHelper();

      // handle carousel on window resize 
      let timeout = false, // holder for timeout id
        delay = 300, // delay after event is "complete" to run callback
        calls = 0;

      window.addEventListener("resize", function () {
        clearTimeout(timeout);
        timeout = setTimeout(updateState, delay);
      });
      updateState();

      function updateState() {
        cardWidth = cards[0].offsetWidth;
        containerWidth = carouselContainer.offsetWidth;
        itemsInView = Math.round(containerWidth / cardWidth);
        itemsOutOfView = cards.length - itemsInView;
        rightCounter = itemsOutOfView;
        leftCounter = 0; // reset it

        // console.log('---');
        // console.log('card width: ' + cardWidth);
        // console.log('Items in view: ' + itemsInView);
        // console.log('Items out of view: ' + itemsOutOfView);
        // console.log('right counter: ' + rightCounter);
        // console.log('left counter: ' + leftCounter);

        handlePaddleButtonsState();
        updateHelper();
        slideCards();
      }

      // initialize elements
      initCards();
      initPaddleNav();

      // add touch swipe support
      enableTouchSwipes();
    };

    var initCards = function () {
      // set up IO on the cards
      let options = {
        root: carouselContainer,
        rootMargin: '-10px', // set to a negative value so that FF doesn't consider an element intersecting when its boundary is just touching that of the root
        threshold: 0.75
      }
      let observer = new IntersectionObserver(a11ifyCards, options);
      cards.forEach(card => observer.observe(card));

      // change ARIA attributes based on whether the cards are in view or not
      function a11ifyCards(entries, observer) {
        entries.forEach(entry => {
          if (entry.intersectionRatio >= 0.75) { // if you use isIntersecting or intersectionRatio == 1, FF will resolve to true even when it isn't; it's about 1px in FF. Annoying!
            entry.target.classList.add('is-visible');
            // unhide item from SRs
            entry.target.setAttribute('aria-hidden', 'false');
            // re-enable keyboard interactions
            entry.target.removeAttribute('inert');
          }
          else {
            entry.target.classList.remove('is-visible');
            // hide item from SRs (the polyfill used does not hide the element from SRs, so you should do it)
            entry.target.setAttribute('aria-hidden', 'true');
            // prevent keyboard interactions
            entry.target.setAttribute('inert', '');
          }
        });
        // announce which elements are in view
        updateHelper();
      }
    }

    // requires Hammer.js
    var enableTouchSwipes = function () {
      var mc = new Hammer(cardsWrapper, { threshold: 500 });

      mc.on("swipeleft", function (e) {
        slideForward();
      });

      mc.on("swiperight", function (e) {
        slideBack();
      });
    }

    var initHelper = function () {
      let helper = document.createElement('span');
      helper.setAttribute('aria-live', 'polite');
      helper.setAttribute('id', carouselID + '__SRHelper');
      helper.classList.add('sr-only');
      helper.classList.add('c-carousel__SRHelper');

      el.prepend(helper);
      updateHelper();
    }

    var updateHelper = function () {
      let visibleItems = Array.from(el.querySelectorAll('.c-carousel__card.is-visible'));
      let cardNumbers = [];
      let helper = el.querySelector('.c-carousel__SRHelper');

      // get which items are in view
      visibleItems.forEach(item => {
        let number = cards.indexOf(item);
        cardNumbers.push(number + 1);
      });
      // announce them in the SR helper
      helper.innerHTML = 'Showing carousel items ' + cardNumbers.toString() + ' of ' + cards.length;
    }

    // initialize prev and next arrows
    var initPaddleNav = function () {
      prevButton.addEventListener('keydown', (e) => {
        paddleKeyboardRespond(e);
      }, false);

      nextButton.addEventListener('keydown', (e) => {
        paddleKeyboardRespond(e);
      }, false);

      prevButton.addEventListener('click', function (e) {
        slideBack();
      });

      nextButton.addEventListener('click', function (e) {
        slideForward(e);
      });

      handlePaddleButtonsState();
    }

    // enable/disable prev and next arrows
    var handlePaddleButtonsState = function () {
      if (rightCounter == 0) {
        nextButton.setAttribute('aria-disabled', 'true');
        nextButton.setAttribute('tabindex', '-1');
      }
      else if (rightCounter > 0) {
        nextButton.removeAttribute('aria-disabled');
        nextButton.removeAttribute('tabindex');
      }

      if (leftCounter == 0) {
        prevButton.setAttribute('aria-disabled', 'true');
        prevButton.setAttribute('tabindex', '-1');
      }
      else if (leftCounter > 0) {
        prevButton.removeAttribute('aria-disabled');
        prevButton.removeAttribute('tabindex');
      }
    }


    var slideCards = function () {
      // var translateValue = leftCounter * cardWidth * -1;
      // instead of using the element width as above, I'm using percentages based on number of items in view (basically same as widths set in the CSS media queries on .c-carousel__card)
      // because of the way FF calculates item widths and how it differs from Chrome and Safari, thus resulting in inaccurate translate values (so portions of some cards would be visible when they shouldn't)
      var translateValue = leftCounter * (100 / itemsInView) * -1;
      cardsWrapper.style.transform = 'translateX(' + translateValue + '%)';
    }

    var incrementRightCounter = function () {
      if (rightCounter < itemsOutOfView) {
        return ++rightCounter;
      }
      else return;
    }

    var decrementRightCounter = function () {
      if (rightCounter > 0) {
        return --rightCounter;
      }
      else return;
    }

    var incrementLeftCounter = function () {
      if (leftCounter < itemsOutOfView) {
        return ++leftCounter;
      }
      else return;
    }

    var decrementLeftCounter = function () {
      if (leftCounter > 0) {
        return --leftCounter;
      }
      else return;
    }

    var slideBack = function (e) {
      incrementRightCounter();
      decrementLeftCounter();
      slideCards();
      handlePaddleButtonsState();

      // console.log('---');
      // console.log('card width: ' + cardWidth);
      // console.log('Items in view: ' + itemsInView);
      // console.log('Items out of view: ' + itemsOutOfView);
      // console.log('right counter: ' + rightCounter);
      // console.log('left counter: ' + leftCounter);
    }

    var slideForward = function (e) {
      decrementRightCounter();
      incrementLeftCounter();
      slideCards();
      handlePaddleButtonsState();

      // console.log('---');
      // console.log('card width: ' + cardWidth);
      // console.log('Items in view: ' + itemsInView);
      // console.log('Items out of view: ' + itemsOutOfView);
      // console.log('right counter: ' + rightCounter);
      // console.log('left counter: ' + leftCounter);
    }


    var paddleKeyboardRespond = function (e) {
      var keyCode = e.keyCode || e.which;

      switch (keyCode) {
        case util.keyCodes.LEFT:
          prevButton.focus();
          slideBack(e);
          break;

        case util.keyCodes.RIGHT:
          nextButton.focus();
          slideForward(e);
          break;

        case util.keyCodes.ENTER:
        case util.keyCodes.SPACE:
          break;


        case util.keyCodes.TAB:
          break;
      }
    }

    init.call(this);
    return this;
  }; // ARIAcarousel()

  w.ARIAcarousel = ARIAcarousel;

})(window, document);




var carouselInstance = "[data-carousel]";
var els = document.querySelectorAll(carouselInstance);
var allcarousel = [];

// Generate all carousel instances
for (var i = 0; i < els.length; i++) {
  var ncarousel = new ARIAcarousel(els[i]); // if manual is set to false, the carousel open on focus without needing an ENTER or SPACE press
  allcarousel.push(ncarousel);
}

