const Task = require('../models/Task');

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.getAllTasks();
        res.status(200).json(tasks,{message: "Todos los datos de tareas"});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task', error });
    }
};

// Create a new task
const createTask = async (req, res) => {
    try {
        const newTask = await Task.createTask(req.body);
     res.status(201).json(newTask,{message: 'Tarea creada correctamente'});
    } catch (error) {
        res.status(400).json({ message: 'Error creating task', error });
    }
};

// Update a task by ID
const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: 'Error updating task', error });
    }
};

//elimina una tarea por su id   
const deletesTask = async (req, res) => {
    try {
        const deletedTask = await Task.deleteTask(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deletesTask
};