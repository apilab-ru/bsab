# ratopia-dictionary

A helper app for the game **Ratopia**. It connects to a local bridge that reads the running game,
then shows every country's import and export offers in one sortable table, with prices converted
between the two in-game currencies (**gold** and **dar**). It can also send a few commands back to
the game.

The UI text is in Russian, and resource names come from the game dictionary.

## Run

```bash
npx nx serve ratopia-dictionary            # http://localhost:4200
npx nx build ratopia-dictionary            # dist/apps/ratopia-dictionary
```

The app expects a bridge server at **`http://localhost:5000`** (`src/environments/environment.ts`).
That server is not part of this repo.

To work without the game, use the bundled mocks. In `environment.ts`, set
`api: '/assets/mock'` and `apiPostfix: '.json'`. Note that the mocks only serve requests that add
`apiPostfix` (`/ping` and `/dictionary`). `/diplomatic-data` will still fail.

## Bridge API

| Method | Path | Response / effect |
| --- | --- | --- |
| GET | `/ping` | `{ result: true }` when the game is reachable |
| GET | `/dictionary` | `{ tiles: Record<resourceKey, localizedName> }` |
| GET | `/diplomatic-data` | `{ resList: City[], currency }`: per-country trades, relations and the dar→gold rate |
| GET | `/refresh-citizen` | sends the "refresh citizens" command to the game |
| GET | `/open/:page` | opens an in-game window (`policy`, `diplomacy`, `trading`, `blacksmith`, `expedition`, `kitchen`, `eat`) |

## Routes

| Path | Page | What it shows |
| --- | --- | --- |
| `/traders` | `pages/traders-page` | Connect/disconnect toggle, currency rate and converter, and a trade table (MUI DataGrid) filterable by currency, direction and resource |
| `/statistic` | `pages/statistic-page` | Buttons that open in-game windows through `/open/:page` |

Also in `pages/` but not routed: `setup` (manual country and stock editor), `resources`
(table of resource icons), `home`, `connect-page`.

## How it works

- **`connectionService`**: pings the bridge. When connected, `App` calls `refresh()` every 5 s,
  which loads `/diplomatic-data`. For each trade it computes the price with the relation modifier:
  - import: `ceil(price × (1.2 − (relation − 70) / 200) × package)`
  - export: `round(price × (0.8 + (relation − 70) / 200) × package)`

  Dar prices are converted using the current rate.
- **`gameStore`** (MobX): holds countries, the currency rate and the connection flag. It saves its
  state to `localStorage` under the key `raDic`. `traderResources` flattens everything into table rows
  and adds a `costGold` value so rows can be compared.
- **`dictionaryService`**: loads resource names the first time they are needed.
- **`TradersStore`**: filter state for the traders table, passed through `TradersContext`.
- Theme: MUI dark theme (`src/theme/theme.ts`) plus SCSS in `src/theme/theme.scss`.
- `webpack.config.js` turns off `url()` rewriting in `sass-loader`, so `/assets/...` paths in SCSS
  stay as they are. `project.json` doesn't reference this file at the moment
  (it uses `@nrwl/react/plugins/webpack`).

## Assets

| Folder | Contents |
| --- | --- |
| `src/assets/resources/` | Resource icons, `<Resource>Object.png` (see `getResourceIcon`) |
| `src/assets/countries/` | Country icons, `Icon_Country_<Key>.png` (see `getCountryIcon`) |
| `src/assets/struct/` | UI sprites: frames, navigation icons, currency icons |
| `src/assets/mock/` | Mock responses for offline development |

### Updating icons from the game

1. Extract the textures from the game's `resources.assets.resS`, for example with AssetRipper. They end up in
   `.../Ratopia_Data/exports/ExportedProject/Assets/Texture2D`.
2. Edit `sourceDir` and `destDir` in `src/app/scripts/copy-assets.js`. They are hard-coded Windows paths.
3. Run `node apps/ratopia-dictionary/src/app/scripts/copy-assets.js`. It copies every `*Object*.png` into
   `src/assets/resources`.

`src/app/scripts/read-files.js` lists the files in the game data folder and saves the list as `result.json`.

## Dependencies

- `@shared`: `useChangeInput`
- MUI 5 + `@mui/x-data-grid`, MobX / mobx-react, axios
