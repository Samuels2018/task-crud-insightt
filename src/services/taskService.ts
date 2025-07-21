import clientAxios from "./clientAxios";

const getTasks = async () => {
  const response = await clientAxios.get("/task", {
    /*headers: {
      Authorization: `Bearer ${token}`,
    },*/
  });
  return response.data;
};

const createTask = async (taskData: any, token: string) => {

  console.log('Creating task with data:', taskData);

  const cleanedData = {
    userId: taskData.id,
    title: taskData.title,
    description: taskData.description,
    completed: taskData.completed,
  };

  const response = await clientAxios.post("/task/create", cleanedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateTask = async (taskId: string, taskData: any, token: string) => {

  console.log('Updating task with ID:', taskId);
  console.log('data', taskData);

  const cleanedData = {
    userId: taskData.id,
    title: taskData.title,
    description: taskData.description,
    completed: taskData.completed,
  };

  console.log('Cleaned data for update:', cleanedData);


  const response = await clientAxios.put(`/task/update/${taskId}`, cleanedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteTask = async (taskId: string, token: string) => {
  console.log('Deleting task with ID:', taskId);

  const response = await clientAxios.delete(`/task/delete/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


const markTaskComplete = async (taskId: string, token: string) => {
  const response = await clientAxios.patch(`/task/mark-complete/${taskId}`, { completed: 1 }, {
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