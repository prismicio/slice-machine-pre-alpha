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
  var video_player_wrapper = document.querySelector("[data-video-player]"),
      video_container = document.querySelector("[data-video-player] [data-video]"),
      video_player = video_container.querySelector("iframe"),
      video_playlist_container = document.querySelector("[data-video-player] [data-playlist]"),
      video_playlist = video_playlist_container.querySelector("ul"),
      video_playlist_items = Array.from(video_playlist.querySelectorAll("li")),
      video_playlist_sources = Array.from(video_playlist.querySelectorAll("a")),
      video_id = util.generateID('ps__video-player-');
  video_player_wrapper.setAttribute('id', video_id);

  var init = function init() {
    video_player_wrapper.classList.add('js-video-player');
    setupTabList();
    setupTabs();
    setupTabPanel();
  }; // enhance links to tabs
  // show video player and set the src of the iframe to the first link
  // tab list <ul> gets role "tablist" and must have a label


  var setupTabList = function setupTabList() {
    video_playlist.setAttribute("role", "tablist");
    video_playlist.setAttribute("aria-label", "Video Playlist");
    video_playlist.setAttribute("aria-orientation", "vertical");
  }; // LI's get role presentation
  // the <a>s get role tab


  var setupTabs = function setupTabs() {
    video_playlist_items.forEach(function (item, index) {
      item.setAttribute('role', 'presentation');
    }); // each link is set to become a tab
    // the href needs to be removed so it doesn't act like link anymore and isn't styled as a link in 

    video_playlist_sources.forEach(function (tab, index) {
      tab.setAttribute('role', 'tab');
      tab.setAttribute('data-href', tab.getAttribute('href'));
      tab.setAttribute('href', '#'); // each tab needs an ID that will be used to label its corresponding panel

      tab.setAttribute('id', video_id + util.generateID('__tab-')); // first tab is initially active

      if (index === 0) {
        selectTab(tab);
      }

      tab.addEventListener('click', function (e) {
        e.preventDefault();
        selectTab(tab);
      }, false);
      tab.addEventListener('keydown', function (e) {
        tabKeyboardRespond(e, tab);
      }, false);
    });
  };

  var selectTab = function selectTab(tab) {
    // unselect all other tabs
    video_playlist_sources.forEach(function (tab) {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
    }); //select current tab

    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0'); // activate corresponding panel accordingly

    activatePanel(tab);
  }; // data-video is shown
  // it has role tabpanel


  var setupTabPanel = function setupTabPanel() {
    video_container.removeAttribute('hidden');
    video_container.setAttribute('role', 'tabpanel');
    video_container.setAttribute('tabindex', '-1');
    video_container.addEventListener('keydown', function (e) {
      panelKeyboardRespond(e);
    }, false);
    video_container.addEventListener("blur", function () {
      video_container.removeAttribute('tabindex');
    }, false);
  };

  var panelKeyboardRespond = function panelKeyboardRespond(e) {
    var keyCode = e.keyCode || e.which;

    switch (keyCode) {
      case util.keyCodes.TAB:
        video_container.removeAttribute('tabindex');
        break;

      default:
        break;
    }
  }; // tabpanel has aria-labelledby set to the currently selected tab
  // currently selected tab is set with aria-selected="true"
  // iframe in the tabpanel has src 


  var activatePanel = function activatePanel(tab) {
    var vidTitle = tab.innerText;
    video_container.setAttribute('aria-labelledby', tab.getAttribute('id'));
    video_player.setAttribute('src', tab.getAttribute('data-href'));
    video_player.setAttribute('title', 'Video Player: ' + vidTitle);
    video_container.setAttribute('tabindex', '0');
  }; // keyboard interactions


  var tabKeyboardRespond = function tabKeyboardRespond(e, tab) {
    var nextTab = tab.parentNode.nextElementSibling ? tab.parentNode.nextElementSibling.querySelector("[role='tab']") : false,
        previousTab = tab.parentNode.previousElementSibling ? tab.parentNode.previousElementSibling.querySelector("[role='tab']") : false,
        firstTab = video_playlist_sources[0],
        lastTab = video_playlist_sources[video_playlist_sources.length - 1];
    var keyCode = e.keyCode || e.which;

    switch (keyCode) {
      case util.keyCodes.UP:
        e.preventDefault();

        if (!previousTab) {
          lastTab.focus(); // keep focus within component
        } else {
          previousTab.focus();
        }

        break;

      case util.keyCodes.DOWN:
        e.preventDefault();

        if (!nextTab) {
          firstTab.focus(); // keep focus within component
        } else {
          nextTab.focus();
        }

        break;

      case util.keyCodes.ENTER:
      case util.keyCodes.SPACE:
        e.preventDefault();
        selectTab(tab);
        break;

      case util.keyCodes.TAB:
        video_container.setAttribute('tabindex', '0');
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

  init();
})();