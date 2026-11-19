# Upgrade plan: bsab → current libraries + React 19

Instructions for an LLM coding agent. Execute steps **in order**. Each step has an
**Action**, a **Verify** gate and a **Commit** message. Do not start the next step until
the current step's Verify gate passes.

Versions were checked on npm on 2026-11-19. Re-check with `npm view <pkg> version` before
starting; if a newer major exists, stop and ask the user.

---

## Rules for the agent

1. **Branch.** Work on branch `upgrade/2026` created from `master`. Never commit to `master`.
2. **One concern per commit.** Never upgrade Nx and React in the same step.
3. **Verify gate** (referred to below as `VERIFY`):
   ```bash
   npx nx run-many -t build test lint --skip-nx-cache
   ```
   A step passes when there are no failures **except** those recorded in `BASELINE.md` (Step 0.2).
   New failures must be fixed inside the same step.
4. **Use official tools first.** Prefer `nx migrate`, codemods and migration guides over hand edits.
   For anything released after your knowledge cutoff (Nx 23–24, MUI 9, mobx 7, Storybook 10,
   TypeScript 6), read the package's changelog / migration guide before editing. Do not guess
   breaking changes.
5. **Stop and ask the user** when:
   - a Verify gate still fails after 3 fix attempts,
   - a step requires deleting app features or changing behavior,
   - a dependency has no version compatible with the target (report the conflict).
6. **Submodule.** `libs/bsab-models` is a git submodule (separate repo). Commit changes there first
   (`cd libs/bsab-models && git commit`), then commit the updated pointer in the parent repo.
7. **Do not** change `src/environments/*` API URLs, backend contracts or UI text.
8. End each commit message with the attribution trailer required by the session.

## Target versions

| Package | From | To |
| --- | --- | --- |
| Node | any | 24 (≥ 22.22 required by react-router 7) |
| nx, `@nrwl/*` → `@nx/*` | 15.2.1 | 24.x |
| typescript | 4.8.4 | **6.0.x** (NOT 7 — `typescript-eslint` supports `<6.1`) |
| react, react-dom, @types/react(-dom) | 18.2 | 19.x |
| @mui/material, @mui/icons-material | 5 | 9.x |
| @mui/x-data-grid | 7 | 9.x |
| @emotion/react, @emotion/styled | 11.10 | 11.14 |
| @reduxjs/toolkit / react-redux | 1.9 / 8 | 2.x / 9.x |
| redux-observable | 2.0 | **remove** (replace with RTK listener middleware) |
| react-router-dom | 6.4 | 7.x (imports from `react-router`) |
| mobx / mobx-react | 6 / 7 | 7.x / 10.x |
| three / @types/three | 0.147 / 0.146 | 0.187 / matching |
| date-fns | 2 | 4 |
| react-image-crop | 10 | 11 |
| jest / @testing-library/react | 28 / 13 | 30 / 16 (+ `@testing-library/dom`) |
| eslint / prettier | 8 / 2 | 9–10 flat config / 3 |
| storybook | 6.5 | 10.x |
| axios, jszip, lodash, notistack | — | latest minor/patch |

## Project facts the agent needs

- Projects: apps `web`, `local-web`, `ratopia-dictionary`; libs `ui-kit`, `shared`, `bsab-models` (submodule).
- Aliases (`tsconfig.base.json`): `@bsab/api/*` → `libs/bsab-models/src/*`, `@bsab/ui-kit/*` → `libs/ui-kit/src/*`, `@shared/*` → `libs/shared/src/*`.
- Build: `@nrwl/webpack:webpack` with `compiler: "babel"`, SCSS (CSS modules), Jest, Storybook only in `ui-kit`.
- State: `web` = Redux Toolkit + one redux-observable epic; `local-web` and `ratopia-dictionary` = MobX singletons.
- Read the per-project `README.md` files before starting.

---

## Phase 0 — Preparation

### Step 0.1 — Branch and Node
**Action**
```bash
git checkout master && git pull && git submodule update --init
git checkout -b upgrade/2026
echo "24" > .nvmrc
node -v   # must be >= 22.22
npm ci
```
Add `"engines": { "node": ">=22.22" }` to root `package.json`.
**Verify** `npm ci` succeeds.
**Commit** `chore: pin node 24`

### Step 0.2 — Baseline
**Action** Run `VERIFY` and write every failing target and error summary to `BASELINE.md` in the repo root.
**Verify** `BASELINE.md` exists and lists results for all 6 projects.
**Commit** `chore: record upgrade baseline`

### Step 0.3 — Smoke tests
**Action** Ensure each app has a render smoke test that mounts `<App/>` inside required providers
(`web`: Redux `Provider` + `MemoryRouter`; others: `MemoryRouter`). Mock `axios`/`fetch` so no network is used.
Add a render test for `ui-kit` components `Filter`, `MapListItem`, `MapDifficult`.
**Verify** `npx nx run-many -t test` passes (excluding baseline failures).
**Commit** `test: add smoke tests before upgrade`

### Step 0.4 — Remove dead dependencies and config
**Action**
1. Run `npx knip` and review output.
2. Remove (confirm each is unused with grep first):
   `@nestjs/schematics`, `@nestjs/testing`, `@types/express`, `@types/cron`, `reflect-metadata`,
   `cypress`, `eslint-plugin-cypress`, `@nrwl/cypress`, `@storybook/theming`.
3. In every `project.json`, change `"$schema": "..\\..\\node_modules\\..."` to `"../../node_modules/nx/schemas/project-schema.json"`.
4. In `libs/bsab-models/project.json` (submodule): rename `api-interfaces` → `bsab-models`, fix `sourceRoot` and lint paths to `libs/bsab-models/...`. Commit inside the submodule first.
5. Do **not** remove `core-js`/`regenerator-runtime` yet (handled in Step 4.5).
**Verify** `npm install` clean, `VERIFY` passes, `npx nx show projects` lists all 6 projects.
**Commit** `chore: remove unused dependencies and fix project configs`

---

## Phase 1 — Nx 15 → 24 (React stays on 18)

### Step 1.N — Migrate one Nx major at a time
Repeat for `N` = 16, 17, 18, 19, 20, 21, 22, 23, 24. **Never skip a major.**

**Action**
```bash
npx nx migrate <N>            # e.g. npx nx migrate 16
npm install
npx nx migrate --run-migrations
rm -f migrations.json
```
Then fix anything the migrations could not handle. Known items per range:
- **16**: `@nrwl/*` → `@nx/*` (packages, executors in `project.json`, imports in config files like `jest.preset.js`, `.storybook/main.js`, webpack configs). Remove leftover `@nrwl/*` deps.
- **16–17**: `workspace.json` removed (projects discovered via `project.json`) — delete it if migration did not. `npmScope` and `defaultProject` removed from `nx.json`; update root scripts to name the project explicitly:
  `"start": "nx serve web"`, `"build": "nx build web"`, `"test": "nx run-many -t test"`.
- Any range: if TypeScript is bumped beyond `6.0.x`, pin it back: `npm i -D typescript@~6.0`.
- Keep `react`/`react-dom` at 18 — if a migration bumps them, revert that change.

**Verify** `VERIFY` passes; `npx nx --version` reports `<N>.x`; `npx nx serve web` starts (then stop it).
**Commit** `chore: migrate nx to <N>`

### Step 1.25 — ESLint flat config
**Action** (skip parts already done by migrations)
```bash
npx nx g @nx/eslint:convert-to-flat-config
npm i -D eslint@latest typescript-eslint@latest eslint-config-prettier@latest \
  eslint-plugin-react@latest eslint-plugin-react-hooks@latest eslint-plugin-jsx-a11y@latest eslint-plugin-import@latest
npm uninstall @typescript-eslint/eslint-plugin @typescript-eslint/parser   # only if replaced by typescript-eslint
```
Delete old `.eslintrc.json` files after conversion.
**Verify** `npx nx run-many -t lint` — no new errors vs baseline (new rule warnings are OK; disable new *error* rules only if fixing them would change behavior, and list them in the commit message).
**Commit** `chore: eslint flat config`

### Step 1.26 — Prettier 3
**Action** `npm i -D prettier@3`. Run `npx prettier --check .` — do **not** reformat the whole repo in this step.
**Verify** `VERIFY` passes.
**Commit** `chore: prettier 3`

### Step 1.27 — Storybook 6.5 → 10
**Action**
1. Check for Nx storybook generators/migrations (`npx nx list @nx/storybook`) and use them first.
2. Otherwise run `npx storybook@latest upgrade` repeatedly until on 10.x (7 → 8 → 9 → 10), following each prompt.
3. Merge root `.storybook/main.js` (empty `stories`) into `libs/ui-kit/.storybook/main.*` if the root one is no longer required, and delete it.
4. Fix `libs/ui-kit/src/filter/filter.stories.tsx` relative import `../../../bsab-models/src/request/request` → `@bsab/api/request/request`.
**Verify** `npx nx build-storybook ui-kit` succeeds; `npx nx storybook ui-kit` serves stories `Filter`, `MapPlayerV2`, `Stars`.
**Commit** `chore: upgrade storybook to 10`

---

## Phase 2 — React 18 → 19

### Step 2.1 — Pre-fixes on React 18
**Action**
1. `apps/web/src/app/app.tsx`: `dispatch(userLoad())` is called during render. Move it into `useEffect(() => { dispatch(userLoad()) }, [dispatch])`.
2. `apps/web/src/app/modules/user/auth/auth.tsx`: `props.handleClose()` is called during render when `user` exists. Move into `useEffect`.
3. Footers in `web` and `local-web` call `enqueueSnackbar` + dispatch during render. Move into `useEffect` keyed on the notifications list.
**Verify** `VERIFY` passes; no "Cannot update a component while rendering" warnings in tests.
**Commit** `fix: move side effects out of render`

### Step 2.2 — Upgrade React and React-coupled libs together
React 19 requires newer versions of libs that declare React peers, so do these in one step:
```bash
npm i react@19 react-dom@19 \
  @mui/material@latest @mui/icons-material@latest @mui/x-data-grid@latest \
  @emotion/react@latest @emotion/styled@latest \
  notistack@latest mobx@latest mobx-react@latest react-image-crop@latest
npm i -D @types/react@19 @types/react-dom@19 @testing-library/react@latest @testing-library/dom@latest
```
Do **not** upgrade Redux or react-router here (Phase 3).
If `npm install` reports peer conflicts with `react-redux@8` / `react-router-dom@6`, use
`--legacy-peer-deps` for this step only and note it in the commit message.

Then run codemods:
```bash
npx codemod@latest react/19/migration-recipe --target apps
npx codemod@latest react/19/migration-recipe --target libs
npx types-react-codemod@latest preset-19 apps libs
```
**Verify** `npm ls react` shows a single 19.x; `VERIFY` passes.
**Commit** `feat: upgrade to react 19`

### Step 2.3 — MUI 5 → 9 code changes
**Action**
1. Read the MUI migration guides v5→v6, v6→v7 and v7→v9 (and v8 if listed). Apply codemods for each:
   `npx @mui/codemod@latest <codemod-name> apps libs` as listed in the guides.
2. `libs/ui-kit/src/input/input.tsx`: replace deep import `@mui/material/TextField/TextField` with `import { TextFieldProps } from '@mui/material'`. Search for any other deep imports: `grep -rn "@mui/material/[A-Za-z]*/" apps libs`.
3. `apps/ratopia-dictionary/.../traders-table.tsx`: check `DataGrid`, `GridColDef`, `GridCellParams`, `renderCell` against the x-data-grid v8 and v9 migration guides.
4. Check MUI `classes={{ root: ... }}` usage in `libs/ui-kit/src/filter/components/filter-dropdown` and `ratopia-dictionary/pages/resources` still compiles.
**Verify** `VERIFY` passes. Serve each app and confirm pages render without console errors:
`web` (`/`, `/profile`, login dialog), `local-web` (`/`, `/maps`, cinema dialog), `ratopia-dictionary` (`/traders`, `/statistic`).
**Commit** `refactor: mui 9 migration`

### Step 2.4 — MobX 7 / mobx-react 10 code changes
**Action** Read mobx 7 and mobx-react 10 changelogs. Check every use of `makeAutoObservable`, `onBecomeObserved`,
`onBecomeUnobserved`, `action`, `runInAction`, `reaction`, `toJS`, `observer`, `useLocalObservable` in
`apps/local-web`, `apps/ratopia-dictionary`, `apps/web/src/app/store-mobx`. If `mobx-react-lite` is the
recommended package for function components only, switch imports to it.
**Verify** `VERIFY` passes; `local-web` lists playlists and maps; `ratopia-dictionary` traders page works with mocks.
**Commit** `refactor: mobx 7`

### Step 2.5 — react-image-crop 11
**Action** Check `Crop` / `PixelCrop` / `centerCrop` / `makeAspectCrop` usage in
`apps/local-web/.../playlist-edit.tsx` and `libs/bsab-models/src/utils/canvas-preview.ts` against the v11 changelog.
**Verify** `VERIFY` passes; playlist cover crop works in `local-web`.
**Commit** `refactor: react-image-crop 11`

---

## Phase 3 — Redux and routing (`web` app mostly)

### Step 3.1 — Replace redux-observable with listener middleware (still on RTK 1.9)
**Action**
1. Rewrite `apps/web/src/app/store/maps/epics.ts` (`mapsLoadEpic`) using `createListenerMiddleware`:
   - trigger on `load` action (`maps/load`),
   - `listenerApi.cancelActiveListeners(); await listenerApi.delay(100);` (debounce),
   - wait until `state.user.user !== undefined` (`await listenerApi.condition(...)`),
   - call `mapsApiService.loadList(payload, user?.token, config?.localApi)`,
   - dispatch `setList(...)` with the same `hasMore` / `isMerge` logic; on error dispatch the same empty `setList`.
2. Register it in `store.ts`; remove `createEpicMiddleware` and `epicMiddleware.run`.
3. `npm uninstall redux-observable`. Keep `rxjs` only if still imported (`grep -rn "from 'rxjs'\|from \"rxjs\"" apps libs`).
**Verify** `VERIFY` passes; in `web`, changing filters loads new maps once (check Network tab: one request per change), scrolling loads more.
**Commit** `refactor(web): replace redux-observable with listener middleware`

### Step 3.2 — RTK 2 / react-redux 9 / redux 5
**Action**
```bash
npm i @reduxjs/toolkit@latest react-redux@latest
```
Code changes in `apps/web/src/app/store/`:
1. `store.ts`: replace `middleware: [thunkMiddleware, filterQueryUpdater, ...]` with
   `middleware: (gDM) => gDM().prepend(listenerMiddleware.middleware).concat(filterQueryUpdater)`.
   Remove `import thunkMiddleware from 'redux-thunk'`.
2. Remove the `declare module 'react-redux' { interface DefaultRootState ... }` blocks (`store.ts`, `config.d.ts`).
3. In `store/index.ts` export `useAppDispatch = useDispatch.withTypes<AppDispatch>()` and
   `useAppSelector = useSelector.withTypes<RootState>()`; replace `useSelector<RootState, X>(...)` calls with `useAppSelector`.
4. `filter/middleware.ts`: typed `Middleware` signature may need `action: unknown` + `isAction` guards in RTK 2.
5. Remove remaining `// @ts-ignore` only where the new types make them unnecessary.
**Verify** `VERIFY` passes; login, filter, scroll, open map, "showed" counter all work in `web`.
**Commit** `feat(web): redux toolkit 2`

### Step 3.3 — react-router 6.4 → latest 6.x with future flags
**Action** `npm i react-router-dom@6`. Enable all `future.v7_*` flags on `<BrowserRouter future={{...}}>` in all three `main.tsx`.
Fix bug in `apps/web/src/app/modules/layout/header/header.tsx`: `className={isActive => ...}` → `className={({ isActive }) => ...}`.
**Verify** `VERIFY` passes; no future-flag warnings in the console.
**Commit** `refactor: react-router 6 future flags`

### Step 3.4 — react-router 7
**Action**
```bash
npm i react-router@latest && npm uninstall react-router-dom @types/react-router-dom
```
Replace all `from 'react-router-dom'` with `from 'react-router'`. Remove `future` flags.
**Verify** `VERIFY` passes; all routes listed in Step 2.3 Verify work, including query/hash URL state in `web` and `local-web`.
**Commit** `feat: react-router 7`

---

## Phase 4 — Remaining libraries

### Step 4.1 — three.js 0.187 (`libs/ui-kit/src/map-player-v2/scene.service.ts`)
**Action**
```bash
npm i three@latest && npm i -D @types/three@latest
```
- Replace internal imports `three/src/renderers/WebGLRenderer`, `three/src/scenes/Scene`, `three/src/cameras/Camera` with public exports from `three` (`WebGLRenderer`, `Scene`, `Camera`).
- Replace `three/examples/jsm/geometries/RoundedBoxGeometry` with `three/addons/geometries/RoundedBoxGeometry.js`.
- Replace `const triangle = require('./images/triangle.png')` with `import triangle from './images/triangle.png'` (add a `*.png` module declaration if TypeScript complains).
**Verify** `VERIFY` passes; Storybook story `MapPlayerV2` renders notes.
**Commit** `refactor(ui-kit): three 0.187`

### Step 4.2 — date-fns 4
**Action** `npm i date-fns@latest`. Usage is only `format` and `parseISO` (`ui-kit/map-list-item`, `web/map-details`) — confirm imports compile.
**Verify** `VERIFY` passes; dates render as `yyyy-MM-dd`.
**Commit** `chore: date-fns 4`

### Step 4.3 — Minor/patch updates
**Action** `npm i axios@latest jszip@latest lodash@latest tslib@latest`, then `npx npm-check-updates` (read-only) and report anything still a major behind.
**Verify** `VERIFY` passes.
**Commit** `chore: update minor dependencies`

### Step 4.4 — TypeScript strictness cleanup
**Action** Ensure `typescript` is `~6.0.x`. Fix new type errors. Do not enable new strict flags in this step.
**Verify** `npx tsc -p apps/web/tsconfig.app.json --noEmit` (and for each project) has no errors beyond baseline.
**Commit** `chore: typescript 6`

### Step 4.5 — Polyfills
**Action** Check `.browserslistrc` in each app. If it targets only modern browsers, delete `src/polyfills.ts`,
remove `polyfills` from each `project.json` build options, and `npm uninstall core-js regenerator-runtime`.
**Verify** `VERIFY` passes; production builds run in current Chrome/Firefox.
**Commit** `chore: drop legacy polyfills`

---

## Phase 5 — Optional: webpack/babel → Vite

Ask the user before starting this phase.

### Step 5.1 — Convert one app at a time (`ratopia-dictionary` first, then `local-web`, then `web`)
**Action**
- Use `npx nx g @nx/vite:configuration <project>` (or the current Nx equivalent).
- Replace `fileReplacements` environments with `import.meta.env` (`.env`, `.env.production`) keeping identical values.
- `web`: port `proxy.conf.json` (`/api` → `http://localhost:3333`) to `server.proxy`; keep `.htaccess` copied to output (`public/`).
- `local-web`: keep port 4212.
- `ratopia-dictionary`: delete `webpack.config.js`.
- Jest → Vitest for the converted project (optional, ask user).
**Verify** `VERIFY` passes; `nx serve <project>` works with the same ports and routes.
**Commit** `build(<project>): migrate to vite`

---

## Phase 6 — Finish

### Step 6.1 — Final verification
**Action**
1. `rm -rf node_modules dist && npm ci && npx nx reset`
2. `VERIFY`
3. `npx nx build-storybook ui-kit`
4. `npx knip` — remove any newly unused deps.
5. Manual check of every route listed in Step 2.3.
**Verify** All pass; `BASELINE.md` failures are either fixed or still listed.

### Step 6.2 — Docs
**Action** Update root `README.md` and each project `README.md`: Node version, Nx/React/MUI/router versions,
removed redux-observable, changed commands/scripts, Vite (if done). Delete `BASELINE.md` if empty, otherwise keep it as known issues.
**Commit** `docs: update readmes after upgrade`

### Step 6.3 — Report
Write a short summary for the user: versions before/after, steps skipped and why, remaining known issues,
anything that used `--legacy-peer-deps`. Do not merge or push unless the user asks.
