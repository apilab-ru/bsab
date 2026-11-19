# local-web

UI for managing your **local** Beat Saber library through a local API server. You can browse the
installed custom maps, build and edit `.bplist` playlists, and attach **Cinema** mod videos to maps.

## Run

```bash
npx nx serve local-web    # http://localhost:4212
npx nx build local-web    # production build to dist/apps/local-web
npx nx test local-web
```

You need the local API running at **`https://localhost:3333/`** (`src/environments/environment*.ts`).
It used to be the `local-api` project in this workspace and has been removed from the repo. The
browser must trust its certificate: open `https://localhost:3333/` once and accept it.

## Routes

| Path | Page | Purpose |
| --- | --- | --- |
| `/` | `playlists/components/playlist-page` | Grid of playlists. Click one to open the editor (`?openedId=<id>`). |
| `/maps` | `maps/components/maps-page` | All local maps with client-side filtering, Cinema editor and "save as playlist" |

## Features

### Maps (`/maps`)
- Loads **all** local maps by fetching pages of 100 from `GET /maps` until `hasMore` is false.
- Client-side filters (`maps/models/filter-items.ts`): Search, Cinema, CinemaVideo, NPS from/to,
  Playlist, BPM from/to, Duration from/to. They are saved in the URL as `?filter=<JSON>`.
- When the `playlist` filter is set, each card gets a "remove from playlist" button.
- **Save as playlist**: creates a playlist from the maps that match the current filter
  (default cover: `playlists/services/playlist-image.ts`, a base64 AVIF image).
- **Cinema editor** (`cinema-editor`): upload or replace an `.mp4` (`POST /maps/:id/upload-video`),
  edit video metadata (`PATCH /maps/:id/cinema`), unlink the file, and search YouTube for the song.

### Playlists (`/`)
- Lists playlists (`GET /playlists`) with cover, title and song count, plus a link to `/maps` filtered by that playlist.
- Editor (`playlist-edit`): rename, upload and crop a cover image (`react-image-crop` +
  `canvasPreview` from `@bsab/api/utils`), reorder or remove songs, save (`PATCH /playlists/:id`), and
  delete (`DELETE /playlists/:id`).

## Architecture

State is held in **MobX** service singletons. Components read them with `useState(service)` and are
wrapped in `observer`. Data loads lazily the first time `list` is observed (`onBecomeObserved`).

```
src/app
├── app.tsx                    routes + SnackbarProvider
├── links.ts                   route paths and link builders
├── layout/components/         header (PlayLists / Maps nav) and footer (snackbar bridge)
├── maps/
│   ├── components/            maps-page, maps-list, cinema, cinema-editor, file-control, playlist-control
│   ├── models/filter-items.ts filter definitions
│   └── services/              maps-api.ts (HTTP), maps.service.ts (MobX store + filtering)
├── playlists/
│   ├── components/            playlist-page, playlist-container, playlist-edit
│   └── services/              playlist-api.ts (HTTP), playlists.service.ts (MobX store), playlist-image.ts
├── services/                  notification.service.ts (MobX), router.ts (query-string helper)
└── models/status.ts           DataStatus enum
```

### Local API endpoints used

| Method | Path |
| --- | --- |
| GET | `/maps?limit&offset` → `MapsResponse` |
| POST | `/maps/:id/upload-video` (multipart: `video`, `details`) |
| PATCH | `/maps/:id/cinema` |
| GET | `/map/:id/:videoFile` (video playback) |
| GET / POST | `/playlists` |
| PATCH / DELETE | `/playlists/:id` |

## Dependencies

- `@bsab/ui-kit`: `Filter`, `MapListItem`, `MapPlayer`
- `@bsab/api`: `LocalMap`, `MapCinema`, `Playlist`, `Song`, `MapsResponse`, `canvasPreview`
- MUI 5, MobX / mobx-react, notistack, react-image-crop, lodash, axios
