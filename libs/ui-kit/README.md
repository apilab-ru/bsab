# ui-kit

React components shared by the Beat Saber apps (`web`, `local-web`). Built on MUI 5 and SCSS.
Import with the `@bsab/ui-kit/*` alias:

```ts
import { Filter, FilterItemType, SearchValue } from '@bsab/ui-kit/filter';
import { MapListItem } from '@bsab/ui-kit/map-list-item';
import { MapPlayer } from '@bsab/ui-kit/map-player';
```

## Storybook

```bash
npx nx storybook ui-kit          # http://localhost:4400
npx nx build-storybook ui-kit    # dist/storybook/ui-kit
```

Stories: `filter`, `map-player-v2`, `stars`.

## Components

| Module | Export | Description |
| --- | --- | --- |
| `filter` | `Filter`, `SearchValue`, `FilterItem`, `FilterItemType` | Search bar made of chips. Opens a popover to pick a filter group, then a value. Supports `list`, `write` (free text) and `boolean` items, negated ("Not …") values, `unique` items and `userRequired` items (hidden unless `userExist`). Controlled through `values`, `onAddValue` and `onDeleteValue`. |
| `filter/models/tags` | `TAGS`, `TAGS_LIST` | BeatSaver tag IDs and names, used as the values for the Tag filter |
| `map-list-item` | `MapListItem`, `IMapItem` | Map card: cover, score bar, title / sub-title / author, BPM, date, duration and difficulties. Takes `children` and `row` slots for extra controls. |
| `map-difficult` | `MapDifficult` | Colored difficulty badges with NPS (Easy … Expert+) |
| `map-player` | `MapPlayer` | MUI dialog with an iframe viewer. A plain map ID opens in ArcViewer (`allpoland.github.io/ArcViewer`), any other URL opens in `skystudioapps.com/bs-viewer`. Children are shown under the player. |
| `map-player-v2` | `MapPlayerV2` | **Experimental** built-in player. It downloads the map zip (JSZip), parses `info.dat` and the difficulty `.dat` files (v2 format), and draws the notes with three.js in sync with an `<audio>` element. |
| `input` | `Input` | MUI `TextField` that keeps its own state, starting from the `value` prop (uncontrolled) |
| `progress-loader` | `ProgressLoader` | Thin animated loading bar |
| `date-utils/duration` | `formatDuration(sec)` | `125` → `"2:05"` |
| `theme/colors.scss` | — | Shared SCSS color variables |
| `stars` | `Stars` | Placeholder (generator stub) |

## Dependencies

- `@bsab/api` (the `libs/bsab-models` submodule): map, difficulty and request models
- MUI 5, date-fns, jszip, three

## Commands

```bash
npx nx test ui-kit
npx nx lint ui-kit
```
