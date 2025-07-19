import  {useState} from 'react';
import { Button, ListGroup, Badge } from 'react-bootstrap';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import { useTasks } from '../../hooks/useTasks';


const TaskList: React.FC = () => {


  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { tasks, addTask, editTask, removeTask, completeTask } = useTasks();

  const handleSubmit = (task: any) => {
    if ('id' in task) {
      console.log('Editing task:', task);
      editTask(task.id, task);
    
    }else {
      console.log('Adding new task:', task);
      addTask(task);
    }

    setShowForm(false);
    setEditingTask(null);
  }

  return (
    <div className="p-4 border rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Mis Tareas</h2>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          + Nueva Tarea
        </Button>
      </div>

      {showForm || editingTask ? (
        <TaskForm 
          task={editingTask}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      ): null}

      <ListGroup>
        {tasks.length == 0 ? (
          <ListGroup.Item className='text-center py-4 text-muted'>
            No hay tareas registradas
          </ListGroup.Item>
        ): (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={setEditingTask}
              onDelete={removeTask}
              onComplete={completeTask}
            />
          ))
        )}
      </ListGroup>

    </div>
  )
}

export default TaskList;