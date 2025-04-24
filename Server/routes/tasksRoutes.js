const express = require('express');
const router = express.Router();
const tasksController = require('../controller/tasksController');


// Get all tasks
router.get('/', tasksController.getAllTasks);
// Create a new task
router.post('/', tasksController.createTask);
// elimina una tarea por su id
router.delete('/:id', tasksController.deletesTask);
//actualiza una tarea completada
router.patch('/:id', tasksController.completeTask);

module.exports = router;