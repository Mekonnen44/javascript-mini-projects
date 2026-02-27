let todos = [];
let filter = "all";

window.onload = function () {
  const data = localStorage.getItem("todos");
  if (data) {
    todos = JSON.parse(data);
  }
  render();
};

function addTask() {
  const input = document.getElementById("taskInput");

  if (input.value.trim() === "") return;

  const task = {
    id: Date.now(),
    text: input.value,
    completed: false
  };

  todos.push(task);

  input.value = "";

  save();
  render();
}

function deleteTask(id) {
  todos = todos.filter(t => t.id !== id);
  save();
  render();
}

function toggleTask(id) {
  todos = todos.map(t => {
    if (t.id === id) {
      t.completed = !t.completed;
    }
    return t;
  });

  save();
  render();
}

function setFilter(f) {
  filter = f;
  render();
}

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  let filtered = todos;

  if (filter === "active") {
    filtered = todos.filter(t => !t.completed);
  }

  if (filter === "completed") {
    filtered = todos.filter(t => t.completed);
  }

  filtered.forEach(task => {
    const li = document.createElement("li");

    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    li.onclick = () => toggleTask(task.id);

    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.onclick = (e) => {
      e.stopPropagation(); 
      deleteTask(task.id);
    };

    li.appendChild(btn);

    list.appendChild(li);
  });
}