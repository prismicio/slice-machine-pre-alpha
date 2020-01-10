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
    var carouselID = util.generateID('c-carousel-');
    var counter; // counts the number of remaining slides that are out of view

    var init = function init() {
      el.setAttribute('id', carouselID);
      el.classList.add('js-carousel');
      el.setAttribute('role', 'group'); // or region

      el.setAttribute('aria-roledescription', 'Carousel');
      el.setAttribute('aria-label', el.getAttribute('data-aria-label')); // show Next and Prev Buttons

      paddleNav.removeAttribute('hidden');
      setupPaddleNav(); // setupSlides();
      // setupSRHelper();
      // enableTouchSwipes();
    };

    var enableTouchSwipes = function enableTouchSwipes() {
      var mc = new Hammer(slidesWrapper, {
        threshold: 500
      }); // listen to events...

      mc.on("swipeleft", function (e) {
        paddleForward();
      });
      mc.on("swiperight", function (e) {
        paddleBack();
      });
    }; // var setupSRHelper = function () {
    //   let helper = document.createElement('span');
    //   helper.setAttribute('aria-live', 'polite');
    //   helper.setAttribute('id', sliderID + '__SRHelper');
    //   helper.classList.add('sr-only');
    //   helper.classList.add('c-carousel__SRHelper');
    //   el.prepend(helper);
    //   updateHelper();
    // }
    // var updateHelper = function () {
    //   let showing = slides[currentIndex].getAttribute('data-slide-label');
    //   let showingNb = currentIndex + 1;
    //   let helper = el.querySelector('.c-carousel__SRHelper');
    //   helper.innerHTML = 'Showing ' + showing + ', slide ' + showingNb + ' of ' + slides.length;
    // }


    var setupPaddleNav = function setupPaddleNav() {
      prevButton.addEventListener('keydown', function (e) {
        paddleKeyboardRespond(e); // updateHelper();
      }, false);
      nextButton.addEventListener('keydown', function (e) {
        paddleKeyboardRespond(e); // updateHelper();
      }, false);
      prevButton.addEventListener('click', function (e) {
        paddleBack(); // updateHelper();
      });
      nextButton.addEventListener('click', function (e) {
        paddleForward(e); // updateHelper();
      }); // handlePaddleButtonsState();
    };

    var handlePaddleButtonsState = function handlePaddleButtonsState() {
      if (currentIndex == slides.length - 1) {
        nextButton.setAttribute('aria-disabled', 'true');
        nextButton.setAttribute('tabindex', '-1');
      } else if (currentIndex < slides.length - 1) {
        nextButton.removeAttribute('aria-disabled');
        nextButton.removeAttribute('tabindex');
      }

      if (currentIndex == 0) {
        prevButton.setAttribute('aria-disabled', 'true');
        prevButton.setAttribute('tabindex', '-1');
      } else if (currentIndex > 0) {
        prevButton.removeAttribute('aria-disabled');
        prevButton.removeAttribute('tabindex');
      }
    };

    var setupSlides = function setupSlides() {
      slides.forEach(function (slide, index) {
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', 'Slide');
        slide.setAttribute('tabindex', '-1');
        slide.setAttribute('data-hidden', 'true');
        slide.addEventListener('keydown', function (e) {// slideKeyboardRespond(e);
        }, false);
        slide.addEventListener("blur", function () {
          slide.setAttribute('tabindex', '-1');
        }, false);
      });
      slideCards();
    };

    var slideCards = function slideCards() {
      slides.forEach(function (slide, index) {
        slide.setAttribute('data-hidden', 'true');
        slide.removeAttribute('tabindex');
      });
      slides[currentIndex].setAttribute('data-hidden', 'false'); // if (withDotNav) slides[currentIndex].setAttribute('aria-labelledby', dots[currentIndex].getAttribute('id'));

      slides[currentIndex].setAttribute('tabindex', '0');
      slide(currentIndex);
    };

    var slide = function slide() {
      var translateValue = currentIndex * -100;
      slidesWrapper.style.transform = 'translateX(' + translateValue + '%)';
    };

    var incrementCounter = function incrementCounter() {
      if (currentIndex < slides.length - 1) {
        return ++currentIndex;
      } else {
        if (loop) {
          currentIndex = 0;
          return currentIndex;
        } else return;
      }
    };

    var decrementCounter = function decrementCounter() {
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
      slideCards();
      handlePaddleButtonsState();
    };

    var paddleForward = function paddleForward(e) {
      incrementCounter();
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