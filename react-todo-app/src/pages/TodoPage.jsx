import { useState, useEffect, useMemo } from "react";

import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";

import { getTodos, createTodo, updateTodo, deleteTodo } from "../api/todoApi";

import { toast } from "react-toastify";

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  // Fetch todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await getTodos();
        setTodos(res.data);
      } catch {
        setError("Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Add task
  const addTask = async (data) => {
    try {
      setError(null);
      const res = await createTodo(data);
      setTodos((prev) => [res.data, ...prev]);
      toast.success("Task added");
    } catch {
      setError("Failed to add task.");
      toast.error("Failed to add task.");
    }
  };

  // Toggle task
  const toggleTask = async (task) => {
    try {
      setError(null);
      const res = await updateTodo(task.id, {
        completed: !task.completed,
      });

      setTodos((prev) => prev.map((t) => (t.id === task.id ? res.data : t)));
    } catch {
      setError("Failed to update task.");
      toast.error("Failed to update task.");
    }
  };

  // Edit task
  const editTask = async (id, data) => {
    try {
      setError(null);
      const res = await updateTodo(id, data);

      setTodos((prev) => prev.map((t) => (t.id === id ? res.data : t)));
      toast.success("Task updated");
    } catch {
      toast.error("Failed to edit task.");
      setError("Failed to edit task.");
    }
  };

  // Delete task
  const removeTask = async (id) => {
    try {
      setError(null);
      await deleteTodo(id);

      setTodos((prev) => prev.filter((t) => t.id !== id));
      toast.success("Task deleted");
    } catch {
      setError("Failed to delete task.");
      toast.error("Failed to delete task.");
    }
  };

  // Mark all complete
  const markAllComplete = async () => {
    try {
      setActionLoading(true);
      setError(null);

      const incomplete = todos.filter((t) => !t.completed);

      await Promise.all(
        incomplete.map((t) => updateTodo(t.id, { completed: true })),
      );

      setTodos((prev) => prev.map((t) => ({ ...t, completed: true })));
    } catch {
      setError("Failed to mark all complete.");
    } finally {
      setActionLoading(false);
    }
  };

  // Clear completed
  const clearCompleted = async () => {
    try {
      setActionLoading(true);
      setError(null);

      const completed = todos.filter((t) => t.completed);

      await Promise.all(completed.map((t) => deleteTodo(t.id)));

      setTodos((prev) => prev.filter((t) => !t.completed));
    } catch {
      setError("Failed to clear completed tasks.");
    } finally {
      setActionLoading(false);
    }
  };

  // Sort + filter
  const filteredTodos = useMemo(() => {
    const sorted = [...todos].sort((a, b) => {
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date) - new Date(b.due_date);
    });

    return sorted.filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    });
  }, [todos, filter]);

  const totalCount = todos.length;
  const remainingCount = todos.filter((t) => !t.completed).length;
  const completedCount = totalCount - remainingCount;

  if (loading) {
    return (
      <div className="status">
        <p>Loading tasks...</p>
      </div>
    );
  }
  return (
    <div className="app">
      <div className="card">
        <div className="card-header">
          <div>
            <p className="eyebrow">Daily Focus</p>
            <h1 className="title">Task Manager</h1>
            <p className="subtitle">Keep your priorities clear and visible.</p>
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <TodoInput onAdd={addTask} />

        <div className="filters">
          <button
            type="button"
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
            aria-pressed={filter === "all"}
          >
            All
          </button>

          <button
            type="button"
            className={filter === "active" ? "active" : ""}
            onClick={() => setFilter("active")}
            aria-pressed={filter === "active"}
          >
            Active
          </button>

          <button
            type="button"
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
            aria-pressed={filter === "completed"}
          >
            Completed
          </button>
        </div>

        <div className="toolbar">
          <button
            type="button"
            onClick={markAllComplete}
            disabled={actionLoading || remainingCount === 0}
            className="btn btn-ghost"
          >
            Mark All Complete
          </button>

          <button
            type="button"
            onClick={clearCompleted}
            disabled={actionLoading || completedCount === 0}
            className="btn btn-ghost"
          >
            Clear Completed
          </button>
        </div>

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTask}
          onDelete={removeTask}
          onEdit={editTask}
        />

        <div className="summary">
          <span>{remainingCount} remaining</span>
          <span>{completedCount} completed</span>
          <span>{totalCount} total</span>
        </div>
      </div>
    </div>
  );
}

export default TodoPage;
