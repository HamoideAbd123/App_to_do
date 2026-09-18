# Simple To-Do App

A full-stack task management application with a lightweight Vanilla JavaScript frontend and a Python FastAPI backend.

## Overview

The project is organized into two main application layers:

- `backend/` — FastAPI API, SQLite persistence, and application logic.
- `frontend/` — static HTML/CSS/JavaScript pages and assets.

## Features

- User registration and sign-in
- User profile pages
- Create, view, update, and delete tasks
- Responsive interface
- Light/dark theme switching
- Session-aware navigation
- SQLite data persistence

## Technology

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend | Python, FastAPI |
| Database | SQLite |
| API server | Uvicorn |

## Repository Structure

```text
App_to_do/
├── backend/
│   ├── main.py              # FastAPI application and API routes
│   ├── database.py          # Database setup and data access
│   └── tasks.db             # Local SQLite database
├── frontend/
│   ├── home/                # Home/dashboard UI
│   ├── about/               # About page
│   ├── allTasks/            # Task listing UI
│   ├── profile/             # User profile UI
│   ├── sign/                # Registration and authentication pages
│   └── img/                 # Images and static assets
├── index.html               # Frontend entry point
├── .gitignore
└── README.md
```

> Note: generated Python `__pycache__` files and local database files should not normally be committed. The existing repository contains some generated/local files; they should be cleaned separately after confirming that no required data is stored in them.

## Run Locally

### Backend

```bash
cd backend
python -m pip install fastapi uvicorn
uvicorn main:app --reload --port 8000
```

### Frontend

Open `index.html` in a browser after starting the backend.

## API

The FastAPI backend is the communication layer between the frontend and SQLite database. Check `backend/main.py` for the currently implemented endpoints.

## Development Notes

This repository is intentionally lightweight and does not require a frontend framework or build system.

Future refactoring can separate shared frontend assets, API utilities, and authentication concerns into clearer modules without changing the user-facing structure.
