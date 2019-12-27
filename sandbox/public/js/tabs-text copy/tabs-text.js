// (function () {
//   const target = document.querySelector(".c-tabs__underline");
//   const tabs = document.querySelectorAll(".c-tabs__tab");
//   function slideUnderline() {
//     const width = this.getBoundingClientRect().width;
//     const height = this.getBoundingClientRect().height;
//     const left = this.offsetLeft;
//     const top = this.offsetTop;
//     target.style.width = `${width}px`;
//     target.style.height = `${height}px`;
//     target.style.left = `${left}px`;
//     target.style.top = `${top}px`;
//     target.style.transform = "none";
//   }
//   for (let i = 0; i < tabs.length; i++) {
//     tabs[i].addEventListener("click", slideUnderline);
//   }
// })();
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
} // add utilities; borrowed from: https://scottaohara.github.io/a11y_tab_widget/


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
  }
};

(function (w, doc, undefined) {
  var ARIAaccOptions = {
    manual: true,
    open: 0
  };

  var ARIAtabs = function ARIAtabs(inst, options) {
    var _options = Object.assign(ARIAaccOptions, options);

    var el = inst;
    var tablist = el.querySelector("[data-tablist]");
    var tabs = Array.from(el.querySelectorAll("[data-tab]"));
    var tabpanels = Array.from(el.querySelectorAll("[data-tabpanel]"));
    var tabsID = util.generateID('ps__tabs-');
    var orientation = el.getAttribute('data-tabs-orientation');
    var currentIndex = _options.open;
    var selectedTab = currentIndex;
    el.setAttribute('id', tabsID);

    var init = function init() {
      el.classList.add('js-tabs');
      setupTabList();
      setupTabs();
      setupTabPanels();
    };

    var setupTabList = function setupTabList() {
      tablist.setAttribute("role", "tablist");
      if (orientation == 'vertical') tablist.setAttribute("aria-orientation", "vertical");
    };

    var setupTabs = function setupTabs() {
      tabs.forEach(function (tab, index) {
        tab.setAttribute('role', 'tab'); // each tab needs an ID that will be used to label its corresponding panel

        tab.setAttribute('id', tabsID + '__tab-' + index); // first tab is initially active

        if (index === currentIndex) {
          selectTab(tab);
        }

        tab.addEventListener('click', function (e) {
          e.preventDefault();
          currentIndex = index;
          focusCurrentTab();
          selectTab(tab);
        }, false);
        tab.addEventListener('keydown', function (e) {
          tabKeyboardRespond(e, tab);
        }, false);
      });
    };

    var focusCurrentTab = function focusCurrentTab() {
      tabs[currentIndex].focus();
    };

    var selectTab = function selectTab(tab) {
      // unactivate all other tabs
      tabs.forEach(function (tab) {
        tab.setAttribute('aria-selected', 'false');
        tab.setAttribute('tabindex', '-1');
      }); //activate current tab

      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      tab.focus(); // activate corresponding panel accordingly

      activatePanel(tab);
    };

    var setupTabPanels = function setupTabPanels() {
      tabpanels.forEach(function (tabpanel, index) {
        tabpanel.setAttribute('role', 'tabpanel');
        tabpanel.setAttribute('tabindex', '-1');
        tabpanel.setAttribute('hidden', '');

        if (index == currentIndex) {
          tabpanel.removeAttribute('hidden');
        }

        tabpanel.addEventListener('keydown', function (e) {
          panelKeyboardRespond(e);
        }, false);
        tabpanel.addEventListener("blur", function () {
          tabpanel.setAttribute('tabindex', '-1');
        }, false);
      });
    };

    var panelKeyboardRespond = function panelKeyboardRespond(e) {
      var keyCode = e.keyCode || e.which;

      switch (keyCode) {
        case util.keyCodes.TAB:
          tabpanels[currentIndex].setAttribute('tabindex', '-1');
          break;

        default:
          break;
      }
    };

    var activatePanel = function activatePanel(tab) {
      tabpanels.forEach(function (tabpanel, index) {
        tabpanel.setAttribute('hidden', ''); // tabpanel.setAttribute('tabindex', '-1');

        tabpanel.removeAttribute('tabindex');

        if (index == currentIndex) {
          tabpanel.removeAttribute('hidden');
          tabpanel.setAttribute('aria-labelledby', tabs[currentIndex].getAttribute('id'));
          tabpanel.setAttribute('tabindex', '0');
        }
      });
    };

    var incrementcurrentIndex = function incrementcurrentIndex() {
      if (currentIndex < tabs.length - 1) {
        return ++currentIndex;
      } else {
        currentIndex = 0;
        return currentIndex;
      }
    }; // incrementcurrentIndex()


    var decrementcurrentIndex = function decrementcurrentIndex() {
      if (currentIndex > 0) {
        return --currentIndex;
      } else {
        currentIndex = tabs.length - 1;
        return currentIndex;
      }
    }; // decrementcurrentIndex()
    // keyboard interactions


    var tabKeyboardRespond = function tabKeyboardRespond(e, tab) {
      var firstTab = tabs[0];
      var lastTab = tabs[tabs.length - 1];
      var keyCode = e.keyCode || e.which;

      switch (keyCode) {
        case util.keyCodes.UP:
        case util.keyCodes.LEFT:
          e.preventDefault();
          decrementcurrentIndex();
          console.log("currentIndex: " + currentIndex);
          console.log("selectedTab: " + selectedTab);
          focusCurrentTab();
          break;

        case util.keyCodes.DOWN:
        case util.keyCodes.RIGHT:
          e.preventDefault();
          incrementcurrentIndex();
          console.log("currentIndex: " + currentIndex);
          console.log("selectedTab: " + selectedTab);
          focusCurrentTab();
          break;

        case util.keyCodes.ENTER:
        case util.keyCodes.SPACE:
          e.preventDefault();
          selectedTab = currentIndex;
          console.log("currentIndex: " + currentIndex);
          console.log("selectedTab: " + selectedTab);
          selectTab(tabs[selectedTab]);
          break;

        case util.keyCodes.TAB:
          tabpanels[selectedTab].setAttribute('tabindex', '0');
          currentIndex = selectedTab;
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

    init.call(this);
    return this;
  }; // ARIAtabs()


  w.ARIAtabs = ARIAtabs;
})(window, document);

var tabsInstance = "[data-tabs]";
var els = document.querySelectorAll(tabsInstance);
var allTabs = []; // Generate all accordion instances

for (var i = 0; i < els.length; i++) {
  var nTabs = new ARIAtabs(els[i]);
  allTabs.push(nTabs);
}