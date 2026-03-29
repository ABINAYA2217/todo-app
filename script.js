// Load users & tasks from localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* ================= SIGNUP ================= */
function signup() {
    let u = document.getElementById("signupUser").value.trim();
    let p = document.getElementById("signupPass").value.trim();

    if (u === "" || p === "") {
        alert("Please enter username and password");
        return;
    }

    // check user already exists
    let exists = users.find(user => user.username === u);
    if (exists) {
        alert("User already exists! Try login.");
        return;
    }

    users.push({ username: u, password: p });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    window.location.href = "index.html";
}

/* ================= LOGIN ================= */
function login() {
    let u = document.getElementById("loginUser").value.trim();
    let p = document.getElementById("loginPass").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let found = users.find(user => user.username === u && user.password === p);

    if (found) {
        alert("Login successful!");
        window.location.href = "todo.html";
    } else {
        alert("Invalid username or password");
    }
}

/* ================= TASK FUNCTIONS ================= */

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

        // checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.onchange = () => {
            tasks[index].completed = checkbox.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
        };

        // task text
        let span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.style.textDecoration = "line-through";
        }

        // delete button
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

// Load tasks when page loads
displayTasks();
