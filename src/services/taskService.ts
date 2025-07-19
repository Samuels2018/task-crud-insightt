import clientAxios from "./clientAxios";

const getTasks = async (token: string) => {
  const response = await clientAxios.get("/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createTask = async (taskData: any, token: string) => {
  const response = await clientAxios.post("/tasks", taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateTask = async (taskId: string, taskData: any, token: string) => {
  const response = await clientAxios.put(`/tasks/${taskId}`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteTask = async (taskId: string, token: string) => {
  const response = await clientAxios.delete(`/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


const markTaskComplete = async (taskId: string, token: string) => {
  const response = await clientAxios.patch(`/tasks/${taskId}/complete`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const taskService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  markTaskComplete,
};
export default taskService;