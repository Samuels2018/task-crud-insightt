import {useState} from 'react';
import { Form, Button, Stack, Card } from 'react-bootstrap';
import type { Tasks } from '../../types/TaskTypes';


interface TaskFormProps {
  task?: Tasks,
  onSubmit: (task: Tasks) => void,
  onCancel: () => void
}

const TaskForm: React.FC<TaskFormProps> = ({task, onSubmit, onCancel}) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting task:', { title, description });

    if (task) {
      onSubmit({ ...task, title, description });
    
    }else {
      onSubmit({ id: crypto.randomUUID(), title, description, completed: 2, dueDate: '' });
    }
  }

  return (
    <Card className='mb-4 border-primary'>
      <Card.Body>
        <Form
          onSubmit={handleSubmit} 
        >
          <Form.Group className='mb-3'>
            <Form.Label>Titulo</Form.Label>
            <Form.Control 
              type='text' 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder='Ingrese el titulo de la tarea' 
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción detallada"
            />
          </Form.Group>

          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button variant="outline-secondary" onClick={onCancel}>Cancelar</Button>

            <Button variant='primary' type='submit'>
              {task ? 'Actualizar Tarea' : 'Agregar Tarea'}
            </Button>
          </Stack>


        </Form>
      </Card.Body>
    </Card>
  );
}

export default TaskForm;