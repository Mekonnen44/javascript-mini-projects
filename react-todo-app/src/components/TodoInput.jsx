import { useState } from "react";

function TodoInput({ onAdd }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    onAdd({
      title,
      completed: false,
      due_date: dueDate || null,
    });

    setTitle("");
    setDueDate("");
  };

  return (
    <div className="input-group">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Add a new task..."
      />

      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button className="add-btn" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
}

export default TodoInput;
