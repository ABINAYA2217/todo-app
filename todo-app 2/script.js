// ================= USERS =================
let users = JSON.parse(localStorage.getItem("users")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ================= LOGIN =================
function login() {
    let u = document.getElementById("loginUser").value.trim();
    let p = document.getElementById("loginPass").value.trim();

    let found = users.find(user => user.username === u && user.password === p);

    if (found) {
        localStorage.setItem("currentUser", u);
        alert("Login successful!");
        window.location.href = "todo.html";
    } else {
        alert("Invalid username or password");
    }
}

// ================= LOGOUT =================
function logout() {
    localStorage.removeItem("currentUser");
    alert("Logged out!");
    window.location.href = "index.html";
}

// ================= TASK =================
function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (text === "") return;

    tasks.push({ text: text, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    displayTasks();
}

function displayTasks() {
    let list = document.getElementById("taskList");
    if (!list) return;

    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.onchange = () => {
            tasks[index].completed = checkbox.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
        };

        let span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.style.textDecoration = "line-through";
        }

        let delBtn = document.createElement("button");
        delBtn.textContent = "Delete";

        delBtn.onclick = () => {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(delBtn);

        list.appendChild(li);
    });
}

// ================= FILTER =================
function filterTasks(type) {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let filtered = tasks;

    if (type === "completed") {
        filtered = tasks.filter(t => t.completed);
    } else if (type === "pending") {
        filtered = tasks.filter(t => !t.completed);
    }

    filtered.forEach((task) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.style.textDecoration = "line-through";
        }

        li.appendChild(span);
        list.appendChild(li);
    });
}

// ================= DARK MODE =================
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

// ================= WATER =================
function setWaterReminder() {
    let time = document.getElementById("waterTime").value;

    if (!time) {
        alert("Select time");
        return;
    }

    localStorage.setItem("waterTime", time);
    document.getElementById("waterMsg").innerText = "Reminder set at " + time;
}

// ================= AUTO WATER ALERT =================
setInterval(() => {
    let savedTime = localStorage.getItem("waterTime");
    if (!savedTime) return;

    let now = new Date();
    let current =
        now.getHours().toString().padStart(2, '0') + ":" +
        now.getMinutes().toString().padStart(2, '0');

    if (current === savedTime) {
        alert("Drink Water 💧");
    }
}, 60000);

// ================= SECTION SWITCH =================
function showSection(section) {
    document.getElementById("homeSection").style.display = "none";
    document.getElementById("tasksSection").style.display = "none";
    document.getElementById("waterSection").style.display = "none";
    document.getElementById("settingsSection").style.display = "none";

    if (section === "home") {
        document.getElementById("homeSection").style.display = "block";
    }
    if (section === "tasks") {
        document.getElementById("tasksSection").style.display = "block";
    }
    if (section === "water") {
        document.getElementById("waterSection").style.display = "block";
    }
    if (section === "settings") {
        document.getElementById("settingsSection").style.display = "block";
    }
}

// LOAD TASKS
displayTasks();
// ================= NOTES =================
function saveNotes() {
    let text = document.getElementById("notes").value;
    localStorage.setItem("notes", text);
    alert("Saved!");
}

// Load notes automatically
window.onload = function () {
    let saved = localStorage.getItem("notes");
    if (saved) {
        document.getElementById("notes").value = saved;
    }
};
// ================= NOTES =================
let notes = JSON.parse(localStorage.getItem("notesList")) || [];

function addNote() {
    let input = document.getElementById("noteInput");
    let text = input.value.trim();

    if (text === "") return;

    notes.push(text);
    localStorage.setItem("notesList", JSON.stringify(notes));

    input.value = "";
    displayNotes();
}

function displayNotes() {
    let list = document.getElementById("notesList");
    if (!list) return;

    list.innerHTML = "";

    notes.forEach((note, index) => {
        let div = document.createElement("div");
        div.className = "note";

        let span = document.createElement("span");
        span.textContent = note;

        let delBtn = document.createElement("button");
        delBtn.textContent = "Delete";

        delBtn.onclick = () => {
            notes.splice(index, 1);
            localStorage.setItem("notesList", JSON.stringify(notes));
            displayNotes();
        };

        div.appendChild(span);
        div.appendChild(delBtn);

        list.appendChild(div);
    });
}

// load notes
displayNotes();
// ================= WATER MULTIPLE =================
let waterTimes = JSON.parse(localStorage.getItem("waterTimes")) || [];

function addWaterTime() {
    let time = document.getElementById("waterTime").value;

    if (!time) return;

    waterTimes.push(time);
    localStorage.setItem("waterTimes", JSON.stringify(waterTimes));

    displayWaterTimes();
}

function displayWaterTimes() {
    let list = document.getElementById("waterList");
    if (!list) return;

    list.innerHTML = "";

    waterTimes.forEach((time, index) => {
        let div = document.createElement("div");
        div.className = "water-item";

        let span = document.createElement("span");
        span.textContent = time;

        let delBtn = document.createElement("button");
        delBtn.textContent = "Delete";

        delBtn.onclick = () => {
            waterTimes.splice(index, 1);
            localStorage.setItem("waterTimes", JSON.stringify(waterTimes));
            displayWaterTimes();
        };

        div.appendChild(span);
        div.appendChild(delBtn);

        list.appendChild(div);
    });
}

// LOAD
displayWaterTimes();

// ================= REMINDER ALERT =================
setInterval(() => {
    let now = new Date();
    let current =
        now.getHours().toString().padStart(2, '0') + ":" +
        now.getMinutes().toString().padStart(2, '0');

    waterTimes.forEach(time => {
        if (time === current) {
            alert("💧 Time to drink water!");
        }
    });
}, 60000);
