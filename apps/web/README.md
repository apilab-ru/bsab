# web

A public catalogue of **Beat Saber** custom maps. You can search and filter maps, preview them in an
embedded player, then install or download them. Logged-in users also get "showed" tracking and
recommendations.

App https://bsab.apilab.ru/
Api https://api.apilab.ru/bsab/swagger#/ (https://github.com/apilab-ru/bsab)

## Run

```bash
npx nx serve web          # dev server on http://localhost:4200 (HMR on)
npx nx build web          # production build to dist/apps/web
npx nx test web
npx nx lint web
```

`src/.htaccess` is copied into the build. It is used when the app is hosted on Apache, so that
client-side routes fall back to `index.html`.

## Configuration

| File | Key | Value |
| --- | --- | --- |
| `src/environments/environment.ts` | `api` | `https://api2.apilab.ru/bsab` |
| `src/environments/environment.prod.ts` | `api` | `https://api2.apilab.ru/bsab` |
| `proxy.conf.json` | `/api` | proxied to `http://localhost:3333` (dev server only) |
| `src/app/services/const.ts` | `MAPS_LIMIT` / `LOAD_NEXT_OFFSET` | page size (40) and how close to the end of the list the next page loads (20) |

**Local API (optional).** On the Profile page a user can set a `localApi` URL. It is saved in
`localStorage`. When it is set, cover, sound and download URLs go through
`<localApi>/proxy/file?file=...`. The **To Playlist** button always posts to
`https://localhost:3333/playlists/gen-playlist.bplist/add-song/:id`. That URL is hard-coded in
`local-api.service.ts`.

## Routes

| Path | Component | Purpose |
| --- | --- | --- |
| `/` | `modules/maps/maps-root` | Map list with filter, sorting, infinite scroll and the details/player dialog |
| `/profile` | `modules/user/profile` | Import IDs of maps you have already seen, and edit the user config (`localApi`) |

### URL state

The map list state is stored in the URL, so links can be shared:

- `?filter=<JSON SearchValue[]>`: active filter chips
- `&orderField=...&orderDirection=...`: added only when they differ from the defaults (`createdAt` / `desc`)
- `#<offset>`: scroll position. On reload, the list starts from this offset.

## Architecture

```
src/app
├── app.tsx                 routes + notistack SnackbarProvider
├── helpers/url.ts          query-string builder
├── models/                 search/filter definitions, notification and user-config types
├── modules/
│   ├── layout/             header (title, filter slot, login/profile) and footer (loader, counters, snackbars)
│   ├── maps/               maps-root → maps → maps-page → maps-list / map-details / order-control / tags
│   └── user/               auth dialog (login + registration), profile page
├── services/               API clients (maps, users, local API) and filter → URL helper
├── store/                  Redux Toolkit store (main state)
└── store-mobx/             experimental MobX user service (only used for a debug print on /profile)
```

### State (Redux Toolkit + redux-observable)

| Slice | State | Notes |
| --- | --- | --- |
| `filter` | `values`, `orderField`, `orderDirection`, `offset`, `baseOffset` | The `filterQueryUpdater` middleware (`store/filter/middleware.ts`) pushes every filter change to the URL and dispatches `maps/load`. It also loads the next page when the scroll offset gets near the end of the list. |
| `maps` | `list`, `isLoading`, `openedId`, `showed`, `total`, `hasMore` | `mapsLoadEpic` (`store/maps/epics.ts`) debounces `maps/load` by 100 ms, waits until the user is resolved, then calls the API with the user's token and `localApi`. |
| `user` | `user`, `config`, `loading`, `error`, `notifications` | Thunks in `store/user/middlewares.ts`: `userLoad` (from `localStorage`), `userLogin`, `userRegistration`. `notifications` are shown as snackbars by the footer. |

Opening a map dispatches `mapMarkShowed`. This adds the map to `showed` locally and, if the user is
logged in, calls `POST /maps/showed`.

### Backend endpoints used

| Method | Path | Used by |
| --- | --- | --- |
| GET | `/maps/list?limit&offset&orderField&orderDirection&<filter fields>` | map list (optional `Authorization: Bearer`) |
| POST | `/maps/showed` `{ id }` | mark one map as seen |
| POST | `/maps/showed-list` `{ ids }` | bulk import on the profile page |
| POST | `/maps/not-work` `{ id }` | report a broken map (no button calls it at the moment) |
| POST | `/users/login`, `/users/registration` | auth dialog |

### Filters

`models/search.ts` defines the available filter chips (`FILTER_ITEMS`) and the sort fields
(`ORDER_FIELDS`). The filter chips are: Search, Tag (positive/negative), NPS from/to, Date from,
Showed\*, Ranked, Recommended\*, BPM from/to, Duration from/to, Score from and BL Ranked.
\* = only for logged-in users.

`prepareFilterRequest` turns chips into `FilterRequest`. Tags are split into
`tagsPositive` and `tagsNegative`.

## Dependencies

- `@bsab/ui-kit`: `Filter`, `MapListItem`, `MapPlayer` (iframe viewer), `MapDifficult`, `ProgressLoader`, `Input`, tag list
- `@bsab/api`: `MapDetail`, `PageResponse`, `FilterKey`, `OrderField`, `User`, …
- `@shared`: `buildForm`, `StorePayload`, `makeCheckAction`, `hashCodeNumber`
- MUI 5, notistack, date-fns, lodash, axios, rxjs, mobx

## Known rough edges

- `store-mobx/user-service.ts` is a prototype. It emits a fake user every 3 s and is printed on `/profile`.
- `App` dispatches `userLoad()` on every render, not inside an effect.
- The "Import liked songs" and "Parsing" buttons on `/profile` don't do anything yet.
- `plans.md` holds the TODO list (in Russian).
