import { Container } from 'react-bootstrap';
import TaskList from '../components/tasks/TaskList';


const DashboardPage: React.FC = () => {
  return (
    <Container className="py-5">
      
      
      <h1 className="mb-4 text-center">Gestor de Tareas</h1>
      <TaskList
        task={null}
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    </Container>
  );
}

export default DashboardPage;