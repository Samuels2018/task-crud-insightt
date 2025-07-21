import {useState, useEffect, useCallback} from 'react';
import taskService from '../services/taskService';
//import * as taskService from '../services/mockTasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  

  const CargarTasks = useCallback(async () => {
  
    setLoading(true);
    try {
      const data = await taskService.getTasks();
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

  const refreshTasks = async () => {
    const data = await taskService.getTasks();
    setTasks(data);
  }

  const addTask = async (task: any, token: string) => {
    if (!token) return;

    try {
      console.log('Adding task:', task);
      const newTask = await taskService.createTask(task, token);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      await refreshTasks();

    } catch (error) {
      setErr('Error al agregar la tarea');
      console.error(error);
    }
  }

  const editTask = async (id: string, updatedTask: any, token: string) => {
    if (!token) return;

    try {
      const updateTask = await taskService.updateTask(id, updatedTask, token);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updateTask : task))
      );
      await refreshTasks();

    } catch (error) {
      setErr('Error al actualizar la tarea');
      console.error(error);
    }
  }


  const removeTask = async (id: string, token: string) => {
    if (!token) return;

    try {
      await taskService.deleteTask(id, token);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      await refreshTasks();

    } catch (error) {
      setErr('Error al eliminar la tarea');
      console.error(error);
    }
  }

  const completeTask = async (id: string, token: string) => {
    if (!token) return;

    try {
      const markTask = await taskService.markTaskComplete(id, token);
      setTasks((prevTasks) => prevTasks.map((task) => task.id === id ? markTask: task));
      await refreshTasks();

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