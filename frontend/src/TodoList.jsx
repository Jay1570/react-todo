import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, toggleTodo, deleteTodo } from "./features/todoSlice.js";

const TodoList = () => {
    const todos = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    return (
        <ul>
            {todos.map((todo) => (
                <li key={todo._id}>
                    <span
                        style={{
                            textDecoration: todo.completed ? "line-through" : "none",
                            cursor: "pointer",
                        }}
                        onClick={() => dispatch(toggleTodo(todo))}
                    >
                        {todo.text}
                    </span>
                    <button onClick={() => dispatch(deleteTodo(todo._id))}>❌</button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
