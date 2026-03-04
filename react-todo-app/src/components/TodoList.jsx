import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onDelete }) {
  if (!todos.length) {
    return <p className="empty">No tasks yet 🚀</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;