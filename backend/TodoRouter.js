// expressRoutes.js

const express = require("express");
const router = express.Router();
const Todo = require("./TodoSchema");
const { default: mongoose } = require("mongoose");
mongo = require("mongodb");

router.post("/storelist", async (req, res) => {
  try {
    const postTodo = new Todo({
      todolist: req.body.todolist,
    });

    const savedTodo = await postTodo.save();

    // Send the saved todo item in the response
    res.status(200).json(savedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error occurred while saving todo!" });
  }
});

router.get("/todolist", async (req, res) => {
  try {
    // Retrieve all todo items from the database
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error occurred while retrieving todo list!" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task not found" });
  }
  try {
    const task = await Todo.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});


router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task not found" });
  }
  try {
    console.log("Updated Todo Text:", req.body.updatedTodo); 
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { todolist: req.body.updatedTodo },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(updatedTodo);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});



module.exports = router;
