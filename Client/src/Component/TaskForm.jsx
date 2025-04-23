import axios from "axios";
import { useState } from "react";

export default function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3000/api/tasks", {
            title,
        });
        // Limpiar el campo de entrada después de enviar
        setTitle("");
        onTaskCreated();

};
    return (
        <>
         <form onSubmit={handleSubmit} className="flex items-center justify-between mt-4">
           
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nueva Tarea</span>
            <input type="text" className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Nueva Tarea"/>
            </div>
          
            <br />
           
            <button
                type="submit"
                className="btn btn-primary"
            >
                Agregar
            </button>
        </form>
        </>
       
    );
}