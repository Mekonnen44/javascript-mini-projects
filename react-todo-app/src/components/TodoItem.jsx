import { useEffect, useState } from "react";

function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  useEffect(() => {
    if (!editing) {
      setNewTitle(task.title);
    }
  }, [task.title, editing]);

  const handleEdit = () => {
    if (!newTitle.trim()) return;
    onEdit(task.id, { title: newTitle });
    setEditing(false);
  };

  const handleCancel = () => {
    setNewTitle(task.title);
    setEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleEdit();
    }
    if (event.key === "Escape") {
      handleCancel();
    }
  };

  const formattedDueDate = task.due_date
    ? new Date(task.due_date).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  return (
    <li className={`todo-item ${task.completed ? "completed" : ""}`}>
      {editing ? (
        <>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Edit task title"
          />
          <button className="btn btn-primary" onClick={handleEdit}>
            Save
          </button>
          <button className="btn btn-ghost" onClick={handleCancel}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span onClick={() => onToggle(task)}>{task.title}</span>
          {formattedDueDate && <small>Due {formattedDueDate}</small>}
          <button className="btn btn-ghost" onClick={() => setEditing(true)}>
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default TodoItem;