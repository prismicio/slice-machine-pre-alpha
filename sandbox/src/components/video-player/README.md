## Notes:

- To use the dark version of the slice, add a classname `ps-video-player--dark` to the slice container as shown in the markup for the dark version.

## Interactivity Requirements:

In order for the script to enhance the list of links into the video player:

- The video player and playlist need to be wrapped in a container with `data-video-player` on it.
- The video itself (an `iframe`) needs to be wrapped in a container with `data-video` on it. Initially, it's not shown and will be shown using JS because the widget is only interactive when JS is enabled anyway. So a `hidden` attribute is set on it.
- The video playlist is wrapped in a container with `data-playlist` on it.

The only thing that the user needs to provide is the list of links to videos. 