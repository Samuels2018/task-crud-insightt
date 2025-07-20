import { ListGroupItem, Button, Badge } from 'react-bootstrap';
import type { Tasks } from '../../types/TaskTypes';


interface TaskItemProps {
  task: Tasks,
  onEdit: (task: Tasks) => void,
  onDelete: (taskId: string) => void,
  onComplete: (taskId: string) => void
}

const TaskItem: React.FC<TaskItemProps> = ({task, onEdit, onDelete, onComplete }) => {
  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      <div>
        <h5 className="mb-1 d-flex align-items-center">
          {task.title}
          {task.completed === 1 && (
            <Badge bg="success" className="ms-2">Completada</Badge>
          )}
        </h5>
        <p className="mb-1 text-muted">{task.description}</p>
      </div>
      
      <div>
        {task.completed !== 1 && (
          <>
            <Button 
              variant="outline-primary" 
              size="sm" 
              className="me-2"
              onClick={() => onEdit(task)}
            >
              Editar
            </Button>
            <Button 
              variant="outline-success" 
              size="sm" 
              className="me-2"
              onClick={() => onComplete(task.id)}
            >
              Completar
            </Button>
          </>
        )}
        <Button 
          variant="outline-danger" 
          size="sm"
          onClick={() => onDelete(task.id)}
        >
          Eliminar
        </Button>
      </div>
    </ListGroupItem>
  );
}

export default TaskItem;