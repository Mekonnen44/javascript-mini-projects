import { useState } from "react";

function TodoInput({ onAdd }) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;
    onAdd(input);
    setInput("");
  };

  return (
    <div className="input-group">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button className="add-btn" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
}

export default TodoInput;