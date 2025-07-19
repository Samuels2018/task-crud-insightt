import type { Tasks } from '../types/TaskTypes';

// Datos iniciales falsos
let mockTasks: Tasks[] = [
  {
    id: '1',
    title: 'Comprar leche',
    description: 'Ir al supermercado',
    dueDate: '2023-06-15',
    completed: 0
  },
  {
    id: '2',
    title: 'Reunión equipo',
    description: 'Presentación del proyecto',
    dueDate: '2023-06-20',
    completed: 1
  },
  {
    id: '3',
    title: 'Hacer ejercicio',
    description: 'Gimnasio 30 minutos',
    dueDate: '2023-06-10',
    completed: 0
  }
];

// Simulador de retraso en red
const simulateNetworkDelay = () => 
  new Promise(resolve => setTimeout(resolve, 500));

export const getTasks = async (token: string): Promise<Tasks[]> => {
  await simulateNetworkDelay();
  return [...mockTasks];
};

export const createTask = async (task: Omit<Tasks, 'id'>, token: string): Promise<Tasks> => {
  await simulateNetworkDelay();

  const newTask: Tasks = {
    ...task,
    id: (mockTasks.length + 1).toString(),
    completed: 0
  };
  
  mockTasks.push(newTask);
  return newTask;
};

export const updateTask = async (id: string, updates: Partial<Tasks>, token: string): Promise<Tasks> => {
  await simulateNetworkDelay();
  
  const index = mockTasks.findIndex(t => t.id === id);
  if (index === -1) throw new Error('Task not found');
  
  mockTasks[index] = {
    ...mockTasks[index],
    ...updates
  };
  
  return mockTasks[index];
};

export const deleteTask = async (id: string, token: string): Promise<void> => {
  await simulateNetworkDelay();
  mockTasks = mockTasks.filter(task => task.id !== id);
};

export const markTaskComplete = async (id: string, token: string): Promise<Tasks> => {
  return updateTask(id, { completed: 1 }, token);
};