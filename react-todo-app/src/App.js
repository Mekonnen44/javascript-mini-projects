import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/todos/")
      .then((res) => {
        setTodos(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addTask = () => {
    if (input.trim() === "") return;

    axios
      .post("http://127.0.0.1:8000/api/todos/", {
        title: input,
        completed: false,
      })
      .then((res) => {
        setTodos([res.data, ...todos]);
        setInput("");
      });
  };

  const toggleTask = (task) => {
    axios
      .patch(`http://127.0.0.1:8000/api/todos/${task.id}/`, {
        completed: !task.completed,
      })
      .then((res) => {
        setTodos(todos.map((t) => (t.id === task.id ? res.data : t)));
      });
  };

  const deleteTask = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`).then(() => {
      setTodos(todos.filter((t) => t.id !== id));
    });
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  

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
              <span onClick={() => toggleTask(task)}>{task.title}</span>

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
