import { Container } from 'react-bootstrap';
import TaskList from '../components/tasks/TaskList';
// import { useAuth } from '../context/AuthContext';


const DashboardPage: React.FC = () => {

  //const { logout } = useAuth();

  //onClick={logout}
  return (
    <Container className="py-5">
      <div className="d-flex justify-content-end mb-4">
        <button 
          
          className="btn btn-outline-danger"
        >
          Cerrar Sesión
        </button>
      </div>
      
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