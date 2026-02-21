# Simpol To Do App

Simpol is a full-stack, responsive task management application. It features a clean, dynamic Vanilla JavaScript frontend paired with a robust Python FastAPI backend and an SQLite database for secure data persistence. 

## Features

- **Secure Authentication**: Register and login securely. User passwords are automatically hashed with SHA-256 formatting.
- **Detailed User Profiles**: User registration captures comprehensive profile details (Age, Gender, Country) beyond standard login credentials.
- **Task Management**: Create, view, update, and delete tasks dynamically, tightly linked to your authenticated user account.
- **Responsive UI & UX**: A sleek user interface that smoothly adapts to mobile, tablet, and desktop viewports.
- **Dynamic Night/Light Mode**: Fully interactive, animated theme toggle available across all application pages allowing you to seamlessly switch between a modern dark interface and a bright light interface.
- **Secure Sessions**: Client-side router guards securely redirect guests to the login page and authenticated users to their dashboard automatically.

## Tech Stack

- **Frontend**: Pure Vanilla HTML, CSS, and JavaScript. Zero complex boilerplate or heavy framework dependencies.
- **Backend API**: Python FastAPI.
- **Database**: SQLite. Data is securely persisted in dynamic tables (`users` and `tasks`). 

## Running the Application Locally

The project does not require any heavy frontend build tools. You just need to run the Python backend API!

### 1. Start the Backend API

1. Ensure you have Python installed.
2. Install FastAPI and Uvicorn if you haven't already (`pip install fastapi uvicorn`).
3. Navigate into the `backend/` directory from your terminal.
4. Run the development server:
   ```bash
   uvicorn main:app --port 8000
   ```
   *The SQLite database (`tasks.db`) will automatically initialize itself upon startup.*

### 2. Launch the Frontend

Once the API is active on port 8000:
1. Simply double-click on `index.html` in the root folder to open the app directly in your web browser. 
2. The application will automatically route you to the `sing_in.html` page (or the dashboard if you have an active session). 
3. Create an account, manage your tasks, and enjoy!
