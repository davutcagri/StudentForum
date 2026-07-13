# StudentForum Frontend

## Project Overview
A student forum web application. Frontend in React, backend in Spring Boot (separate repo).

## Team
- **Team Lead / Backend Developer:** Davut Çağrı
- **Frontend Developer:** Claude (AI assistant)

## Tech Stack
- **Framework:** React (Vite)
- **Styling:** TailwindCSS
- **State Management:** Zustand
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Model:** claude-sonnet-4-6

## Key Constraints
- All UI must be **responsive** (mobile-first)
- Keep component structure flat and simple — no over-abstraction
- API base URL comes from environment variable `VITE_API_BASE_URL`
- No hardcoded localhost URLs in source code

## Project Structure
```
src/
  components/    # Reusable UI components
  pages/         # Route-level page components
  hooks/         # Custom React hooks
  store/         # Zustand stores
  api/           # Axios instance + API call functions (auth, post, comment, search)
  utils/         # Helper functions (avatar, timeAgo, apiError)
  constants/     # Static lookup data (majors, category tag colors)
  assets/        # Static assets
```

## Environment Variables
```
VITE_API_BASE_URL=http://localhost:8080
```

## Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Project Docs (shared, one level up at `../docs/`)
- `api-docs.yaml` — OpenAPI spec for the backend; always check this before calling new endpoints
- `images/` — UI reference screenshots: `login.png`, `signup.png`, `mainpage.png`, `profilePage.png`

## API Conventions
- Backend base path: `/api/`
- Auth: JWT stored in `AUTH-TOKEN` cookie; Axios client uses `withCredentials: true`
- Paginated responses use Spring HATEOAS `PagedModel` format:
  `{ content: [], page: { number, totalPages, totalElements, size } }`
  — check `page.number < page.totalPages - 1` for hasMore, not a `last` boolean

## Routes
- `/` — Home (feed + create post)
- `/profile/:username` — User profile + posts
- `/post/:id` — Post detail + full comments

## Code Style
- Functional components only (no class components)
- Named exports preferred over default exports for components
- No inline styles — use Tailwind classes
- No comments unless the WHY is non-obvious
