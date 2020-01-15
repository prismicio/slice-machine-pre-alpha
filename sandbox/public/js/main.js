"use strict";

/************************************************************************************************
 * 
 * This function calculates the width of the browser scrollbar,
 * and then stores this value in the CSS variable --scrollbar 
 * source: https://codepen.io/Mamboleoo/post/scrollbars-and-css-custom-properties#my-solution-5
 * 
 *************************************************************************************************/
(function () {
  var getScrollbarWidth = function getScrollbarWidth() {
    // Create a temporary div container and append it into the body
    var container = document.createElement('div'); // Append the container in the body

    document.body.appendChild(container); // Force scrollbar on the container

    container.style.overflow = 'scroll'; // Add ad fake div inside the container

    var inner = document.createElement('div');
    container.appendChild(inner); // Calculate the width based on the container width minus its child width

    var width = container.offsetWidth - inner.offsetWidth; // Remove the container from the body

    document.body.removeChild(container);
    return width;
  }; // Get the scrollbar dimension


  var scrollbarWidth = getScrollbarWidth(); // Set a custom property with the value we calculated

  document.documentElement.style.setProperty('--scrollbar', "".concat(scrollbarWidth, "px"));
})();
