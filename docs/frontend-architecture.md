# Frontend Architecture

![React](https://img.shields.io/badge/React-19-2f6feb?style=flat-square&logo=react&logoColor=white)
![Router](https://img.shields.io/badge/react--router-v7-7c4dcc?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-0d9488?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-build-b7791f?style=flat-square&logo=vite&logoColor=white)
![axios](https://img.shields.io/badge/axios-HTTP-1a8754?style=flat-square)
![state](https://img.shields.io/badge/state-local%20useState%20only-cc3355?style=flat-square)

How the EduBoard React app is put together — what talks to what, which role supports which operation, and where to make changes.

---

## 1 · Big picture

One UI, one gateway file, three very different data sources. **Components never touch the network** — everything funnels through `schoolApi.js`.

```
                    ┌──────────────────────────────┐
                    │         React app            │
                    │   screens: /list · /create   │
                    └───────────────┬──────────────┘
                                    │
                    ┌───────────────▼──────────────┐
                    │      lib/schoolApi.js        │
                    │  the ONLY file using axios   │
                    │   normalizes every shape     │
                    └───┬──────────┬───────────┬───┘
           "admins"     │ "students"│  "teachers"│ / mock mode
          ┌─────────────▼┐  ┌───────▼──────┐  ┌─▼──────────────┐
          │ Admin service│  │Student service│  │ localStorage   │
          │  full CRUD   │  │ read + create │  │  mock store    │
          └──────────────┘  └───────────────┘  └────────────────┘
```

| Source | Host | Supports |
|---|---|---|
| Admin service | `library-springboot-react.onrender.com` | ![](https://img.shields.io/badge/FULL_CRUD-1a8754?style=flat-square) |
| Student service | `student-information-spring-react.onrender.com` | ![](https://img.shields.io/badge/READ_+_CREATE-2f6feb?style=flat-square) |
| localStorage mock | seeded from `mockSchoolPeople.js` | ![](https://img.shields.io/badge/OFFLINE-b7791f?style=flat-square) |

---

## 2 · Component tree

Routes are declared inline in `App.jsx` — adding a page means a `<Route>` there **plus** a nav link in `SidebarComp`.

```
main.jsx
└─ App.jsx                    shell: theme · sidebar state · routes
   ├─ SidebarComp.jsx         nav + dark/light toggle
   ├─ /list   ──→ SchoolBoard (AdminList.jsx)  list · search · edit modal · delete
   ├─ /create ──→ PersonForm  (CardComp.jsx)   create form + live preview
   └─ /       ──→ redirect to /list

components/ui/*   shared primitives: Button · Input · Label · Checkbox · Table
Loader.jsx        spinner during fetches
```

> [!WARNING]
> **Dead code:** `src/Agniv.jsx`, `src/components/StudentList.jsx`, `src/components/Sidebar.jsx` are imported by nothing. Safe to delete.

---

## 3 · What each role supports

Edit/Delete buttons are **disabled** outside the Admins tab — those endpoints don't exist for the other roles yet.

| Role | List | Create | Edit | Delete | Backed by |
|---|---|---|---|---|---|
| **admins** | ![](https://img.shields.io/badge/LIVE-1a8754?style=flat-square) | ![](https://img.shields.io/badge/LIVE-1a8754?style=flat-square) | ![](https://img.shields.io/badge/LIVE-1a8754?style=flat-square) | ![](https://img.shields.io/badge/LIVE-1a8754?style=flat-square) | `/library/admin` |
| **students** | ![](https://img.shields.io/badge/LIVE-1a8754?style=flat-square) | ![](https://img.shields.io/badge/LIVE-1a8754?style=flat-square) | ![](https://img.shields.io/badge/NO_ENDPOINT-cc3355?style=flat-square) | ![](https://img.shields.io/badge/NO_ENDPOINT-cc3355?style=flat-square) | `/api/student` |
| **teachers** | ![](https://img.shields.io/badge/MOCK-b7791f?style=flat-square) | ![](https://img.shields.io/badge/MOCK-b7791f?style=flat-square) | ![](https://img.shields.io/badge/MOCK-b7791f?style=flat-square) | ![](https://img.shields.io/badge/MOCK-b7791f?style=flat-square) | localStorage only |

---

## 4 · Data flow

The list screen **never refetches** after a mutation — it patches its own state on success.

### ![](https://img.shields.io/badge/GET-2f6feb?style=flat-square) Loading the list

1. User clicks the **Admins** tab → `setActiveType("admins")`, loader shows
2. `getPeople("admins")` → the only network hop: `GET /get-all-admin`
3. `mapAdmin()` normalizes each record — `adminId → id`, `adminUrl → imageUrl`
4. Rows render; the search box filters **client-side** via `useMemo` — no server-side search

### ![](https://img.shields.io/badge/PUT-b7791f?style=flat-square) Edit &nbsp; ![](https://img.shields.io/badge/DELETE-cc3355?style=flat-square) Delete

1. ✏️ opens a modal pre-filled from the row (rendered inline in `AdminList.jsx`, not a route)
2. Save → `updatePerson()` → `PUT /update-admin/{id}` → row patched in state
3. 🗑 asks `window.confirm()` first, then `deletePerson()` → `DELETE /delete-admin/{id}`
4. Row removed from state; on error an alert shows and the row stays

---

## 5 · Field mapping — why names differ

Backends and UI disagree on names. Translation happens **once**, at the `schoolApi.js` boundary.

| Admin API shape | | Normalized Person (UI) |
|---|---|---|
| `adminId` | → | `id` |
| `adminName` | → | `name` |
| `email` | → | `email` |
| `phone` | → | `phone` |
| `adminUrl` | → | `imageUrl` |
| `address` | → | `address` |
| `addressProof` | → | `addressProof` |
| `addressProofType` | → | `addressProofType` |

`mapAdmin()` converts inbound, `mapToAdmin()` converts outbound.

> [!NOTE]
> The **student** service confusingly also uses `admin*`-prefixed names (`adminName`, `adminEmail`, `adminPhno`) — handled by `mapLegacyStudent` / `mapToLegacyStudent`. Backend naming quirk, not a UI bug.

---

## 6 · Where to make a change

| I want to… | Touch |
|---|---|
| Add a page | `App.jsx` (route) + `SidebarComp.jsx` (nav link) |
| Point at localhost / change fetching | `lib/schoolApi.js` — URLs are **hardcoded** |
| Change table / edit modal / delete | `components/AdminList.jsx` |
| Change the create form | `components/CardComp.jsx` |
| Restyle buttons/inputs everywhere | `components/ui/*` |
| Change mock seed data | `data/mockSchoolPeople.js` |
| Force students onto mock data | env `VITE_USE_MOCK_DATA=true` |

---

## 7 · Quick facts & known gaps

- **State** — local `useState` only. No store, no cache; each screen re-fetches independently.
- **Theme** — class-based dark mode (`dark` on `<html>`), persisted to localStorage, OS preference as fallback. Owned by `App.jsx`.
- **Tests** — none configured. Verify with `npm run dev` and `npm run build`.

> [!IMPORTANT]
> **Gap:** no edit/delete endpoints for students or teachers — buttons stay disabled outside Admins.
> **Gap:** row-selection checkboxes are tracked and counted, but no bulk action consumes them yet.

---

*Reflects `feature/ui` · API reference: [`admin-api-swagger.json`](../admin-api-swagger.json)*
