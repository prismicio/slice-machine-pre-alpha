"use strict";

var dw_toggle = document.getElementById('dw-toggle');
var dw_panel = document.getElementById('dw-panel');
var ariaState = dw_toggle.getAttribute('aria-expanded'); // if the attribute is not set..

if (ariaState === null) {
  // panel is not expanded by default
  dw_toggle.setAttribute('aria-expanded', 'false');
  dw_toggle.removeAttribute('hidden');
}

dw_toggle.addEventListener('click', togglePanel, false);

function togglePanel() {
  var currentState = dw_toggle.getAttribute('aria-expanded'); // if it's true, set it to false, and vice versa

  var newState = currentState === 'true' ? 'false' : 'true';
  dw_toggle.setAttribute('aria-expanded', newState);
}