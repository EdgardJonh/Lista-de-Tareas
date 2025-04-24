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
const createTask = async (taskData) => {
    try {
        // Validación estricta del título
        if (!taskData?.title || typeof taskData.title !== 'string' || taskData.title.trim() === '') {
            throw new Error('El título de la tarea es requerido y debe ser un texto válido');
        }

        // Preparar los valores para la inserción
        const title = taskData.title.trim();
        const completed = taskData.completed || false; // Valor por defecto

        // Query parametrizada
        const query = {
            text: 'INSERT INTO tasks(title, completed) VALUES($1, $2) RETURNING *',
            values: [title, completed]
        };

        const result = await pool.query(query);
        
        if (result.rows.length === 0) {
            throw new Error('No se pudo crear la tarea');
        }

        return result.rows[0];
    } catch (error) {
        console.error('Error en createTask:', error.message);
        
        // Relanza el error para manejo superior
        throw new Error(`Error al crear tarea: ${error.message}`);
    }
};
//elimina una tarea por su id   
const deleteTask = async (id) => {
    try {
        const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        console.error(error.message);
    }
}
//actualiza una tarea a completada
const updateTask = async (id) => {
    try {
        const result = await pool.query('UPDATE tasks SET completed = true WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (error) {
        console.error(error.message);
    }
}
module.exports = {
    getAllTasks,
    getTask,
    createTask, 
    deleteTask,
    updateTask
};