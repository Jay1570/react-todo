import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://localhost:5000/api/todos";

const fetchJSON = async (url, options = {}) => {
    const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    return await fetchJSON(API);
});

export const addTodo = createAsyncThunk("todos/addTodo", async (text) => {
    return await fetchJSON(API, {
        method: "POST",
        body: JSON.stringify({ text }),
    });
});

export const toggleTodo = createAsyncThunk("todos/toggleTodo", async (todo) => {
    return await fetchJSON(`${API}/${todo._id}`, {
        method: "PUT",
        body: JSON.stringify({ completed: !todo.completed }),
    });
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
    const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return id;
});

const todoSlice = createSlice({
    name: "todos",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (_, action) => action.payload)
            .addCase(addTodo.fulfilled, (state, action) => void state.push(action.payload))
            .addCase(toggleTodo.fulfilled, (state, action) => {
                const idx = state.findIndex((t) => t._id === action.payload._id);
                state[idx] = action.payload;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                return state.filter((t) => t._id !== action.payload);
            });
    },
});

export default todoSlice.reducer;
