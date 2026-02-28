import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (input.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos([...todos, newTask]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="app">
      <div className="card">
        <h1 className="title"> Task Manager</h1>

        <div className="input-group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button className="add-btn" onClick={addTask}>
            Add
          </button>
        </div>

        <div className="filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "active" ? "active" : ""}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <ul className="todo-list">
          {filteredTodos.map((task) => (
            <li
              key={task.id}
              className={`todo-item ${task.completed ? "completed" : ""}`}
            >
              <span onClick={() => toggleTask(task.id)}>
                {task.text}
              </span>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <div className="footer">
          {todos.filter((t) => !t.completed).length} tasks left
        </div>
      </div>
    </div>
  );
}

export default App;
