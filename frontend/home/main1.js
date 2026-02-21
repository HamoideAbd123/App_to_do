const API = "http://127.0.0.1:8000";

const userinput = document.getElementById('int');
const addBtn = document.getElementById('id-btn');
const itemList = document.getElementById('id-list');

// ── Auth Check ────────────────────────────────────────────
const userRaw = localStorage.getItem("user");
if (!userRaw) {
    // Redirect to login if not logged in
    window.location.href = "../sign/sing_in.html";
}
const user = JSON.parse(userRaw);
const USER_ID = user.id;

// Optional: Display username somewhere
console.log(`Welcome, ${user.name}`);

// ── Helpers ───────────────────────────────────────────────

function createTaskElement(task) {
    const li = document.createElement('li');
    li.dataset.id = task.id;

    const taskSpan = document.createElement('span');
    taskSpan.classList.add("task");
    taskSpan.textContent = task.text;

    const dateSpan = document.createElement('span');
    dateSpan.classList.add("date");
    dateSpan.textContent = task.date;
    dateSpan.style.marginLeft = "10px";
    dateSpan.style.color = "blue";

    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.classList.add("btn", "btn-delete");

    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.classList.add("btn", "btn-edit");

    // Delete
    delBtn.addEventListener('click', async () => {
        try {
            await fetch(`${API}/tasks/${task.id}`, {
                method: 'DELETE',
                headers: { "user-id": USER_ID }
            });
            li.remove();
        } catch (e) { console.error("Could not delete", e); }
    });

    // Edit
    editBtn.addEventListener('click', () => {
        const inputEdit = document.createElement('input');
        inputEdit.value = taskSpan.textContent;

        const saveBtn = document.createElement('button');
        saveBtn.textContent = "Save";
        saveBtn.classList.add("btn", "btn-save");

        li.replaceChild(inputEdit, taskSpan);
        li.replaceChild(saveBtn, editBtn);

        saveBtn.addEventListener('click', async () => {
            const newText = inputEdit.value.trim();
            if (!newText) return;
            try {
                await fetch(`${API}/tasks/${task.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'user-id': USER_ID
                    },
                    body: JSON.stringify({ text: newText })
                });
                taskSpan.textContent = newText;
            } catch (e) { console.error("Could not save", e); }

            li.replaceChild(taskSpan, inputEdit);
            li.replaceChild(editBtn, saveBtn);
        });
    });

    li.appendChild(taskSpan);
    li.appendChild(dateSpan);
    li.appendChild(delBtn);
    li.appendChild(editBtn);

    return li;
}


// ── Load tasks on startup ─────────────────────────────────
window.addEventListener('load', async () => {
    try {
        const res = await fetch(`${API}/tasks?user_id=${USER_ID}`);
        if (!res.ok) throw new Error("Could not fetch tasks");
        const tasks = await res.json();

        itemList.innerHTML = ""; // Clear list
        tasks.forEach(task => {
            itemList.appendChild(createTaskElement(task));
        });
    } catch (err) {
        console.error("Backend not reachable or error mapping tasks.", err);
    }
});

// ── Add new task ──────────────────────────────────────────
addBtn.addEventListener('click', async () => {
    const text = userinput.value.trim();
    if (!text) return;

    const now = new Date();
    const date = `(${now.toLocaleDateString()} - ${now.toLocaleTimeString()})`;

    try {
        const res = await fetch(`${API}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user-id': USER_ID
            },
            body: JSON.stringify({ text, date })
        });
        const task = await res.json();
        itemList.appendChild(createTaskElement(task));
    } catch (err) {
        console.error("Could not add task.", err);
    }

    userinput.value = "";
});
