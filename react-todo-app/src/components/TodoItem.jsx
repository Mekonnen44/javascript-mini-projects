import { useState } from "react";

function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleEdit = () => {
    if (!newTitle.trim()) return;
    onEdit(task.id, { title: newTitle });
    setEditing(false);
  };

  return (
    <li className={`todo-item ${task.completed ? "completed" : ""}`}>
      {editing ? (
        <>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <span onClick={() => onToggle(task)}>{task.title}</span>
          {task.due_date && (
            <small>{new Date(task.due_date).toLocaleString()}</small>
          )}
          <button onClick={() => setEditing(true)}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(task.id)}>
            ✕
          </button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
