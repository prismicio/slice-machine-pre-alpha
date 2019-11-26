// TODO: generate random IDs for the buttons and panels because otherwise IDs would clash if you have more than one instance of the accordion on the page


"use strict";

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

    generateID: function (base) {
        return base + Math.floor(Math.random() * 999);
    },

    getDirectChildren: function (elm, selector) {
        return Array.prototype.filter.call(elm.children, function (child) {
            return child.matches(selector);
        });
    }
};




(function (w, doc, undefined) {

    var ARIAaccOptions = {
        showOneAnswerAtATime: false,
        allCollapsed: true,
        withControls: true,

        // the following needs to be an SVG icon
        // we will be dynamically inserting this icon into the buttons in this script
        // you could, alternatively, insert the icons inline in the code and hide them, and show them from here
        icon:
            '<svg aria-hidden="true" focusable="false" width="50" height="50" viewBox="0 0 50 50" class="accordion-icon"><circle stroke-width="2" fill="transparent" stroke="currentColor" cx="16" cy="16" r="16" transform="translate(9 9)"/><path stroke-width="2" stroke="currentColor" fill="none" d="M20 23l5.5 5.092 5.5-5.092" /></svg>'
    }
    /**
     * ARIA Accordion
     * Creates a tab list to toggle the visibility of
     * different subsections of a document.
     *
     * Author: Sara Soueidan
     * Version: 0.2.0
     */

    var ARIAaccordion = function (inst, options) {
        var _options = Object.assign(ARIAaccOptions, options);
        var el = inst;
        var accordionHeadings = el.querySelectorAll("[data-accordion-heading]");
        var accordionPanels = el.querySelectorAll("[data-accordion-panel]");
        var controlsWrapper;
        var expandButton;
        var collapseButton;

        var init = function () {

            // if you have any functionality in CSS that needs JS to be activated
            // this class added to the accordion container works as a JS hook to announce JS is enabled
            // in the CSS, we have a part that adds borders and paddings to the headings, buttons and panels
            // these borders and padding are only needed if the content turns into an accordion
            el.classList.add("accordion-js");

            setupAccordionHeadings(accordionHeadings);
            setupAccordionPanels(accordionPanels);

            if (_options.withControls) {
                createControls();
            }
        }

        var createControls = function () {
            controlsWrapper = document.createElement("div");
            controlsWrapper.setAttribute("data-accordion-controls", "");
            el.prepend(controlsWrapper);

            expandButton = document.createElement("button");
            expandButton.setAttribute("data-accordion-control", "expand");
            expandButton.setAttribute("aria-label", "Expand all panels");
            expandButton.innerText = "Expand All";
            controlsWrapper.appendChild(expandButton);

            collapseButton = document.createElement("button");
            collapseButton.setAttribute("data-accordion-control", "collapse");
            collapseButton.setAttribute("aria-label", "Collapse all panels");
            collapseButton.innerText = "collapse All";
            controlsWrapper.appendChild(collapseButton);

            // if we start out with an accordion whose panels are collapsed (as opposed to open)
            // disable the Collapse All button
            if (_options.allCollapsed) disableCollapseButton();

            setupAccordionControls();
        }

        var setupAccordionControls = function () {
            expandButton.addEventListener("click", function () {
                // expand them all

                Array.from(accordionHeadings).forEach(function (item, index) {
                    item.querySelector("button").setAttribute("aria-expanded", "true");
                });

                Array.from(accordionPanels).forEach(function (item, index) {
                    item.setAttribute("aria-hidden", "false");
                });

                disableExpandButton();
                enableCollapseButton();
            });

            collapseButton.addEventListener("click", function () {
                Array.from(accordionHeadings).forEach(function (item, index) {
                    item.querySelector("button").setAttribute("aria-expanded", "false");
                });

                Array.from(accordionPanels).forEach(function (item, index) {
                    item.setAttribute("aria-hidden", "true");
                });

                disableCollapseButton();
                enableExpandButton();
            });
        }

        var setupAccordionHeadings = function (accordionHeadings) {
            Array.from(accordionHeadings).forEach(function (item, index) {
                var $this = item;
                $this.setAttribute("id", "c-accordion-heading-" + index);

                let text = $this.innerText;
                let headingButton = document.createElement("button");
                headingButton.setAttribute("aria-controls", "c-accordion-panel-" + index);
                headingButton.setAttribute("aria-expanded", "false");
                headingButton.setAttribute("data-accordion-toggle", "");
                headingButton.innerText = text;

                $this.innerHTML = "";

                $this.appendChild(headingButton);
                headingButton.innerHTML += _options.icon;

                headingButton.addEventListener("click", function (e) {
                    togglePanel(headingButton);
                });

                // headingButton.addEventListener("keydown", function (e) {
                // enableKeyboardInteractions(headingButton, e);
                // });
            });
        }

        var setupAccordionPanels = function (accordionPanels) {
            Array.from(accordionPanels).forEach(function (item, index) {
                let $this = item;

                $this.setAttribute("id", "c-accordion-panel-" + index);
                // $this.setAttribute('aria-labelledby', "c-accordion-heading-" + index);
                $this.setAttribute("aria-hidden", "true");
            });
        }

        var togglePanel = function (toggleButton) {
            var thepanel = toggleButton.parentNode.nextElementSibling;

            if (toggleButton.getAttribute("aria-expanded") == "true") {
                toggleButton.setAttribute("aria-expanded", "false");
                thepanel.setAttribute("aria-hidden", "true");

                checkToggleCollapseButtonState();
                checkToggleExpandButtonState();
            } else {
                if (_options.showOneAnswerAtATime) {
                    // Hide all answers
                    accordionPanels.setAttribute("aria-hidden", "true");
                    accordionHeadings
                        .querySelector("button")
                        .setAttribute("aria-expanded", "false");

                    checkToggleCollapseButtonState();
                    checkToggleExpandButtonState();
                }

                // Show answer
                toggleButton.setAttribute("aria-expanded", "true");
                thepanel.setAttribute("aria-hidden", "false");

                checkToggleCollapseButtonState();
                checkToggleExpandButtonState();
            }
        }

        // commented out because there is a discussion that the user's UP/DOWN/LEFT/RIGHT keys should
        // maintain their default behavior for scrolling the page, rather than be used in the accordion

        // var enableKeyboardInteractions = function (elem, e) {
        //     var keyCode = e.which,
        //         // check if the element exists first, otherwis this throws an error
        //         // if it does, get the button in it, we'll focus it on keyboard event
        //         nextHeading = elem.parentNode.nextElementSibling.nextElementSibling
        //             ? elem.parentNode.nextElementSibling.nextElementSibling.querySelector(
        //                 "button"
        //             )
        //             : false,
        //         // check if the element exists first, otherwis this throws an error
        //         // if it does, get the button in it, we'll focus it on keyboard event
        //         previousHeading = elem.parentNode.previousElementSibling
        //             .previousElementSibling
        //             ? elem.parentNode.previousElementSibling.previousElementSibling.querySelector(
        //                 "button"
        //             )
        //             : false,
        //         // get the first in the nodelist of headings in the accordion
        //         firstHeading = accordion.querySelectorAll("[data-accordion-toggle]")[0],
        //         lastHeading = accordion.querySelectorAll("[data-accordion-toggle]")[
        //             accordionHeadings.length - 1
        //         ];

        //     switch (keyCode) {
        //         // Left/Up
        //         case 37:
        //         case 38:
        //             e.preventDefault();
        //             e.stopPropagation();

        //             if (!previousHeading) {
        //                 lastHeading.focus(); // keep focus within component
        //             } else {
        //                 previousHeading.focus();
        //             }

        //             break;

        //         // Right/Down
        //         case 39:
        //         case 40:
        //             e.preventDefault();
        //             e.stopPropagation();

        //             if (!nextHeading) {
        //                 firstHeading.focus(); // keep focus within component
        //             } else {
        //                 nextHeading.focus();
        //             }

        //             break;

        //         // Home
        //         case 36:
        //             e.preventDefault();
        //             e.stopPropagation();
        //             firstHeading.focus();
        //             break;

        //         // End
        //         case 35:
        //             e.preventDefault();
        //             e.stopPropagation();
        //             lastHeading.focus();
        //             break;
        //     }
        // }

        var enableCollapseButton = function () {
            collapseButton.removeAttribute("disabled");
        }

        var disableCollapseButton = function () {
            collapseButton.setAttribute("disabled", "disabled");
        }

        var enableExpandButton = function () {
            expandButton.removeAttribute("disabled");
        }

        var disableExpandButton = function () {
            expandButton.setAttribute("disabled", "disabled");
        }

        var checkToggleExpandButtonState = function () {
            var closedPanels = el.querySelectorAll(
                'button[aria-expanded="false"]'
            ); // find any and all collapsed panels

            if (!closedPanels.length) {
                disableExpandButton();
            } else {
                enableExpandButton();
            }
        }

        var checkToggleCollapseButtonState = function () {
            var openPanels = el.querySelectorAll(
                'button[aria-expanded="true"]'
            ); // find any and all expanded panels

            if (openPanels.length === 0) {
                disableCollapseButton();
            } else {
                enableCollapseButton();
            }
        }

        init.call(this);
        return this;
    }; // ARIAtabs()

    w.ARIAaccordion = ARIAaccordion;
})(window, document);


var accInstance = "[data-accordion]";
var els = document.querySelectorAll(accInstance);
var allAccs = [];

// Generate all accordion instances
for (var i = 0; i < els.length; i++) {
    var nAccs = new ARIAaccordion(els[i]);
    // var nAccs = new ARIAaccordion(els[i], { withControls: false });

    allAccs.push(nAccs);
}
