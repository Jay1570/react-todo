import express from "express";
const router = express.Router();
import Todo from "../models/Todo.js";

router.get("/", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

router.post("/", async (req, res) => {
    const newTodo = new Todo({ text: req.body.text });
    await newTodo.save();
    res.status(201).json(newTodo);
});

router.put("/:id", async (req, res) => {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(updated);
});

router.delete("/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

export default router;
