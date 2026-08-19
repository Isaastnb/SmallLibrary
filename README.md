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

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Docker | 24+ (any recent version) |
| Docker Compose | v2 (bundled with Docker Desktop / `docker-compose-plugin`) |

Check with `docker --version` and `docker compose version`.

### With Docker (recommended)

1. From the project root, start everything:

   ```bash
   docker compose up --build
   ```

2. Wait for the build to finish. On the **first run** it downloads the base images
   (MongoDB, Node) and runs `npm install` for both apps — expect a few minutes.
   Later runs are fast.

3. Once the backend prints `Conectado ao MongoDB!` and Vite prints `Local: http://localhost:5173/`, it's ready.

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000 |
| MongoDB | localhost:27018 |

#### Useful commands

```bash
docker compose up --build -d   # start in the background
docker compose logs -f backend # follow a service's logs
docker compose down            # stop everything
docker compose down -v         # stop AND wipe the database (fresh start)
```

### Without Docker

Requires **Node.js 18+** (backend) and **Node.js 20.19+** (frontend, required by Vite 8), plus a running MongoDB (default `mongodb://localhost:27017/library`).

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

All variables have sane defaults — the project runs out of the box without setting anything.

| Variable | Used by | Default | Description |
|----------|---------|---------|-------------|
| `MONGO_URI` | Backend | `mongodb://localhost:27017/library` | MongoDB connection string |
| `PORT` | Backend | `3000` | Express server port |
| `VITE_API_URL` | Frontend | `http://localhost:3000` | Backend API base URL |

### Troubleshooting

| Symptom | Fix |
|---------|-----|
| Port `3000`/`5173`/`27018` already in use | Stop the other process, or change the port in `docker-compose.yml` |
| `docker compose` warns `the attribute 'version' is obsolete` | Harmless — can be removed from `docker-compose.yml` |
| Backend never connects to MongoDB | Wait — Mongo takes a few seconds to become ready; check `docker compose logs mongo` |
| Frontend can't reach the API | The frontend calls `http://localhost:3000` by default; make sure the backend is up |

> **Note:** `docker-compose.yml` sets `VITE_BACKEND_URL` for the frontend service, but the code reads
> `VITE_API_URL` (`frontend/src/services/api.js`). The default is used instead — both point to the same
> address, so it works either way.

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
