import { useState } from "react";

export default function TaskList({ tasks, onTaskDeleted, onTaskCompleted }) {
    const [filter, setFilter] = useState("all");

    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "notCompleted") return !task.completed;
        return true; // Muestra todas las tareas si el filtro es "all"
    });
    
    //función para manejar la tarea completada
    // Esta función se llama cuando se marca o desmarca una tarea
    // y llama a la función onTaskCompleted para actualizar el estado en la base de datos
    // Se pasa el ID de la tarea y su estado actual (completada o no)
    // Se utiliza para actualizar el estado de la tarea en la base de datos
    // y en la interfaz de usuario
    const handleTaskCompleted = (taskId, currentCompleted) => {
        // Llama a la función onTaskCompleted para actualizar el estado en la base de datos
        onTaskCompleted(taskId, currentCompleted);
    };

    return (
        <>
            <h2 className="text-center mt-4">Lista de Tareas</h2>
            <div className="text-center mb-3">
                <label htmlFor="filter" className="me-2">Filtrar:</label>
                <select
                    id="filter"
                    className="form-select d-inline-block w-auto"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">Todas</option>
                    <option value="completed">Completadas</option>
                    <option value="notCompleted">No Completadas</option>
                </select>
            </div>
            <table className="table table-striped table-bordered mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Completada</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleTaskCompleted(task.id, task.completed)}
                                />
                                <span className="ms-2">{task.title}</span>
                            </td>
                            <td>{task.completed ? "✅" : "❌"}</td>
                            <td className="text-center">
                                <button className="btn btn-warning btn-sm">Update</button>
                            </td>
                            <td className="text-center">
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => onTaskDeleted(task.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3" className="text-center">
                            Total de tareas: {tasks.length}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
}