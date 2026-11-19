# shared

Small helpers used across the apps. This library has no UI and does not depend on the domain
models. Import it with the `@shared/*` alias. There is no barrel file (`src/index.ts` is empty),
so import each file directly:

```ts
import { buildForm } from '@shared/forms/build-form';
```

## Contents

| Module | Export | Description | Used by |
| --- | --- | --- | --- |
| `forms/build-form` | `buildForm<T>(form)` | Reads every `<input>` in a form into `{ [name]: value }` | `web` (auth, profile) |
| `forms/set-form` | `setForm(form, data)` | Writes `data` back into inputs with matching `name` attributes | — |
| `forms/form-reducer` | `formReducer(state, key, value)` | Immutable update of one field, for `useReducer` | — |
| `forms/use-change-input` | `useChangeInput(cb)` | Turns an input `onChange` event into `cb(value)` | `ratopia-dictionary` |
| `store/payload` | `StorePayload<T>` | `{ payload: T }`: the type for Redux Toolkit reducer actions | `web` |
| `store/test-action` | `makeCheckAction(name)` | Returns a matcher for actions whose type starts with `name/` | `web` (user slice) |
| `string/hash-code` | `hashCodeNumber(s)` | Java-style 32-bit string hash, used to build notification IDs | `web` |

`store/index-db.ts` is an empty placeholder.

## Commands

```bash
npx nx test shared
npx nx lint shared
```
