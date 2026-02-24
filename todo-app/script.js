function addTask() {
  const input = document.getElementById("taskInput");

  const li = document.createElement("li");
  li.textContent = input.value;

  const btn = document.createElement("button");
  btn.textContent = "Delete";
  btn.onclick = () => li.remove();

  li.appendChild(btn);

  document.getElementById("list").appendChild(li);
  input.value = "";
}