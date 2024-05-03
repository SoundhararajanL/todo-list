// expressRoutes.js

const express = require("express");
const router = express.Router();
const Todo = require("./TodoSchema");

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
    res.status(500).json({ error: "Error occurred while retrieving todo list!" });
  }
});

module.exports = router;
