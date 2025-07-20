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
  const response = await clientAxios.post("/task/create", taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateTask = async (taskId: string, taskData: any, token: string) => {
  const response = await clientAxios.put(`/task/update/${taskId}`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteTask = async (taskId: string, token: string) => {
  const response = await clientAxios.delete(`/task/delete/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


const markTaskComplete = async (taskId: string, token: string) => {
  const response = await clientAxios.patch(`/task/mark-complete/${taskId}`, null, {
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