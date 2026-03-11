import { useState } from "react";

function TodoInput({ onAdd }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) return;
    setLoading(true);

    onAdd({
      title,
      completed: false,
      due_date: dueDate || null,
    });

    setLoading(false);
    setTitle("");
    setDueDate("");
  };

  return (
    <div className="input-group" aria-busy={loading}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Add a new task..."
        aria-label="Task title"
      />

      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        aria-label="Due date"
      />

      <button
        type="button"
        disabled={loading || !title.trim()}
        className="btn btn-primary"
        onClick={handleSubmit}
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </div>
  );
}

export default TodoInput;