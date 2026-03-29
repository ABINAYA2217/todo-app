let users = JSON.parse(localStorage.getItem("users")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

/* SIGNUP */
function signup() {
    let u = document.getElementById("signupUser").value;
    let p = document.getElementById("signupPass").value;

    users.push({user:u, pass:p});
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created!");
    window.location = "index.html";
}

/* LOGIN */
function login() {
    let u = document.getElementById("loginUser").value;
    let p = document.getElementById("loginPass").value;

    let found = users.find(x => x.user===u && x.pass===p);

    if(found){
        window.location = "todo.html";
    } else {
        alert("Invalid login");
    }
}

/* TASKS */
function addTask(){
    let text = document.getElementById("taskInput").value;
    let time = document.getElementById("taskTime").value;
    let priority = document.getElementById("priority").value;

    if(text==="") return;

    tasks.push({text, time, priority, completed:false});
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function displayTasks(){
    let list = document.getElementById("taskList");
    if(!list) return;

    list.innerHTML = "";

    tasks.sort((a,b)=>a.completed-b.completed);

    tasks.forEach((t,i)=>{
        if(filter==="completed" && !t.completed) return;
        if(filter==="pending" && t.completed) return;

        let li=document.createElement("li");
        li.className=t.priority.toLowerCase();

        if(t.completed) li.classList.add("completed");

        li.innerHTML=`
        <input type="checkbox" onchange="toggle(${i})" ${t.completed?"checked":""}>
        ${t.text}<br>
        ${t.time}
        <button onclick="del(${i})">Delete</button>
        `;

        list.appendChild(li);
    });
}

function toggle(i){
    tasks[i].completed=!tasks[i].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function del(i){
    tasks.splice(i,1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function filterTasks(f){
    filter=f;
    displayTasks();
}

function toggleDark(){
    document.body.classList.toggle("dark");
}

displayTasks();