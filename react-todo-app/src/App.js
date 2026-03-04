import { useState, useEffect } from "react";
import "./App.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api/todoApi";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  // Fetch todos
  useEffect(() => {
    getTodos()
      .then((res) => {
        setTodos(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load tasks.");
        setLoading(false);
      });
  }, []);

  const addTask = (title) => {
    createTodo({ title, completed: false })
      .then((res) => {
        setTodos([res.data, ...todos]);
      })
      .catch(() => setError("Failed to add task."));
  };

  const toggleTask = (task) => {
    updateTodo(task.id, { completed: !task.completed })
      .then((res) => {
        setTodos(todos.map((t) => (t.id === task.id ? res.data : t)));
      })
      .catch(() => setError("Failed to update task."));
  };

  const removeTask = (id) => {
    deleteTodo(id)
      .then(() => {
        setTodos(todos.filter((t) => t.id !== id));
      })
      .catch(() => setError("Failed to delete task."));
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  if (loading) return <p className="status">Loading tasks...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="app">
      <div className="card">
        <h1 className="title"> Task Manager</h1>

        <TodoInput onAdd={addTask} />

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

        <TodoList todos={filteredTodos} onToggle={toggleTask} onDelete={removeTask} />

        <div className="footer">
          {todos.filter((t) => !t.completed).length} tasks left
        </div>
      </div>
    </div>
  );
}

export default App;
