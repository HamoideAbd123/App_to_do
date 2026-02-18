const userinput = document.getElementById('int');
const addBtn = document.getElementById('id-btn');
const itemList = document.getElementById('id-list');

function saveTasks() {
    const all = [];
    document.querySelectorAll("#id-list li").forEach(li => {
        const text = li.querySelector(".task").textContent;
        const date = li.querySelector(".date").textContent;
        all.push({ text, date });
    });
    localStorage.setItem("tasks", JSON.stringify(all));
}

function createTask(text, date) {
    const li = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.classList.add("task");
    taskSpan.textContent = text;

    const dateSpan = document.createElement('span');
    dateSpan.classList.add("date");
    dateSpan.textContent = date;
    dateSpan.style.marginLeft = "10px";
    dateSpan.style.color = "blue";

    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.classList.add("btn", "btn-delete");

    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.classList.add("btn", "btn-edit");

    delBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    editBtn.addEventListener('click', () => {
        const inputEdit = document.createElement('input');
        inputEdit.value = taskSpan.textContent;

        const saveBtn = document.createElement('button');
        saveBtn.textContent = "Save";
        saveBtn.classList.add("btn", "btn-save");

        li.replaceChild(inputEdit, taskSpan);
        li.replaceChild(saveBtn, editBtn);

        saveBtn.addEventListener('click', () => {
            taskSpan.textContent = inputEdit.value;
            li.replaceChild(taskSpan, inputEdit);
            li.replaceChild(editBtn, saveBtn);
            saveTasks();
        });
    });

    li.appendChild(taskSpan);
    li.appendChild(dateSpan);
    li.appendChild(delBtn);
    li.appendChild(editBtn);

    return li;
}

window.addEventListener('load', () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(t => {
        const li = createTask(t.text, t.date);
        itemList.appendChild(li);
    });
});

addBtn.addEventListener('click', () => {
    const text = userinput.value.trim();
    if (!text) return;

    const now = new Date();
    const date = `(${now.toLocaleDateString()} - ${now.toLocaleTimeString()})`;

    const li = createTask(text, date);
    itemList.appendChild(li);

    saveTasks();
    userinput.value = "";
});
