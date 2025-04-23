export default function TaskList({ tasks, onTaskDeleted }) {
    return (
        <>
        <h2 className="text-center mt-4">Lista de Tareas</h2>
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
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.completed ? "✅" : "❌"}</td>
                            <td className="text-center"><button className="btn btn-warning btn-sm">Update</button></td>
                            <td className="text-center"><button className="btn btn-danger btn-sm" onClick={()=> onTaskDeleted(task.id)}>Delete</button></td>
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