# Small Library

A full-stack application for managing a small library — add books, list them, lend them out, and track who has what.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite 8, Axios |
| Backend | Node.js 18, Express 5, Mongoose 9 |
| Database | MongoDB 6 |
| Infra | Docker Compose |

## How to Run

### With Docker (recommended)

```bash
docker compose up --build
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000 |
| MongoDB | localhost:27018 |

### Without Docker

**Terminal 1 — Backend:**

```bash
cd backend
npm install
npm start
```

**Terminal 2 — Frontend:**

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

| Variable | Used by | Default | Description |
|----------|---------|---------|-------------|
| `MONGO_URI` | Backend | `mongodb://localhost:27017/library` | MongoDB connection string |
| `PORT` | Backend | `3000` | Express server port |
| `VITE_API_URL` | Frontend | `http://localhost:3000` | Backend API base URL |

## Key Decisions

**Vite over Create React App** — CRA was discontinued in 2023. Vite is faster, has instant HMR, and is the current standard for React projects.

**Express over raw Node.js HTTP** — Eliminates manual routing, body parsing, and CORS handling. Keeps the code focused on business logic.

**Mongoose over MongoDB driver** — Adds schema validation, defaults, and type safety. Without it, MongoDB accepts any document structure, which leads to data inconsistencies.

**Async/Await throughout** — All database operations and HTTP calls use `async/await` for readable, sequential-looking code that handles asynchronous operations without blocking the event loop.

**Single-component frontend** — Intentionally kept simple for the scope of this project. `App.jsx` handles all state and UI. For a larger app, splitting into `BookForm`, `BookList`, and `BookItem` components would be the next step.

**Docker Compose for orchestration** — Three services (MongoDB, backend, frontend) wired together with a single command. The `mongo_data` volume persists data across restarts.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | List all books |
| `POST` | `/book` | Add a book (`title`, `author`) |
| `GET` | `/book` | List all books |
| `DELETE` | `/book/:id` | Delete a book |
| `PUT` | `/book/:id/lend` | Lend a book (`borrowerName`) |
| `PUT` | `/book/:id/return` | Return a book |

## Project Structure

```
.
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   └── src/
│       ├── server.js           # Entry point, Express setup, MongoDB connection
│       ├── models/Book.js      # Mongoose schema
│       └── routes/bookRoutes.js # REST endpoints
└── frontend/
    ├── Dockerfile
    └── src/
        ├── main.jsx            # React entry point
        ├── App.jsx             # Main component (state + UI)
        └── services/api.js     # Axios instance
```
