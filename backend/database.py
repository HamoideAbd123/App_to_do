import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "tasks.db")


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # returns rows as dicts
    return conn


def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    
    # Create users table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL
        )
    """)
    
    # Try adding new fields backwards-compatibly to existing table safely
    new_columns = [
        "last_name TEXT",
        "age INTEGER",
        "gender TEXT",
        "country TEXT"
    ]
    for col in new_columns:
        try:
            cursor.execute(f"ALTER TABLE users ADD COLUMN {col};")
        except sqlite3.OperationalError:
            pass
    
    # Create tasks table linked to user_id
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            text TEXT NOT NULL,
            date TEXT NOT NULL,
            done INTEGER NOT NULL DEFAULT 0,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    """)
    
    conn.commit()
    conn.close()
