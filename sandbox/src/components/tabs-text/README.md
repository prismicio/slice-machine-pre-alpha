# Notes:

- Make sure to provide readable and meaningful IDs to the `data-tabpanel`s. Those IDs will be used in the URL to link to the specific tabpanel.
- If you want the tabs to open as soon as they are moved to / focused using keyboard, set `manual: false` in the config object.
- Make sure the `data-*` attributes in the markup are always there.
- Keep the source code order in mind: The first tab will control the first tabpanel (in the source order). The second tab will control the second tabpanel. And so on.
- **Make sure to provide succinct and meaningful tab titles to the dot navigation.**