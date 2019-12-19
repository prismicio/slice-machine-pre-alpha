## Notes:

- To use the dark version of the slice, add a classname `ps-video-player--dark` to the slice container as shown in the markup for the dark version.

## Interactivity Requirements:

In order for the script to enhance the list of links into the video player:

- The video player and playlist need to be wrapped in a container with `data-video-player` on it.
- The video itself (an `iframe`) needs to be wrapped in a container with `data-video` on it. Initially, it's not shown and will be shown using JS because the widget is only interactive when JS is enabled anyway. So a `hidden` attribute is set on it.
- The video playlist is wrapped in a container with `data-playlist` on it.

The only thing that the user needs to provide is the list of links to videos. 

- The script turns the list of links into a list of "tabs" as far as screen readers as concerned.
- Each tab has `role="tab"` and a unique ID. 
- The container of the tabs has `role="tablist"`.
- Normally, each tab would control its own panel, but in this case they all control one panel.
- The content panel gets `role="tabpanel"`.
- When a tab is selected, `aria-selected="true"` is set on it, and the content panel (the video container) gets `aria-labelledby="#tabID"`, where `tabID` is the ID of the tab currently selected.
- The above roles we used will tell a screen reader that this is a tabbed interface, and the user will have certain expectations for interacting with it. They will expect to be able to navigate the tabs using arrow keys (up and down), and then press SPACE or ENTER to activate a tab. This keyboard support is adding in the JS.
- Focus management is therefore in order. When a user tabs to the component, focus should move to the currently selected tab only. The other tabs would only be accessible using arrow keys. This means that only the currently selected tab can have `tabindex="0"`. When a tab is not selected, it has `tabindex="-1"`.
- When the user tabs away from the currently selected tab, the focus moves to the tabpanel, and then to any focusable content inside of it.
- When the user tabs away from the tabpanel, it should get a `tabindex="-1"` so that keyboard focus continues to work as expected. All the keyboard focus management is handled in the JavaScript.
