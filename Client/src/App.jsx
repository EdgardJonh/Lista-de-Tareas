import { useState, useEffect } from "react";
import TaskList from "./Component/TaskList";
import TaskForm from "./Component/TaskForm";
import axios from "axios";

function App(){
    const [tasks, setTasks] = useState([]);
    const fetchTasks = async () => {
        const response = await axios.get("http://localhost:3000/api/tasks");
       
        // Establece el estado de las tareas con los datos obtenidos
        setTasks(response.data)
    };
    // Carga inicial de tareas    

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskCreated = () => {
        fetchTasks();
    };

    // Eliminación de tareas
    const handleTaskDeleted = async (id) => {
        await axios.delete(`http://localhost:3000/api/tasks/${id}`);
        fetchTasks();
    };
    // Actualización de tareas
    const handleTaskUpdated = async (id, updatedTask) => {
        await axios.put(`http://localhost:3000/api/tasks/${id}`, updatedTask);
        fetchTasks();
    };
    // Completado de tareas
    const handleTaskCompleted = async (id, currentCompleted) => {
        try{
            const updatedCompleted = !currentCompleted;
            await axios.patch(`http://localhost:3000/api/tasks/${id}`, {
                completed: updatedCompleted,
            });
            fetchTasks();
        }catch (error) {
            console.error("Error al actualizar la tarea:", error);
        }
       
    }
    // Actualización de tareas
    const handleTaskUpdate = async (id) => {
        await axios.patch(`http://localhost:3000/api/tasks/${id}`);
        fetchTasks();
    };
    // Filtrado de tareas
    const handleTaskFiltered = async (filter) => {
        const response = await axios.get(`http://localhost:3000/api/tasks?completed=${filter}`);
        setTasks(response.data);
    };
    // Ordenación de tareas     

    return (
        <div className="container mt-5">
            <h1 className="text-center">Administrador de Tareas</h1>
            <p className="text-center">Gestionas tus tareas de forma eficiente</p>
            <hr />
            <h2 className="text-center">Crea una nueva tarea</h2>
            <TaskForm onTaskCreated={handleTaskCreated} />
            <TaskList tasks={tasks} onTaskDeleted={handleTaskDeleted} onTaskCompleted={handleTaskCompleted}/>
        </div>
    );
}

export default App;