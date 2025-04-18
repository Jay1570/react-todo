import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./features/todoSlice";

const TodoForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New todo"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
