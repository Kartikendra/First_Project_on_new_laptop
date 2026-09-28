src/
 ├── components/              # Reusable UI components
 │    ├── TaskList.tsx
 │    ├── TaskForm.tsx
 │    └── Navbar.tsx
 │
 ├── pages/                   # Page-level views
 │    ├── Dashboard.tsx
 │    └── Login.tsx
 │
 ├── redux/                   # Redux Toolkit + Saga setup
 │    ├── store.ts            # Configure store + saga middleware
 │    ├── taskSlice.ts        # Modern slice with types
 │    ├── sagas/
 │    │    ├── taskSaga.ts
 │    │    └── index.ts       # Root saga
 │
 ├── services/                # API layer (mock or real)
 │    └── api.ts
 │
 ├── types/                   # Shared TypeScript types/interfaces
 │    └── task.ts             # Task interface, etc.
 │
 ├── App.tsx                  # Root component
 └── main.tsx                 # Entry point with Provider
