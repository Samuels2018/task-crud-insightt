import  {useState, useEffect} from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import { useTasks } from '../../hooks/useTasks';
import type { Tasks } from '../../types/TaskTypes';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';


interface TaskFormProps {
  task: Tasks | null;
  onSubmit: (task: Tasks) => void;
  onCancel: () => void;
}

const TaskList: React.FC<TaskFormProps> = () => {

  const {getAccessTokenSilently, loginWithRedirect} = useAuth0();
  const Navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Tasks | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all")
  const [token, setToken] = useState<string | null>(null);
  const { tasks, addTask, editTask, removeTask, completeTask,  } = useTasks();


  useEffect(() => {
    const fetchToken = async () => {
      try{
        const data = await getAccessTokenSilently(
          {
            authorizationParams: {
              audience: import.meta.env.VITE_AUTH0_AUDIENCE,
              scope: "openid profile email offline_access",
              redirect_uri: window.location.origin
            },
            cacheMode: 'off'
          }
        );
        setToken(data);
      }catch (error) {
        console.error('Error fetching token:', error);
        if (error === "missing_refresh_token") {
        // Forzar reautenticación con scopes completos
          loginWithRedirect({
            authorizationParams: {
              prompt: "login", // Obligar a login completo
              scope: "openid profile email offline_access",
              audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            },
          });
        }
      }
    }
    fetchToken();
  }, [getAccessTokenSilently])

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  const completedCount = tasks.filter((task) => task.completed).length
  const pendingCount = tasks.length - completedCount

  const handleSubmit = async (task: Tasks) => {
    if (!token) {
      Navigate('/login');
      return;
    }
    const isExisting = tasks.some(t => t.id === task.id);
    console.log(isExisting)
    if (isExisting) {
      console.log('Editing existing task:', task);
      await editTask(task.id, task, token);
    
    }else {
      await addTask(task, token);
    }

    setShowForm(false);
    setEditingTask(null);
  }


  const handleEdit = async (task: Tasks) => {
    setEditingTask(task);
    setShowForm(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h2 mb-1">
                <i className="bi bi-list-task me-2 text-primary"></i>
                Mis Tareas
              </h1>
              <p className="text-muted mb-0">
                {pendingCount} pendientes • {completedCount} completadas
              </p>
            </div>
            <button className="btn btn-primary" onClick={() => setShowForm(true)} disabled={showForm}>
              <i className="bi bi-plus-lg me-1"></i>
              Nueva Tarea
            </button>
          </div>

          {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-list-ul display-6 me-3"></i>
                    <div>
                      <h5 className="card-title mb-0">Total</h5>
                      <h2 className="mb-0">{tasks.length}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-warning text-white">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-clock display-6 me-3"></i>
                    <div>
                      <h5 className="card-title mb-0">Pendientes</h5>
                      <h2 className="mb-0">{pendingCount}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-check-circle display-6 me-3"></i>
                    <div>
                      <h5 className="card-title mb-0">Completadas</h5>
                      <h2 className="mb-0">{completedCount}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task Form */}
          {showForm && (
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className={`bi ${editingTask ? "bi-pencil" : "bi-plus"} me-2`}></i>
                  {editingTask ? "Editar Tarea" : "Nueva Tarea"}
                </h5>
              </div>
              <div className="card-body">
                <TaskForm
                  task={editingTask ?? undefined}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingTask(null);
                  }}
                />
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="card mb-4">
            <div className="card-body py-3">
              <div className="d-flex flex-wrap gap-2">
                <button
                  className={`btn ${filter === "all" ? "btn-primary" : "btn-outline-primary"} btn-sm`}
                  onClick={() => setFilter("all")}
                >
                  <i className="bi bi-list me-1"></i>
                  Todas ({tasks.length})
                </button>
                <button
                  className={`btn ${filter === "pending" ? "btn-warning" : "btn-outline-warning"} btn-sm`}
                  onClick={() => setFilter("pending")}
                >
                  <i className="bi bi-clock me-1"></i>
                  Pendientes ({pendingCount})
                </button>
                <button
                  className={`btn ${filter === "completed" ? "btn-success" : "btn-outline-success"} btn-sm`}
                  onClick={() => setFilter("completed")}
                >
                  <i className="bi bi-check-circle me-1"></i>
                  Completadas ({completedCount})
                </button>
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="row">
            {filteredTasks.length === 0 ? (
              <div className="col-12">
                <div className="card">
                  <div className="card-body text-center py-5">
                    <i className="bi bi-inbox display-1 text-muted mb-3"></i>
                    <h4 className="text-muted">
                      {filter === "all"
                        ? "No tienes tareas aún"
                        : filter === "pending"
                          ? "No hay tareas pendientes"
                          : "No hay tareas completadas"}
                    </h4>
                    <p className="text-muted">
                      {filter === "all" && "Crea tu primera tarea para comenzar"}
                      {filter === "pending" && "¡Excelente! Has completado todas tus tareas"}
                      {filter === "completed" && "Las tareas completadas aparecerán aquí"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div key={task.id} className="col-12 mb-3">
                  <TaskItem
                    token={token ?? ""}
                    task={task}
                    onEdit={handleEdit}
                    onDelete={removeTask}
                    onComplete={completeTask}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskList;