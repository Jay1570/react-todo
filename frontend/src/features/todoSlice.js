import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/todos";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await axios.get(API);
  return res.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (text) => {
  const res = await axios.post(API, { text });
  return res.data;
});

export const toggleTodo = createAsyncThunk("todos/toggleTodo", async (todo) => {
  const res = await axios.patch(`${API}/${todo._id}`, {
    completed: !todo.completed,
  });
  return res.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`${API}/${id}`);
  return id;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (_, action) => action.payload)
      .addCase(
        addTodo.fulfilled,
        (state, action) => void state.push(action.payload)
      )
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
