from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import hashlib
from database import get_connection, init_db

app = FastAPI(title="Simpol To Do API - Full Stack")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()


# ── Helpers ───────────────────────────────────────────────
def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def get_current_user_id(user_id: Optional[str] = Header(None)):
    if not user_id:
        raise HTTPException(status_code=401, detail="Missing user-id header")
    return int(user_id)


# ── Models ────────────────────────────────────────────────
class UserRegister(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class TaskCreate(BaseModel):
    text: str
    date: str

class TaskUpdate(BaseModel):
    text: str


# ── Auth Endpoints ────────────────────────────────────────

@app.post("/auth/register")
def register(user: UserRegister):
    conn = get_connection()
    
    # Check if email exists
    existing = conn.execute("SELECT id FROM users WHERE email = ?", (user.email,)).fetchone()
    if existing:
        conn.close()
        raise HTTPException(status_code=400, detail="Email already registered")
        
    pwd_hash = hash_password(user.password)
    
    cursor = conn.execute(
        "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
        (user.name, user.email, pwd_hash)
    )
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    
    return {"message": "User created successfully", "user_id": new_id}


@app.post("/auth/login")
def login(user: UserLogin):
    conn = get_connection()
    pwd_hash = hash_password(user.password)
    
    result = conn.execute(
        "SELECT id, name, email FROM users WHERE email = ? AND password_hash = ?", 
        (user.email, pwd_hash)
    ).fetchone()
    
    conn.close()
    
    if not result:
        raise HTTPException(status_code=401, detail="Invalid email or password")
        
    return {"message": "Login successful", "user": dict(result)}


# ── Task Endpoints ────────────────────────────────────────

@app.get("/")
def root():
    return {"message": "Simpol API is running ✅"}


@app.get("/tasks")
def get_tasks(user_id: int): # Explicit query param, or could use Header
    conn = get_connection()
    tasks = conn.execute("SELECT * FROM tasks WHERE user_id = ? ORDER BY id DESC", (user_id,)).fetchall()
    conn.close()
    return [dict(task) for task in tasks]


@app.post("/tasks", status_code=201)
def create_task(task: TaskCreate, user_id: int = Header(...)):
    conn = get_connection()
    cursor = conn.execute(
        "INSERT INTO tasks (user_id, text, date) VALUES (?, ?, ?)",
        (user_id, task.text, task.date)
    )
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return {"id": new_id, "text": task.text, "date": task.date, "done": 0}


@app.put("/tasks/{task_id}")
def update_task(task_id: int, task: TaskUpdate, user_id: int = Header(...)):
    conn = get_connection()
    result = conn.execute("SELECT id FROM tasks WHERE id = ? AND user_id = ?", (task_id, user_id)).fetchone()
    if not result:
        conn.close()
        raise HTTPException(status_code=404, detail="Task not found or unauthorized")
        
    conn.execute("UPDATE tasks SET text = ? WHERE id = ?", (task.text, task_id))
    conn.commit()
    conn.close()
    return {"id": task_id, "text": task.text}


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, user_id: int = Header(...)):
    conn = get_connection()
    result = conn.execute("SELECT id FROM tasks WHERE id = ? AND user_id = ?", (task_id, user_id)).fetchone()
    if not result:
        conn.close()
        raise HTTPException(status_code=404, detail="Task not found or unauthorized")
        
    conn.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()
    return {"message": f"Task {task_id} deleted"}
