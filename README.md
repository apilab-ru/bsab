# Bsab

Nx monorepo (Nx 15, React 18, TypeScript) with tools for **Beat Saber** custom maps, plus a
companion app for the game **Ratopia**.

## Projects

| Project | Type | Path | What it is |
| --- | --- | --- | --- |
| [`web`](apps/web/README.md) | app | `apps/web` | Public catalogue of Beat Saber maps: search, filter, preview, install. |
| [`local-web`](apps/local-web/README.md) | app | `apps/local-web` | UI for a local API: manage local maps, playlists and Cinema videos. |
| [`ratopia-dictionary`](apps/ratopia-dictionary/README.md) | app | `apps/ratopia-dictionary` | Trade helper for Ratopia that reads live game data from a local bridge. |
| [`ui-kit`](libs/ui-kit/README.md) | lib | `libs/ui-kit` | Shared React components: filter, map card, map players, loaders. |
| [`shared`](libs/shared/README.md) | lib | `libs/shared` | Small framework-agnostic helpers (forms, Redux helpers, hashing). |
| [`bsab-models`](libs/bsab-models/README.md) | lib (git submodule) | `libs/bsab-models` | TypeScript models shared with the backend API. |

Dependency graph (run `npx nx graph` for the live version):

```
web                ──> ui-kit, bsab-models, shared
local-web          ──> ui-kit, bsab-models
ratopia-dictionary ──> shared
ui-kit             ──> bsab-models
```

### Import aliases (`tsconfig.base.json`)

| Alias | Points to |
| --- | --- |
| `@bsab/api/*` | `libs/bsab-models/src/*` |
| `@bsab/ui-kit/*` | `libs/ui-kit/src/*` |
| `@shared/*` | `libs/shared/src/*` |

## Getting started

```bash
git clone --recurse-submodules <repo-url>
# or, in an existing clone:
git submodule update --init

npm install
```

`libs/bsab-models` is a git submodule. Without it, `web`, `local-web` and `ui-kit` will not compile.

## Common commands

```bash
npx nx serve web                  # http://localhost:4200
npx nx serve local-web            # http://localhost:4212
npx nx serve ratopia-dictionary   # http://localhost:4200 (default port, clashes with web)
npx nx storybook ui-kit           # http://localhost:4400

npx nx build <project>            # production build to dist/apps/<project>
npx nx test <project>             # Jest unit tests
npx nx lint <project>             # ESLint
npx nx affected:test              # test only projects changed vs. master
```

To run `web` and `ratopia-dictionary` at the same time, pass a port:
`npx nx serve ratopia-dictionary --port 4201`.

## External services

The apps in this repo are frontends only. The backends they call live elsewhere:

| App | Backend | Configured in |
| --- | --- | --- |
| `web` | Remote bsab API `https://api2.apilab.ru/bsab`, plus an optional local API | `apps/web/src/environments/` |
| `local-web` | Local API at `https://localhost:3333/` (formerly the `local-api` project, no longer in this repo) | `apps/local-web/src/environments/` |
| `ratopia-dictionary` | Local game bridge at `http://localhost:5000` | `apps/ratopia-dictionary/src/environments/` |

## Tooling

- **Nx 15.2** with the `@nrwl/react`, `@nrwl/webpack`, `@nrwl/jest` and `@nrwl/storybook` plugins.
  The default project is `web`, so `npm start`, `npm run build` and `npm test` use `web`.
- **Babel** compiles the apps (`compiler: "babel"`). Styles are SCSS, mostly CSS modules (`*.module.scss`).
- **Jest 28** for tests, **ESLint 8** and **Prettier 2** (single quotes) for code style.
- **Storybook 6.5** for `ui-kit`.
- **knip** is installed and can find unused files, exports and dependencies: `npx knip`.

## Generating code

```bash
npx nx g @nrwl/react:app my-app                         # new application
npx nx g @nrwl/react:lib my-lib                         # new library (add an alias to tsconfig.base.json)
npx nx g @nrwl/react:component my-cmp --project=my-app  # new component
npx nx g @nrwl/react:storybook-configuration my-lib     # add Storybook to a project
```

The generator defaults in `nx.json` use SCSS, Jest and ESLint.
