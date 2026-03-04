function TodoItem({ task, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${task.completed ? "completed" : ""}`}>
      <span onClick={() => onToggle(task)}>
        {task.title}
      </span>

      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        ✕
      </button>
    </li>
  );
}

export default TodoItem;