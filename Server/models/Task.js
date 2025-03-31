const pool = require('../config/db');
//obtiene todos las tareas
const getAllTasks = async () => {   
    try {
        const tasks = await pool.query('SELECT * FROM tasks');
        return tasks.rows;
    } catch (error) {
        console.error(error.message);
    }
}
//obtiene una tarea por su id
const getTask = async (id) => {
    try {
        const task = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
        return task.rows[0];
    } catch (error) {
        console.error(error.message);
    }
}
// crea una nueva tarea
const createTask = async (task) => {
    try {
        const { description } = task;
        const newTask = await pool.query('INSERT INTO tasks (title) VALUES ($1) RETURNING *', [description]);
        return newTask.rows[0];
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    getAllTasks,
    getTask,
    createTask
};