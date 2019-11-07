// /* ********************************************************************************
//  *
//  * Stage 2 Web font loading using the CSS Font Loading API.
//  * Use this to load font styles that cause reflow, after having preloaded the important font styles in the <head> with preload and font-display;
//  * Sources:
//  *    - https://www.filamentgroup.com/lab/js-web-fonts.html
//  *    - https://github.com/zachleat/performance-sometime/blob/master/css-font-loading.js
//  *
//  **********************************************************************************/

// function loadFonts() {
//     // Asynchronously load two web fonts (no invisible text/FOIT), Render only once
//     // Promises (better compatibility)
//     if ("fonts" in document) {
//         // Make two
//         var font = new FontFace("Source Serif Pro");
//         var fontBold = new FontFace(
//             "Source Serif Pro",
//             "url(../fonts/sourceserifpro-bold-webfont.woff22) format('woff2'), url(../fonts/sourceserifpro-bold-webfont.woff) format('woff')",
//             { weight: "700" }
//         );

//         // Load two
//         Promise.all([font.load(), fontBold.load()]).then(loadedFonts => {
//             // Render them at the same time
//             loadedFonts.forEach(function(font) {
//                 document.fonts.add(font);
//             });
//         });
//     }
// }

// if (
//     "matchMedia" in window &&
//     window.matchMedia("(prefers-reduced-motion: reduce)").matches
// ) {
//     // do nothing
// } else {
//     loadFonts();
// }

// if (
//     navigator.connection &&
//     (navigator.connection.effectiveType === "slow-2g" ||
//         navigator.connection.effectiveType === "2g")
// ) {
//     // do nothing
// } else {
//     loadFonts();
// }
