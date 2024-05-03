// TodoSchema.js

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  todolist: {
    required: true,
    type: String
  }
});

module.exports = mongoose.model('Todo', todoSchema);
