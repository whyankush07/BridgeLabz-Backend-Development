const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todo_api');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  dueDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', TaskSchema);

app.post('/api/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tasks (with optional status filter and dueDate sort)
app.get('/api/tasks', async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    let query = Task.find(filter);
    if (req.query.sort === 'dueDate') query = query.sort({ dueDate: 1 });
    const tasks = await query.exec();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Not Found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ error: 'Not Found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Not Found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
