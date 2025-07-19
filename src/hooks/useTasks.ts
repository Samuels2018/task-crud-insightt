import {useState, useEffect, useCallback, use} from 'react';

export const useTasks = () => {
  // const { token } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const CargarTasks = useCallback(async () => {
    //if (!token) return;

    setLoading(true);
    try {
      const data =  //= await fetchTasks(token);
      setTasks(data);

    }catch (error) {
      setErr('Error al cargar las tareas');
      console.error(error);
    
    }finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    CargarTasks();
  }, [CargarTasks]);

  const addTask = async (task: any) => {
    // if (!token) return;

    try {
      const newTask = //await createTask(task, token);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    
    } catch (error) {
      setErr('Error al agregar la tarea');
      console.error(error);
    }
  }

  const editTask = async (id: string, updatedTask: any) => {
    // if (!token) return;
    
    try {
      const updateTask = // await updateTask(id, updatedTask, token);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updateTask : task))
      );

    } catch (error) {
      setErr('Error al actualizar la tarea');
      console.error(error);
    }
  }


  const removeTask = async (id: string) => {
    // if (!token) return;

    try {
      // await deleteTask(id, token);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    } catch (error) {
      setErr('Error al eliminar la tarea');
      console.error(error);
    }
  }

  const completeTask = async (id: string) => {
    // if (!token) return;

    try {
      const markTask = // await markTaskComplete(id, token);
      setTasks((prevTasks) => prevTasks.map((task) => task.id === id ? markTask: task));

    } catch (error) {
      setErr('Error al completar la tarea');
      console.error(error);
    }
  }


  return {
    tasks,
    loading,
    err,
    addTask,
    editTask,
    removeTask,
    completeTask,
  }
}